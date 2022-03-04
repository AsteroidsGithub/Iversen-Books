import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { useCookies } from "react-cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Set Expiry to 1 week from now
  const exp = new Date(Date.now() + 604800000);

  // Generate JWT
  await jwt.sign(
    { id: 1, exp: Math.floor(exp.getTime() / 1000) },
    "secret",
    async (err: unknown, token: any) => {
      setCookie("token", token, {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });

      return res.status(200).json({
        id: 1,
        exp: Math.floor(exp.getTime() / 1000),
        token,
      });
    }
  );
};
