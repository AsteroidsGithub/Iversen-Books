import useSharedState from '@Middleware/useSharedState';

const TabHeader: React.FC<{ tabs: JSX.Element[] }> = ({ tabs }) => {
  const { activeTab, setActiveTab, user } = useSharedState();

  return (
    <div className="sticky top-0 flex flex-col bg-white/90 p-2 shadow-lg">
      <div className="flex px-2 pt-6 pb-4">
        <h1 className="flex-grow justify-start font-serif text-2xl font-bold text-gray-800">
          Iverson Publishing App
        </h1>
        <div className="flex justify-end space-x-1">
          <h2 className="font-serif text-xl font-bold text-gray-800">{user?.firstName}</h2>
          <div className="h-8 w-8 rounded-full bg-gray-500" />
        </div>
      </div>
      <div className="flex justify-center space-x-2 ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              index === activeTab ? 'border-b-4 border-blue-500 text-lg font-bold' : 'text-md '
            } text-md h-12 w-full rounded-md px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 hover:text-lg hover:text-blue-500 `}
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
