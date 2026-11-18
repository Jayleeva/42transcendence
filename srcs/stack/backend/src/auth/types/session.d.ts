import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    oauthState?: string;
    oauthMode?: 'login' | 'link';
    oauthLinkUserId?: string;
  }
}