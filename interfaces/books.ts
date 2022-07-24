export type WordType =
  | 'New Skill'
  | 'Previous Skill'
  | 'New High-Frequency'
  | 'Previous High-Frequency'
  | 'Photo / Context Aware';

export enum WordTypeColor {
  'New Skill' = 'red',
  'Previous Skill' = 'green',
  'New High-Frequency' = 'blue',
  'Previous High-Frequency' = 'pink',
  'Photo / Context Aware' = 'amber',
}

export interface BookWord {
  value: string;
  type: WordType;
}

export interface BookJSON {
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
      Lines: BookWord[][];
    },
  ];
}
