import { User } from '../interfaces/users';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/database';

export default async (token: string): Promise<User | undefined> =>
  new Promise(async (resolve) => {
    if (!token) return resolve(undefined);

    jwt.verify(token, 'secret', async (err: any, decoded: any) => {
      if (err) return resolve(undefined);

      const user = await prisma.user.findFirst({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: true,
          permissions: true,
        },
      });

      if (!user) return resolve(undefined);

      resolve(user);
    });
  });
