import useSharedState from '@Middleware/useSharedState';

const TabHeader: React.FC<{ tabs: JSX.Element[] }> = ({ tabs }) => {
  const { activeTab, setActiveTab, user } = useSharedState();

  return (
    <div className="sticky top-0 grid h-auto grid-cols-3 grid-rows-2 bg-white/90 px-2  shadow-lg backdrop-blur-3xl md:grid-rows-1">
      <h1 className="col-start-1 row-start-1 justify-start self-center py-3 font-serif text-2xl font-bold text-gray-800">
        Quick60
      </h1>

      <div className="col-start-3 row-start-1 flex justify-end space-x-1 self-center py-3">
        <h2 className="font-serif text-xl font-bold text-gray-800">{user?.firstName}</h2>
        <div className="h-8 w-8 rounded-full bg-gray-500" />
      </div>

      <div className="col-span-3 col-start-1 row-start-2 flex justify-center space-x-2 md:col-span-1 md:col-start-2 md:row-start-1 ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              index === activeTab ? 'border-b-4 border-blue-500 text-lg font-bold' : 'text-md '
            } text-md h-full w-1/2 px-4 py-2 font-semibold text-gray-700 hover:rounded-md hover:bg-gray-50 hover:text-lg hover:text-blue-500 md:w-full `}
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
