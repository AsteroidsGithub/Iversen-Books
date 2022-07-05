import PillHeader from '@Components/PillHeader';
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { bookId, studentId } = router.query;

  const test: string[] =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur euismod, nisi nisl aliquet nisl, eget consectetur nisl nisi vel nisl.'.split(
      ' ',
    );

  return (
    <>
      <PillHeader />
      <div>
        <h2>Pages 1 & 2</h2>
        <p>
          {test.map((word, i) => (
            <span key={i} onClick={() => console.log(word)}>
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </>
  );
};

export default Post;
