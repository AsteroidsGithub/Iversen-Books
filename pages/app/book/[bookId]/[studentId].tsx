import Word from '@Components/Word';
import PillHeader from '@Components/headers/PillHeader';

import useSharedState from '@Middleware/useSharedState';
import prisma, { Book, Student, User } from '@Services/database';
import checkAuth from '@Utilities/checkAuth';

import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Router from 'next/router';
import { useEffect, useState } from 'react';

const Post: NextPage<{ user: User; book: Book; student: Student }> = ({ user, book, student }) => {
  const { setUser, struggledWords, setStruggledWords } = useSharedState();
  const [timeElapsed, setTimeElapsed] = useState(0);
  setUser(user);

  // useEffect is used to prevent a infinite loop of state updates
  // when we call the setStruggledWords function.
  useEffect(
    () =>
      setStruggledWords([
        { count: 0, value: 'New Skill', color: 'red', words: [] },
        { count: 0, value: 'Previous Skill', color: 'green', words: [] },
        { count: 0, value: 'New High-Frequency', color: 'blue', words: [] },
        { count: 0, value: 'Previous High-Frequency', color: 'pink', words: [] },
        { count: 0, value: 'Photo / Context Aware', color: 'amber', words: [] },
      ]),
    [],
  );

  useEffect(() => {
    setInterval(() => {
      setTimeElapsed((seconds) => seconds + 1);
    }, 1000);
  }, [true, timeElapsed]);

  return (
    <>
      <PillHeader student={student} />
      <div>
        <div>
          <h1 className=" pb-2 pt-4  text-2xl font-bold">Color Key and Marking Instructions</h1>

          <p>
            Click on a word for a student mistake, click again if the student self corrected the mistake. Words will highlight to the following key.
            <br/>
            <span className="text-red-500">New Skill</span> - Words that are new to the student and are not in the student's vocabulary list.
            <br />
            <span className="text-green-500">Previous Skill</span> - Words that are in the student's vocabulary list or have been previously assessed.
            <br />
            <span className="text-blue-500">New High-Frequency</span> - Words that are new to the student and are in the student's vocabulary list.
            <br />
            <span className="text-pink-500">Previous High-Frequency</span> - Words that are in the student's vocabulary list and have been previously assessed.
            <br />
            <span className="text-amber-500">Photo / Context Aware</span> - Words that can be identified by the student based on the photo or context.
            <br />

          </p>
        </div>
        {book.json.pages.map((page, a) => (
          <div key={a}>
            <h2>
              Page {page.start}/{page.end}
            </h2>
            <p className='select-none'>
              {page.lines.map((line, b) => (
                <p key={b}>
                  {line.map((word, c) => (
                    <Word index={c} word={word} />
                  ))}
                  <br />
                </p>
              ))}
            </p>
          </div>
        ))}
        <button
          onClick={() => {
            axios
              .post(`/api/${student.id}/postResults`, {
                studentId: student.id,
                bookId: book.id,
                struggledWords: struggledWords.map((word) => ({
                  count: word.count,
                  value: word.value,
                  words: word.words,
                })),
                time: timeElapsed,
              })
              .then((data) => Router.push(`/app/report/${data.data.studentProgress.id}`));
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await checkAuth(context.req.cookies.auth);
  if (!user) return { redirect: { destination: '/' }, props: {} };

  const { bookId, studentId } = context.query;

  const book: Book = JSON.parse(
    JSON.stringify(
      await prisma.book.findUnique({
        where: { id: parseInt(`${bookId}`) },
      }),
    ),
  );

  const student: Student = JSON.parse(
    JSON.stringify(
      await prisma.student.findUnique({
        where: { id: parseInt(`${studentId}`) },
      }),
    ),
  );

  if (!book || !student) return { redirect: { destination: '/app' }, props: {} };

  return {
    props: {
      user,
      student,
      book: book,
    },
  };
};
export default Post;
