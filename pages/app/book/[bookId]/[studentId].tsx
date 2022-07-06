import PillHeader from '@Components/PillHeader';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { User } from '@Interfaces/users';
import getUser from '@Utilities/getUser';
import useSharedState from '@Middleware/useSharedState';

const Post: NextPage<{ user: User }> = ({ user }) => {
  const { bookId, studentId } = useRouter().query;
  useSharedState().setUser(user);

  const test: string[] =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur euismod, nisi nisl aliquet nisl, eget consectetur nisl nisi vel nisl.'.split(
      ' ',
    );

  const testType: string[] = ['New Skill', 'PT SKill'];

  return (
    <>
      <PillHeader />
      <div>
        <h2>Pages 1 & 2</h2>
        <p>
          {test.map((word, i) => (
            <span key={i} onClick={() => console.log(word)} className="cursor-pointer">
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (context) => getUser(context);
export default Post;
