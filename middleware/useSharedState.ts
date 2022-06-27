import { User } from '@Interfaces/users';
import { useState } from 'react';
import { useBetween } from 'use-between';

const useSharedState = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<JSX.Element | null>(null);
  const [user, setUser] = useState<User>();

  return {
    activeTab,
    setActiveTab,
    activeModal,
    setActiveModal,
    user,
    setUser,
  };
};

export default () => useBetween(useSharedState);
