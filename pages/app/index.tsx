import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { I_Class, I_User } from '@Interfaces/users';
import useSharedState from '@Middleware/useSharedState';
import BooksTab from '@Views/books.tab';
import StudentsTab from '@Views/students.tab';
import TabHeader from '@Components/TabHeader';
import prisma, { Book, Class, User } from '@Services/database';
import checkAuth from '@Utilities/checkAuth';
import { I_BookJSON } from '@Interfaces/books';

const HomePage: NextPage<{ user: User; books: I_BookJSON[]; classes: Class[] }> = ({
  user,
  books,
  classes,
}) => {
  const { activeTab, setUser } = useSharedState();
  const tabs = [
    <BooksTab tabName="Books" books={books} />,
    <StudentsTab tabName="Students" classes={classes} />,
  ];

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

  const books: Book[] = JSON.parse(JSON.stringify(await prisma.book.findMany()));

  const classes: Class[] = JSON.parse(
    JSON.stringify(
      await prisma.class.findMany({
        where: {
          teacherId: user.id,
        },
        include: {
          students: true,
        },
      }),
    ),
  );

  return {
    props: {
      user,
      books: books.map((book) => book.json),
      classes,
    },
  };
};
export default HomePage;
