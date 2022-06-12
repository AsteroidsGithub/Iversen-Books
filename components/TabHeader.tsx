import useSharedState from '@Middleware/useSharedState';

const TabHeader: React.FC<{ tabs: JSX.Element[] }> = ({ tabs }) => {
  const { activeTab, setActiveTab, user } = useSharedState();

  return (
    <div className="sticky top-0 flex flex-col bg-white/95 p-2 pb-0 shadow-lg backdrop-blur-sm">
      <div className="flex px-2 pt-6 pb-4">
        <h1 className="flex-grow justify-start font-serif text-2xl font-bold text-gray-800">
          Iverson Publishing App
        </h1>
        <div className="flex justify-end space-x-1">
          <h2 className="font-serif text-xl font-bold text-gray-800">{user?.firstName}</h2>
          <div className="h-8 w-8 rounded-full bg-gray-500" />
        </div>
      </div>
      <div className="flex  justify-center space-x-2 ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              index === activeTab ? 'border-b-4 border-blue-500 text-lg font-bold' : 'text-md '
            } text-md h-12 w-1/2 px-4 py-2 font-semibold text-gray-700 hover:rounded-md hover:bg-gray-50 hover:text-lg hover:text-blue-500 md:w-1/3 `}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.tabName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabHeader;
