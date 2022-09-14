import useSharedState from '@Middleware/useSharedState';
import { Student } from '@Services/database';

import { useRouter } from 'next/router';

const PillHeader: React.FC<{ student: Student }> = ({ student }) => {
  const { struggledWords, user } = useSharedState();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 grid h-auto grid-cols-3 grid-rows-2 bg-white/90 px-2  shadow-lg backdrop-blur-3xl lg:grid-rows-1">
      <div className="col-span-2 col-start-1 row-start-1 justify-start self-center py-3 lg:col-span-1 ">
        <button
          className="inline align-middle text-3xl"
          onClick={() => {
            router.push('/app');
          }}
        >
          ⇠
        </button>
        <h1 className="inline align-middle font-serif text-2xl font-bold text-gray-800">
          Evaluating{' '}
          <span className="text-blue-500">
            {student.firstName} {student.lastName}
          </span>
        </h1>
      </div>

      <div className="col-start-3 row-start-1 flex justify-end space-x-1 self-center py-3">
        <h2 className="font-serif text-xl font-bold text-gray-800">{user?.firstName}</h2>
        <div className="h-8 w-8 rounded-full bg-gray-500" />
      </div>

      <div className="col-span-3 col-start-1 row-start-2 flex h-full snap-x snap-mandatory no-scrollbar space-x-2 overflow-x-auto align-middle  lg:col-span-1 lg:col-start-2 lg:row-start-1 ">
        {struggledWords
          // Sort the highest count first for ease of use
          .sort((a, b) => b.count - a.count)
          .map((word, a) => (
            <button
              key={a}
              className={`my-2 min-w-fit snap-start text-${word.color}-500 rounded-md border-2 px-4 shadow`}
            >
              {word.value}: {word.count}
            </button>
          ))}
      </div>
    </div>
  );
};

export default PillHeader;
