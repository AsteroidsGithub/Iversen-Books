import useSharedState from '@Middleware/useSharedState';

const TabHeader: React.FC<{ tabs: JSX.Element[] }> = ({ tabs }) => {
  const { activeTab, setActiveTab, user } = useSharedState();

  return (
    <div className="flex justify-center">
      <h1>{user?.firstName}</h1>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${
            index === activeTab ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'
          } rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900`}
          onClick={() => setActiveTab(index)}
        >
          {tab.props.tabName}
        </button>
      ))}
    </div>
  );
};

export default TabHeader;
