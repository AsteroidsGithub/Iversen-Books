import { useState } from 'react';
import { useBetween } from 'use-between';

const useSharedState = () => {
  const [activeTab, setActiveTab] = useState(0);

  return {
    activeTab,
    setActiveTab,
  };
};

export default () => useBetween(useSharedState);
