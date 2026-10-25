import { Body, Controller, Post, HttpCode, HttpStatus, Req, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // Handles account registration requests.
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Handle login requests and create an authenticated session.
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
  ) {
    // Validate credentials and retrieve the authenticated user's ID.
    const { userId } = await this.authService.login(loginDto);

    // Regenerate the session to prevent session fixation attacks.
    await new Promise<void>((resolve, reject) => {
      req.session.regenerate((err) => {
        // Reject the login if session regeneration fails.
        if (err) {
          reject(err);
          return;
        }

        // Store the authenticated user's ID in the new session.
        req.session.userId = userId;

        // Explicitly save the session before confirming login.
        req.session.save((saveErr) => {
          // Reject the login if session storage fails.
          if (saveErr) {
            reject(saveErr);
            return;
          }

          // Session successfully created and saved.
          resolve();
        });
      });
    });

    // Return HTTP 200 OK to indicate successful login.
    return;
  }
}