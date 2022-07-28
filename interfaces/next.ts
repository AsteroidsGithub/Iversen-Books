import React from 'react';

interface I_NextTabPageProps {
  tabName?: string;
  [key: string]: any;
}
export type T_NextTabPage<test = {}> = React.FC<test>;
