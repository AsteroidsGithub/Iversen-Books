import useSharedState from '@Middleware/useSharedState';
import { array } from 'joi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// interface PillInformation {
//   count: number;
//   value: string;
//   color: string;
// }

const PillHeader: React.FC = () => {
  const { activeTab, setActiveTab, user } = useSharedState();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 grid h-auto grid-cols-3 grid-rows-2 bg-white/90 px-2  shadow-lg backdrop-blur-3xl md:grid-rows-1">
      <div className="col-span-2 col-start-1 row-start-1 justify-start self-center py-3 md:col-span-1 ">
        <button className="inline align-middle text-3xl" onClick={() => router.push('/app')}>
          ⇠
        </button>
        <h1 className="inline align-middle font-serif text-2xl font-bold text-gray-800">
          Evaluating <span className="text-blue-500">{user?.firstName}</span>
        </h1>
      </div>

      <div className="col-start-3 row-start-1 flex justify-end space-x-1 self-center py-3">
        <h2 className="font-serif text-xl font-bold text-gray-800">{user?.firstName}</h2>
        <div className="h-8 w-8 rounded-full bg-gray-500" />
      </div>

      <div className="col-span-3 col-start-1 row-start-2 flex h-full snap-x snap-mandatory  space-x-2 overflow-x-auto align-middle  md:col-span-1 md:col-start-2 md:row-start-1 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tab, index) => (
          <button key={index} className="my-2 min-w-fit snap-start bg-blue-500 px-4 ">
            Pill Item {tab}
          </button>
        ))}
        {/* {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              index === activeTab ? 'border-b-4 border-blue-500 text-lg font-bold' : 'text-md '
            } text-md h-full w-1/2 px-4 py-2 font-semibold text-gray-700 hover:rounded-md hover:bg-gray-50 hover:text-lg hover:text-blue-500 md:w-full `}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.tabName}
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default PillHeader;
