import useSharedState from '@Middleware/useSharedState';
import { useRouter } from 'next/router';

const StartReadingModal: React.FC = () => {
  const router = useRouter();
  const { setActiveModal } = useSharedState();

  return (
    <div>
      <h1>Start Reading</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel
        consectetur euismod, nisi nisl aliquet nisl, eget consectetur nisl nisi vel nisl.
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          setActiveModal(null);
          router.push('/app/book/1/6');
        }}
      >
        Start Reading
      </button>
    </div>
  );
};

export default StartReadingModal;
