import { UserRole } from '@prisma/client';
import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import PrismaClient from '../../../services/database';

const validateSignUpData = (user: {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  school: string;
  role: 'Admin' | 'Teacher' | 'Student';
}) =>
  Joi.object({
    email: Joi.string().email().required(),
    confirmEmail: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    school: Joi.string().required(),
    role: Joi.string().equal(['Admin', 'Teacher', 'Student']).required(),
  }).validate(user);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST')
    return res.status(403).json({ statusCode: 403, message: 'Bad Request Please Use POST' });
  try {
    const { value, error } = validateSignUpData(req.body);
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
      },
    });

    if (user)
      return res.status(401).json({
        statusCode: 401,
        message: 'User Exists',
      });

    const newUser = await PrismaClient.user.create({
      data: {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password, // TODO: Encrypt this before production
        permissions: value.role as UserRole,
      },
      select: {
        id: true,
      },
    });

    // Pass the newUser object and SignUp request over
    // to the login route to handle first time signup
    // and then push that back here to finish the request
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
  }
};
