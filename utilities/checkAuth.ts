import jwt from 'jsonwebtoken';
import prisma, { User } from '@Services/database';
import { I_User } from '../interfaces/users';

export default async (token: string): Promise<User | undefined> =>
  new Promise(async (resolve) => {
    if (!token) return resolve(undefined);

    jwt.verify(token, 'secret', async (err: any, decoded: any) => {
      if (err) return resolve(undefined);

      const user: User = JSON.parse(
        JSON.stringify(
          await prisma.user.findFirst({
            where: {
              id: decoded.id,
            },
          }),
        ),
      );

      if (!user) return resolve(undefined);

      resolve(user);
    });
  });
