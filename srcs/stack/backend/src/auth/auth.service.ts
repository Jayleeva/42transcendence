import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

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
}