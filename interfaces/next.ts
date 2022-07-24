import React from 'react';

export type T_NextTabPage = React.FC<{
  tabName: string;
}>;

export interface I_PillInformation {
  [value: string]: {
    count: number;
    color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'pink';
  };
}