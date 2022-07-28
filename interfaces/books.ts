export type T_WordType =
  | 'New Skill'
  | 'Previous Skill'
  | 'New High-Frequency'
  | 'Previous High-Frequency'
  | 'Photo / Context Aware';

export enum E_WordTypeColor {
  'New Skill' = 'red',
  'Previous Skill' = 'green',
  'New High-Frequency' = 'blue',
  'Previous High-Frequency' = 'pink',
  'Photo / Context Aware' = 'amber',
}

export type T_WordTypeColor = 'red' | 'green' | 'blue' | 'pink' | 'amber';

export interface I_BookWord {
  value: string;
  type: T_WordType;
}

export interface I_BookJSON {
  version: number;
  metadata: {
    title: string;
    author: string;
    description: string;
    newPhonicSkill: string;
    newHighFrequencyWord: string;
    interventionLevel: number;
    wordCount: number;
  };
  refs: {
    raw: string;
    coverArt: string;
  };
  pages: [
    {
      start: number;
      end: number;
      lines: I_BookWord[][];
    },
  ];
  comprehension: {
    literal: string[];
    inferential: string[];
  };
}

export interface I_PillInformation {
  count: number;
  value: T_WordType;
  color: E_WordTypeColor | T_WordTypeColor;
}