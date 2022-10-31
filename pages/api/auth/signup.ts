import PrismaClient, { UserRole } from '@Services/database';
import loginUser from '@Utilities/loginUser';

import bcrypt from 'bcrypt';
import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

const validateSignUpData = (user: {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  // school: string;
  role: 'Admin' | 'Teacher' | 'Student';
}) =>
  Joi.object({
    email: Joi.string().email().required(),
    confirmEmail: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    // school: Joi.string().required(),
    role: Joi.string().equal('Admin', 'Teacher', 'Student').required(),
  }).validate(user);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST')
    return res.status(403).json({ statusCode: 403, message: 'Bad Request Please Use POST' });
  try {
    const { value, error } = validateSignUpData(req.body);
    if (error) {
      console.error(error);
      return res.status(500).json({ statusCode: 500, message: error.details[0].message });
    }

    const user = await PrismaClient.user.findUnique({
      where: {
        email: value.email,
      },
      select: {
        id: true,
      },
    });

    if (value.email != value.confirmEmail)
      return res.status(401).json({
        statusCode: 401,
        message: 'Email and Confirm Email do not match',
      });

    if (value.password != value.confirmPassword)
      return res.status(401).json({
        statusCode: 401,
        message: 'Password and Confirm Password do not match',
      });

    if (user)
      return res.status(401).json({
        statusCode: 401,
        message: 'This email already has an account',
      });

    // const hashedPassword = await bcrypt.hash(value.password, 10);

    const newUser = await PrismaClient.user.create({
      data: {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: await bcrypt.hash(value.password, 10), // TODO: Encrypt this before production
      },
      select: {
        id: true,
      },
    });

    // Pass the newUser object and SignUp request over
    // to the login route to handle first time signup
    // and then push that back here to finish the request
    const { token, exp } = await loginUser(res, newUser.id);

    console.log({ message: 'Success', exp });
    return res.status(200).json({ message: 'Success', exp });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
  }
};
