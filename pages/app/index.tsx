import TabHeader from '@Components/TabHeader';
import { I_BookJSON } from '@Interfaces/books';
import useSharedState from '@Middleware/useSharedState';
import prisma, { Book, Class, User } from '@Services/database';
import checkAuth from '@Utilities/checkAuth';
import BooksTab from '@Views/books.tab';
import StudentsTab from '@Views/students.tab';
import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';


const HomePage: NextPage<{ user: User; books: Book[]; classes: Class[] }> = ({
  user,
  books,
  classes,
}) => {
  const { activeTab, setUser } = useSharedState();
  const tabs = [
    <BooksTab tabName="Books" books={books} classes={classes} />,
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
          students: {
            include: {
              studentProgress: {
                include: {
                  book: true,
                },
              },
            },
          },
        },
      }),
    ),
  );

  return {
    props: {
      user,
      books,
      classes,
    },
  };
};
export default HomePage;