import Header from '@Components/headers/Header';

import useSharedState from '@Middleware/useSharedState';
import prisma, { Book, Student, StudentProgress, User } from '@Services/database';
import checkAuth from '@Utilities/checkAuth';

import { GetServerSideProps, NextPage } from 'next';

const Post: NextPage<{ user: User; report: StudentProgress }> = ({ user, report }) => {
  const { setUser, struggledWords, setStruggledWords } = useSharedState();
  setUser(user);

  console.log(report);

  return (
    <>
      <Header
        title={
          <>
            Results for{' '}
            <span className="text-blue-500">
              {report.student.firstName} {report.student.lastName}
            </span>{' '}
          </>
        }
      />
      <div className="grid md:grid-cols-2 px-4">
        <section>
          <h1 className=" pb-2 pt-4  text-2xl font-bold">Summary</h1>
          <ul>
            <li>
              <span className='font-medium text-lg'>Student:</span> {report.student.firstName} {report.student.lastName}
            </li>
            <li> <span className='font-medium text-lg'>Book:</span>{report.book.json.metadata.title}</li>
            <li> <span className='font-medium text-lg'>Reading Level:</span> {report.book.json.metadata.interventionLevel}</li>
            <li> <span className='font-medium text-lg'>Date:</span> {new Date(report.date).toLocaleDateString()}</li>
            <li> <span className='font-medium text-lg'>Time:</span> {new Date(report.time * 1000).toISOString().substring(14, 19)}</li>
          </ul>
        </section>

        <section>
          <h1 className=" pb-2 pt-4  text-2xl font-bold">Errors</h1>
          <ul>
            <li>
                <span className='font-medium text-lg'>Total Errors: {report.struggledWords?.flat()}</span><br/>
              </li>
            {report.struggledWords?.map((struggleWord) => (
              <li>
                <span className='font-medium text-lg'>{struggleWord.value}: {struggleWord.words.flat().length}</span><br/>
                {struggleWord.words.flat().join(', ')}
              </li>
            ))}
          </ul>
        </section>

        <section className='md:col-span-2'>
          <h1 className=" pb-2 pt-4  text-2xl font-bold">Book Assessed</h1>
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
        </section>
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
          id: true,
          time: true,
          date: true,
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
