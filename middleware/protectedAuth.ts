import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

import prisma from "../prisma/database";
import { AuthencationRoles, AuthenticatedUser } from "../interfaces/users";

export interface NextApiRequestWithUser extends NextApiRequest {
  user: AuthenticatedUser;
}

type NextAuthApiHandler = (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => void | Promise<void>;

const auth =
  (handler: NextAuthApiHandler, roles?: AuthencationRoles) =>
  async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    console.log(`Auth Middleware: ${req.method} ${req.url}`);

    // Get token from cookie
    const { auth: token } = req.cookies;

    // Check if token exists
    if (!token) res.status(401).json({ message: "Not authenticated" });

    // Verify token
    jwt.verify(token, "secret", async (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: "Invalid token" });

      const user = (req.user = await prisma.user.findFirst({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      }));

      if (roles) {
        if (roles.admin && user.admin)
          return res
            .status(401)
            .json({ message: "Not authenticated: User is not a Admin" });

        if (roles.publisher && user.publisher)
          return res
            .status(401)
            .json({ message: "Not authenticated: User is not a Publisher" });

        if (roles.teacher && user.teacher)
          return res
            .status(401)
            .json({ message: "Not authenticated: User is not a Teacher" });

        if (roles.student && user.student)
          return res
            .status(401)
            .json({ message: "Not authenticated: User is not a Student" });
      }

      return handler(req, res);
    });
  };

export default auth;
