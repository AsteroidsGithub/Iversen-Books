import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

import prisma from "../prisma/database";
import { AuthenticatedUser, User } from "../interfaces/users";
import { UserRole } from "@prisma/client";
import checkAuth from "../utilities/checkAuth";

export interface NextApiRequestWithUser extends NextApiRequest {
  user: User;
}

type NextAuthApiHandler = (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => void | Promise<void>;

const auth =
  (handler: NextAuthApiHandler, roles?: UserRole) =>
  async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    console.log(`Auth Middleware: ${req.method} ${req.url}`);

    // Get token from cookie
    const { auth: token } = req.cookies;

    const user = await checkAuth(token);

    if (!user) return res.status(403).json({ message: "Forbidden" });
    if (roles && !user.permissions.includes(roles))
      return res.status(403).json({ message: "Forbidden" });

    req.user = user;
    return handler(req, res);
  };

export default auth;
