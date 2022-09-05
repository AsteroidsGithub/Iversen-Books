import Word from '@Components/Word';
import PillHeader from '@Components/headers/PillHeader';
import Header from '@Components/headers/ResultsHeader';

import useSharedState from '@Middleware/useSharedState';
import prisma, { Book, Student, StudentProgress, User } from '@Services/database';
import checkAuth from '@Utilities/checkAuth';

import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';

const Post: NextPage<{ user: User; report: StudentProgress }> = ({ user, report }) => {
  const { setUser, struggledWords, setStruggledWords } = useSharedState();
  setUser(user);

  console.log(report);

  return (
    <>
      <Header student={report.student} />
      <div>
        {report.struggledWords
          ?.map((struggleWord) => struggleWord.words)
          .flat()
          .join(', ')}
      </div>
      <div>
        {report.book.json.pages.map((page, a) => (
          <div key={a}>
            <h2 className="select-none cursor-default">
              Page {page.start}/{page.end}
            </h2>
            <p>
              {page.lines.map((line, b) => (
                <p key={b}>
                  {line.map((word, c) => word.value + ' ')}
                  <br />
                </p>
              ))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await checkAuth(context.req.cookies.auth);
  if (!user) return { redirect: { destination: '/' }, props: {} };

  const { reportId } = context.query;

  const report: StudentProgress = JSON.parse(
    JSON.stringify(
      await prisma.studentProgress.findUnique({
        where: { id: parseInt(`${reportId}`) },
        select: {
          book: true,
          student: true,
          struggledWords: true,
        },
      }),
    ),
  );

  if (!report) return { redirect: { destination: '/app' }, props: {} };

  return {
    props: {
      user,
      report,
    },
  };
};
export default Post;
