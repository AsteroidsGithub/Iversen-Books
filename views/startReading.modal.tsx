import { useRouter } from 'next/router';

const StartReadingModal: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Start Reading</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel
        consectetur euismod, nisi nisl aliquet nisl, eget consectetur nisl nisi vel nisl.
      </p>
      <button
        onClick={(e) => {
          console.log('j');
          router.push('/app');
        }}
      >
        Start Reading
      </button>
    </div>
  );
};

export default StartReadingModal;
