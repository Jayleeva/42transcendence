import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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
    const user = await this.userService.findMyself(userId);

    if (!user) ({
      statusCode: 401,
      errors: [{ field: 'session', code: 'NOT_AUTHENTICATED' }],
    });

    return user;
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

    const isValid = await this.verifyPassword(
      user.password,
      dto.currentPassword,
    );

    if (!isValid) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{ code: 'INVALID_CURRENT_PASSWORD' }],
      });
    }

    const hashedPassword = await this.hashPassword(dto.newPassword);

    await this.userService.updatePassword(userId, hashedPassword);
  }
}