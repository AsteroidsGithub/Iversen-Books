import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { User } from '@Interfaces/users';
import checkAuth from '@Utilities/checkAuth';

const ProtectedPage: NextPage<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = React.useState<{
    [Key: number]: Boolean;
  }>({
    0: true,
    1: false,
  });

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center bg-white py-10 px-6">
          <h1 className="text-3xl text-black">
            Welcome to <span className="font-semibold">Quick60 {user.firstName}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await checkAuth(context.req.cookies.auth);

  if (!user) {
    console.log('Blocked access to protected page');
    return { redirect: { destination: '/' }, props: {} };
  }

  return {
    props: {
      user,
    },
  };
};

export default ProtectedPage;
