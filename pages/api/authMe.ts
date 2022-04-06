import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { useCookies } from "react-cookie";

const loginUser = (
  res: NextApiResponse
): Promise<{
  exp: number;
  token: string;
}> =>
  new Promise((resolve, reject) => {
    // Set Expiry to 1 week from now
    const exp = new Date(Date.now() + 604800000);

    // Generate JWT
    const token = jwt.sign(
      { id: 1, exp: Math.floor(exp.getTime() / 1000) },
      "secret"
    );

    console.log(token);

    // Set auth cookie to JWT
    const cookie = res.setHeader(
      "Set-Cookie",
      serialize("auth", token, {
        httpOnly: true,
        expires: exp,
        sameSite: "strict",
        secure: true,
        path: "/",
      })
    );

    // Return token and expiry date
    return resolve({
      exp: exp.getTime(),
      token: token,
    });
  });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, exp } = await loginUser(res);

  res.json({ message: "Success", exp });
};
