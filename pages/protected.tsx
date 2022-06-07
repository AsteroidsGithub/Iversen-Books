import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { User } from '@Interfaces/users';
import useSharedState from '@Middleware/useSharedState';
import getUser from '@Utilities/getUser';

const BooksTab: React.FC<{ name: string }> = () => {
  return <h1>Top of digi is the goal</h1>;
};
const ProgressTab: React.FC<{ name: string }> = () => {
  return <h1>lmao</h1>;
};

const TabbedHeader: React.FC<{ tabs: JSX.Element[] }> = ({ tabs }) => {
  const { activeTab, setActiveTab } = useSharedState();

  return (
    <div className="flex justify-center">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${
            index === activeTab ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'
          } rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900`}
          onClick={() => setActiveTab(index)}
        >
          {tab.props.name}
        </button>
      ))}
    </div>
  );
};

const ProtectedPage: NextPage<{ user: User }> = ({ user }) => {
  const { activeTab, setActiveTab } = useSharedState();
  const tabs = [<BooksTab name="Books" />, <ProgressTab name="Progress" />];

  return (
    <>
      <TabbedHeader tabs={tabs} />
      {tabs[activeTab]}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (context) => getUser(context);
export default ProtectedPage;
