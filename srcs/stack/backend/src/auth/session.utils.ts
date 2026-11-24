import { Request, Response } from 'express';

export async function endSession(req: Request, res: Response): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    req.session.destroy((err) => (err ? reject(err) : resolve()));
  });
  res.clearCookie('transcendence.sid', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
}
