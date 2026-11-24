import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException, ConflictException, BadGatewayException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  // Inject UserService to handle user creation.
  constructor(private readonly userService: UserService) {}

  // Register a new user using validated data.
  async register(registerDto: RegisterDto) {
    // Hash the plaintext password before storing it.
    const hashedPassword = await this.hashPassword(registerDto.password);

    // Create the user through UserService.
    return this.userService.createUser({
      firstname: registerDto.firstname,
      lastname: registerDto.lastname,
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
      birthDate: new Date(registerDto.birthDate),
    });
  }

  // Validate user credentials before creating a session.
  async login(loginDto: LoginDto) {
    // Find the user and retrieve their stored password hash.
    const user = await this.userService.findByEmailWithPassword(loginDto.email);

    // Reject unknown email addresses.
    if (!user || !user.password) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{ field: 'credentials', code: 'INVALID_CREDENTIALS' }],
      });
    }

    // Compare the submitted password with the stored hash.
    const isPasswordValid = await this.verifyPassword(
      user.password,
      loginDto.password,
    );

    // Reject incorrect passwords.
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{ field: 'credentials', code: 'INVALID_CREDENTIALS' }],
      });
    }

    // Credentials are valid. Return the user ID for session creation.
    return { userId: user.id };
  }

  // Retrieve the currently authenticated user's public account information.
  async getMe(userId: string) {
    return this.userService.findMyself(userId);
  }

  // Hash a plaintext password using Argon2id and a random salt.
  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, { type: argon2.argon2id });
  }

  // Verify a plaintext password against its stored hash.
  async verifyPassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userService.findByIdWithPassword(userId);

    if (!user) {
    throw new UnauthorizedException({
      statusCode: 401,
      errors: [{ code: 'NOT_AUTHENTICATED' }],
    });
    }

    if (!user.password) {
      throw new BadRequestException({
        statusCode: 400,
        errors: [{ code: 'PASSWORD_NOT_SET' }],
      });
    }

    const isValid = await this.verifyPassword(user.password, dto.currentPassword);

    if (!isValid) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{ code: 'INVALID_CURRENT_PASSWORD' }],
      });
    }

    const hashedPassword = await this.hashPassword(dto.newPassword);

    await this.userService.updatePassword(userId, hashedPassword);
  }

  async exchange42Code(code: string, redirectUri: string,): Promise<string> {
    const clientId = process.env.FT_CLIENT_ID;
    const clientSecret = process.env.FT_CLIENT_SECRET;

    if (!clientId || !clientSecret || !redirectUri) {
      throw new InternalServerErrorException({
        statusCode: 500,
        errors: [{ code: 'OAUTH_NOT_CONFIGURED' }],
      });
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    });

    let response: Response;

    try {
      response = await fetch('https://api.intra.42.fr/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
        signal: AbortSignal.timeout(10000),
      });
    } catch {
      throw new BadGatewayException({
        statusCode: 502,
        errors: [{ code: 'OAUTH_PROVIDER_UNAVAILABLE' }],
      });
    }

    if (!response.ok) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{ code: 'OAUTH_TOKEN_EXCHANGE_FAILED' }],
      });
    }

    const data: unknown = await response.json();

    if (
      typeof data !== 'object' ||
      data === null ||
      !('access_token' in data) ||
      typeof data.access_token !== 'string'
    ) {
      throw new InternalServerErrorException({
        statusCode: 500,
        errors: [{ code: 'OAUTH_INVALID_RESPONSE' }],
      });
    }

    return data.access_token;
  }

  async get42Profile(accessToken: string) {
    let response: Response;

    try {
      response = await fetch('https://api.intra.42.fr/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: AbortSignal.timeout(10000),
      });
    } catch {
      throw new BadGatewayException({
        statusCode: 502,
        errors: [{ code: 'OAUTH_PROVIDER_UNAVAILABLE' }],
      });
    }

    if (!response.ok) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{ code: 'OAUTH_PROFILE_FETCH_FAILED' }],
      });
    }

    const data: unknown = await response.json();

    if (
      typeof data !== 'object' ||
      data === null ||
      !('id' in data) ||
      typeof data.id !== 'number' ||
      !('login' in data) ||
      typeof data.login !== 'string' ||
      !('email' in data) ||
      typeof data.email !== 'string'
    ) {
      throw new InternalServerErrorException({
        statusCode: 500,
        errors: [{ code: 'OAUTH_INVALID_PROFILE' }],
      });
    }

    return {
      providerAccountId: String(data.id),
      username: data.login,
      email: data.email,
      firstname:
        'first_name' in data && typeof data.first_name === 'string'
          ? data.first_name
          : '',
      lastname:
        'last_name' in data && typeof data.last_name === 'string'
          ? data.last_name
          : '',
    };
  }

  async find42User(providerAccountId: string) {
    const account = await this.userService.findByOAuthAccount(
      '42',
      providerAccountId,
    );

    return account?.user ?? null;
  }

  async create42User(profile: {
    providerAccountId: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
  }) {
    // Never automatically link an OAuth identity by email.
    const existingEmail = await this.userService.findByEmailWithPassword(
      profile.email,
    );

    if (existingEmail) {
      throw new ConflictException({
        statusCode: 409,
        errors: [{ field: 'email', code: 'OAUTH_EMAIL_ALREADY_REGISTERED' }],
      });
    }

    return this.userService.createOAuthUser(
      {
        username: profile.username,
        email: profile.email,
        firstname: profile.firstname,
        lastname: profile.lastname,
      },
      '42',
      profile.providerAccountId,
    );
  }

  async link42User(
    userId: string,
    providerAccountId: string,
  ) {
    return this.userService.link42Account(userId, providerAccountId);
  }
}