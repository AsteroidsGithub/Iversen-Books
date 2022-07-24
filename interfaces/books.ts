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

export interface I_BookWord {
  value: string;
  type: T_WordType;
}

export interface I_BookJSON {
  metadata: {
    title: string;
    author: string;
    description: string;
    newPhonicSkill: string;
    newHighFrequencyWord: string;
    InterventionLevel: number;
    wordCount: number;
  };
  refs: {
    raw: string;
    coverArt: string;
  };
  Pages: [
    {
      start: number;
      end: number;
      Lines: I_BookWord[][];
    },
  ];
}
