import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { User } from '@Interfaces/users';
import useSharedState from '@Middleware/useSharedState';
import getUser from '@Utilities/getUser';
import BooksTab from '@views/books.tab';
import ProgressTab from '@views/progress.tab';
import TabHeader from '@Components/TabHeader';

const ProtectedPage: NextPage<{ user: User }> = ({ user }) => {
  const { activeTab, setUser } = useSharedState();
  const tabs = [<BooksTab tabName="Books" />, <ProgressTab tabName="Progress" />];

  // This is a bit of a hack, but it's the only way to get
  // the user without calling GetServerSideProps.
  setUser(user);

  return (
    <>
      <TabHeader tabs={tabs} />
      <div className="w-screen">{tabs[activeTab]}</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (context) => getUser(context);
export default ProtectedPage;
