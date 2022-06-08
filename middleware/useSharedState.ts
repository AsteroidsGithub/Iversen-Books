import { User } from '@Interfaces/users';
import { useState } from 'react';
import { useBetween } from 'use-between';

const useSharedState = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState<User>();

  return {
    activeTab,
    setActiveTab,
    user,
    setUser,
  };
};

export default () => useBetween(useSharedState);
