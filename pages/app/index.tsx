import TabHeader from '@Components/headers/TabHeader';
import BooksTab from '@Views/books.tab';
import PublishTab from '@Views/publish.tab';
import StudentsTab from '@Views/students.tab';



import useSharedState from '@Middleware/useSharedState';
import prisma, { Book, Class, User } from '@Services/database';
import checkAuth from '@Utilities/checkAuth';



import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';


const HomePage: NextPage<{ user: User; books: Book[]; classes: Class[] }> = ({
  user,
  books,
  classes,
}) => {
  const { activeTab, setUser } = useSharedState();
  const tabs: JSX.Element[] = [
    <BooksTab tabName="Books" books={books} classes={classes} />,
    <StudentsTab tabName="Students" classes={classes} />,
  ];

  if (user.permissions == 'Publisher')
    tabs.push(<PublishTab tabName="Publish" books={books} classes={classes} />);

  // This is a bit of a hack, but it's the only way to get
  // the user without calling GetServerSideProps.
  setUser(user);

  return (
    <div className='bg-slate-50 min-h-screen'>
      <TabHeader tabs={tabs} />
      {tabs[activeTab]}
    </div>
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
                  struggledWords: {
                    include: {
                      words: true,
                    },
                  },
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