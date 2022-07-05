import PillHeader from '@Components/PillHeader';
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { bookId, studentId } = router.query;

  return (
    <>
      <PillHeader />
    </>
  );
};

export default Post;
