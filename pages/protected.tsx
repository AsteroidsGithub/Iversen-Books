import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { User } from '@Interfaces/users';
import useSharedState from '@Middleware/useSharedState';
import getUser from '@Utilities/getUser';
import BooksTab from '@views/books.tab';
import StudentsTab from '@views/students.tab';
import TabHeader from '@Components/TabHeader';

const ProtectedPage: NextPage<{ user: User }> = ({ user }) => {
  const { activeTab, setUser } = useSharedState();
  const tabs = [<BooksTab tabName="Books" />, <StudentsTab tabName="Students" />];

  // This is a bit of a hack, but it's the only way to get
  // the user without calling GetServerSideProps.
  setUser(user);

  return (
    <>
      <TabHeader tabs={tabs} />
      {tabs[activeTab]}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (context) => getUser(context);
export default ProtectedPage;
