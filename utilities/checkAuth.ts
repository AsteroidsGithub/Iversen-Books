import { I_User } from '../interfaces/users';
import jwt from 'jsonwebtoken';
import prisma from '@Services/database';

export default async (token: string): Promise<I_User | undefined> =>
  new Promise(async (resolve) => {
    if (!token) return resolve(undefined);

    jwt.verify(token, 'secret', async (err: any, decoded: any) => {
      if (err) return resolve(undefined);

      const user = await prisma.user.findFirst({
        where: {
          Id: decoded.id,
        },
        select: {
          Id: true,
          FirstName: true,
          LastName: true,
          Email: true,
          Password: true,
          Permissions: true,
        },
      });

      if (!user) return resolve(undefined);

      resolve(user);
    });
  });
