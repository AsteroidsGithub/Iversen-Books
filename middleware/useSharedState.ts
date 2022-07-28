import { I_PillInformation } from '@Interfaces/books';
import { I_User } from '@Interfaces/users';
import { useState } from 'react';
import { useBetween } from 'use-between';

const useSharedState = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [struggledWords, setStruggledWords] = useState<I_PillInformation[]>([
    { count: 0, value: 'New Skill', color: 'red' },
    { count: 0, value: 'Previous Skill', color: 'green' },
    { count: 0, value: 'New High-Frequency', color: 'blue' },
    { count: 0, value: 'Previous High-Frequency', color: 'pink' },
    { count: 0, value: 'Photo / Context Aware', color: 'amber' },
  ]);
  const [activeModal, setActiveModal] = useState<JSX.Element | null>(null);
  const [user, setUser] = useState<I_User>();
  return {
    activeTab,
    setActiveTab,
    struggledWords,
    setStruggledWords,
    activeModal,
    setActiveModal,
    user,
    setUser,
  };
};

export default () => useBetween(useSharedState);
