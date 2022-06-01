import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import Joi from 'joi';
import PrismaClient from '../../prisma/database';

const validateLoginData = (user: { email: string; password: string }) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(user);

const loginUser = (
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
        secure: process.env.NODE_ENV == 'development' ? true : false, // TODO: Change to true when HTTPS is enabled
        path: '/',
      }),
    );

    // Return token and expiry date
    return resolve({
      exp: exp.getTime(),
      token: token,
    });
  });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // This will prevent clients from accessing the API through the browser
  if (req.method != 'POST') return;

  try {
    const { value, error } = await validateLoginData(req.body);

    if (error) return res.status(500).json({ statusCode: 500, message: 'User Validation Error' });

    const user = await PrismaClient.user.findUnique({
      where: {
        email: value.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) return res.status(404).json({ statusCode: 404, message: 'User Not Found' });

    // Replace me with bycrpt to hash passwords
    if (value.password != user.password)
      return res.status(401).json({ statusCode: 401, message: 'Invalid Password' });

    const { token, exp } = await loginUser(res, user.id);

    return res.status(200).json({ message: 'Success', exp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
  }
};
