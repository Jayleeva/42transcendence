import { ConflictException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // Inject PrismaService to interact with the database.
  constructor(private readonly prisma: PrismaService) {}

  // Handle user registration using validated data from RegisterDto.
  async register(registerDto: RegisterDto) {
    // Check if a user already exists with the same email or username.
    const existingUser = await this.prisma.user.findFirst({
      where: {
        // Match either the email OR the username.
        OR: [
          { email: registerDto.email },
          { username: registerDto.username },
        ],
      },
    });

    // Reject registration if the email or username is already taken.
    if (existingUser) {
      throw new ConflictException('Email or username already in use');
    }
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