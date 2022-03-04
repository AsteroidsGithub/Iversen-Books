import { Prisma } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { User } from "../interfaces/users";
import prisma from "../prisma/database";
import checkAuth from "../utilities/checkAuth";

const ProtectedPage: NextPage<{ user: User }> = ({ user }) => {
  return (
    <div>
      <h1>ProtectedPage {user.firstName}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.req.cookies);
  const user = await checkAuth(context.req.cookies.token);

  if (!user) return { redirect: { destination: "/" }, props: {} };

  return {
    props: {
      user,
    },
  };
};

export default ProtectedPage;
