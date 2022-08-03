import PrismaClient from '@Services/database';
import loginUser from '@Utilities/loginUser';

import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

const validateLoginData = (user: { email: string; password: string }) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(user);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // This will prevent clients from accessing the API through the browser
  if (req.method != 'POST')
    return res.status(403).json({ statusCode: 403, message: 'Bad Request Please Use POST' });

  try {
    const { value, error } = await validateLoginData(req.body);

    if (error)
      return res
        .status(500)
        .json({ statusCode: 500, message: 'User Validation Error', error: error.message });

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

    console.log({ message: 'Success', exp });
    return res.status(200).json({ message: 'Success', exp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
  }
};
