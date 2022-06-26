import { NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default (
  res: NextApiResponse,
  userId: number,
): Promise<{
  exp: number;
  token: string;
}> =>
  new Promise((resolve, reject) => {
    // Set Expiry to 1 week from now
    const exp = new Date(Date.now() + 604800000);

    // Generate JWT
    const token = jwt.sign({ id: userId, exp: Math.floor(exp.getTime() / 1000) }, 'secret');

    // Set auth cookie to JWT
    res.setHeader(
      'Set-Cookie',
      serialize('auth', token, {
        httpOnly: true,
        expires: exp,
        sameSite: 'strict',
        secure: process.env.NODE_ENV == 'production' ? true : false, // TODO: Change to true when HTTPS is enabled
        path: '/',
      }),
    );

    // Return token and expiry date
    return resolve({
      exp: exp.getTime(),
      token: token,
    });
  });
