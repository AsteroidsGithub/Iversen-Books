import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { I_User } from '@Interfaces/users';
import useSharedState from '@Middleware/useSharedState';
import getUser from '@Utilities/getUser';
import BooksTab from '@Views/books.tab';
import StudentsTab from '@Views/students.tab';
import TabHeader from '@Components/TabHeader';
import prisma from '@Services/database';
import checkAuth from '@Utilities/checkAuth';
import { I_BookJSON } from '@Interfaces/books';

const HomePage: NextPage<{ user: I_User; books: I_BookJSON[] }> = ({ user, books }) => {
  const { activeTab, setUser } = useSharedState();
  const tabs = [<BooksTab tabName="Books" books={books} />, <StudentsTab tabName="Students" />];

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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await checkAuth(context.req.cookies.auth);
  if (!user) return { redirect: { destination: '/' }, props: {} };

  const books = await prisma.book.findMany();
  if (!books) return { redirect: { destination: '/' }, props: {} };

  return {
    props: {
      user,
      books: books.map((book) => book.rawJSON),
    },
  };
};
export default HomePage;
