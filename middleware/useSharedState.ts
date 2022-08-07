import { User } from '@Services/database';



import { I_PillInformation } from '@Interfaces/books';



import { useState } from 'react';
import { useBetween } from 'use-between';


const useSharedState = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<JSX.Element | null>(null);

  const [user, setUser] = useState<User>();

  const [struggledWords, setStruggledWords] = useState<I_PillInformation[]>([
    { count: 0, value: 'New Skill', color: 'red', words: [] },
    { count: 0, value: 'Previous Skill', color: 'green', words: [] },
    { count: 0, value: 'New High-Frequency', color: 'blue', words: [] },
    { count: 0, value: 'Previous High-Frequency', color: 'pink', words: [] },
    { count: 0, value: 'Photo / Context Aware', color: 'amber', words: [] },
  ]);

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