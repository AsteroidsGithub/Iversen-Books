import PillHeader from '@Components/PillHeader';
import Word from '@Components/Word';
import { I_BookJSON } from '@Interfaces/books';
import { I_User } from '@Interfaces/users';
import useSharedState from '@Middleware/useSharedState';
import prisma, { Book, Student, User } from '@Services/database';
import checkAuth from '@Utilities/checkAuth';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';


const Post: NextPage<{ user: User; book: Book; student: Student }> = ({ user, book, student }) => {
  const { setUser, setStruggledWords } = useSharedState();
  setUser(user);

  // useEffect is used to prevent a infinite loop of state updates
  // when we call the setStruggledWords function.
  useEffect(
    () =>
      setStruggledWords([
        { count: 0, value: 'New Skill', color: 'red' },
        { count: 0, value: 'Previous Skill', color: 'green' },
        { count: 0, value: 'New High-Frequency', color: 'blue' },
        { count: 0, value: 'Previous High-Frequency', color: 'pink' },
        { count: 0, value: 'Photo / Context Aware', color: 'amber' },
      ]),
    [],
  );

  return (
    <>
      <PillHeader student={student} />
      <div>
        <div>
          <h2>Key</h2>
          <p>
            <span className="text-red-500">New Skill</span>
            <br />
            <span className="text-green-500">Previous Skill</span>
            <br />
            <span className="text-blue-500">New High-Frequency</span>
            <br />
            <span className="text-pink-500">Previous High-Frequency</span>
            <br />
            <span className="text-amber-500">Photo / Context Aware</span>
            <br />
            <br />
          </p>
        </div>
        {book.json.pages.map((page, a) => (
          <div key={a}>
            <h2>
              Page {page.start}/{page.end}
            </h2>
            <p>
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