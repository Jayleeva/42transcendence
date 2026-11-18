import { Body, Controller, Get, Post, HttpCode, HttpStatus, Req, Res, UseGuards, Patch, InternalServerErrorException, Query, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import type { Request, Response } from 'express';
import { SessionGuard } from './guards/session.guard';
import { CurrentUserId } from './decorators/current-user-id.decorator';
import { randomBytes } from 'node:crypto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // Handles account registration requests.
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('42')
  async loginWith42(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.start42OAuth(req, res, 'login');
  }


  @Get('42/link')
  @UseGuards(SessionGuard)
  async linkWith42(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.start42OAuth(req, res, 'link');
  }


  
  @Get('42/callback')
  async callback42(
    @Query('code') code: string | undefined,
    @Query('state') state: string | undefined,
    @Query('error') oauthError: string | undefined,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const expectedState = req.session.oauthState;
    const mode = req.session.oauthMode;
    const linkUserId = req.session.oauthLinkUserId;

    // Consume the OAuth attempt so it cannot be reused.
    delete req.session.oauthState;
    delete req.session.oauthMode;
    delete req.session.oauthLinkUserId;

    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    // Validate the OAuth state and mode.
    if (
      !state ||
      !expectedState ||
      state !== expectedState ||
      (mode !== 'login' && mode !== 'link')
    ) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{ code: 'OAUTH_INVALID_STATE' }],
      });
    }

    if (oauthError) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{
          code: oauthError === 'access_denied'
            ? 'OAUTH_ACCESS_DENIED'
            : 'OAUTH_PROVIDER_ERROR',
        }],
      });
    }

    if (!code) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{ code: 'OAUTH_MISSING_CODE' }],
      });
    }

    // Check the session before contacting 42.
    if (mode === 'login' && req.session.userId) {
      throw new ConflictException({
        statusCode: 409,
        errors: [{ code: 'OAUTH_SESSION_CONFLICT' }],
      });
    }

    if (mode === 'link') {
      if (!linkUserId || req.session.userId !== linkUserId) {
        throw new UnauthorizedException({
          statusCode: 401,
          errors: [{ code: 'OAUTH_LINK_SESSION_INVALID' }],
        });
      }
    }

    // Exchange the code and retrieve the 42 identity.
    const accessToken = await this.authService.exchange42Code(code);
    const profile = await this.authService.get42Profile(accessToken);

    const existingUser = await this.authService.find42User(
      profile.providerAccountId,
    );

    if (mode === 'login') {
      const user = existingUser
        ?? await this.authService.create42User(profile);

      // Regenerate the session to prevent session fixation.
      await new Promise<void>((resolve, reject) => {
        req.session.regenerate((err) => {
          if (err) {
            reject(err);
            return;
          }

          req.session.userId = user.id;

          req.session.save((saveErr) => {
            if (saveErr) {
              reject(saveErr);
              return;
            }
            resolve();
          });
        });
      });

      return res.redirect(303, '/feed');
    }

    // Link mode: the session was verified above.
    if (!linkUserId) {
      throw new UnauthorizedException({
        statusCode: 401,
        errors: [{ code: 'OAUTH_LINK_SESSION_INVALID' }],
      });
    }

    if (existingUser) {
      throw new ConflictException({
        statusCode: 409,
        errors: [{ code: 'OAUTH_ACCOUNT_ALREADY_LINKED' }],
      });
    }

    // Link 42 without changing the existing password or session.
    await this.authService.link42User(
      linkUserId,
      profile.providerAccountId,
    );

    return res.redirect(303, '/settings');
  }


  private async start42OAuth(
    req: Request,
    res: Response,
    mode: 'login' | 'link',
  ) {
    const clientId = process.env.FT_CLIENT_ID;
    const redirectUri = process.env.FT_CALLBACK_URL;

    if (!clientId || !redirectUri) {
      throw new InternalServerErrorException({
        statusCode: 500,
        errors: [{ code: 'OAUTH_NOT_CONFIGURED' }],
      });
    }

    const state = randomBytes(32).toString('hex');

    req.session.oauthState = state;
    req.session.oauthMode = mode;

    if (mode === 'link') {
      req.session.oauthLinkUserId = req.session.userId;
    } else {
      delete req.session.oauthLinkUserId;
    }

    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    const url = new URL('https://api.intra.42.fr/oauth/authorize');

    url.searchParams.set('client_id', clientId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'public');
    url.searchParams.set('state', state);

    return res.redirect(url.toString());
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

  // Return the user associated with the current session.
  @Get('me')
  @UseGuards(SessionGuard)
  me(@CurrentUserId() userId: string) {
    return this.authService.getMe(userId);
  }

  // Destroy the current session and clear its cookie.
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Destroy the server-side session.
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    // Remove the session cookie from the browser.
    res.clearCookie('transcendence.sid', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
  }

  @Patch('password')
  @UseGuards(SessionGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @CurrentUserId() userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.authService.changePassword(userId, dto);
  }
}