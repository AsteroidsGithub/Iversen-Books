import React from 'react';

export type NextTabPage = React.FC<{
  tabName: string;
}>;

export interface PillInformation {
  [value: string]: {
    count: number;
    color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'pink';
  };
}