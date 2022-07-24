import PillHeader from '@Components/PillHeader';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { User } from '@Interfaces/users';
import getUser from '@Utilities/getUser';
import useSharedState from '@Middleware/useSharedState';
import { useState } from 'react';
import { PillInformation } from '@Interfaces/next';

const Post: NextPage<{ user: User }> = ({ user }) => {
  const { bookId, studentId } = useRouter().query;
  useSharedState().setUser(user);
  // Pages > Lines
  
  interface BookJSON {
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
        Lines: {
          value: string;
          type:
            | 'New Skill'
            | 'Previous Skill'
            | 'New High-Frequency'
            | 'Previous High-Frequency'
            | 'Photo / Context Aware';
        }[][];
      },
    ];
  }

  const bookJSONExample: BookJSON = {
    metadata: {
      title: 'Breakfast',
      author: 'John Doe',
      description: 'A book about breakfast',
      InterventionLevel: 15.3,
      wordCount: 100,
      newPhonicSkill: 'Compound Words',
      newHighFrequencyWord: 'Sometimes',
    },
    refs: {
      raw: 'https://raw.githubusercontent.com/...',
      coverArt: 'https://...',
    },
    Pages: [
      {
        start: 2,
        end: 3,
        Lines: [
          [
            {
              value: 'What',
              type: 'Previous High-Frequency',
            },
            {
              value: 'did',
              type: 'Previous Skill',
            },
            {
              value: 'you',
              type: 'Previous High-Frequency',
            },
            {
              value: 'for',
              type: 'Previous High-Frequency',
            },
            {
              value: 'breakfast',
              type: 'New Skill',
            },
            {
              value: 'today?',
              type: 'New Skill',
            },
          ],
        ],
      },
    ],
  };
  //   [
  //     'What did you have for breakfast today? Did you have a bran muffin?',
  //     'Did you have pancakes?',
  //     'Did you have cornflakes?',
  //     'Some people eat these things',
  //     'for breakfast.',
  //     'But did you know that sometimes',
  //     'people eat and drink other things, too?',
  //   ],
  //   [
  //     'Did you know that',
  //     'sometimes people in Mexico',
  //     'eat burritos for breakfast?',
  //     'They cook meat with tomato and eggs. They grate some cheese.',
  //     'They cut some lettuce.',
  //     'They warm tortillas.',
  //     'They put everything in a warm tortilla and eat it for breakfast.',
  //   ],
  //   [
  //     'Did you know that',
  //     'sometimes people in Korea',
  //     'eat rice and vegetables for breakfast? Sometimes they eat soup.',
  //     'They boil the rice. They make the soup. They cook the vegetables.',
  //     'They may put vegetables in the soup. They may drink green tea',
  //     'at breakfast time.',
  //   ],
  //   [
  //     'Did you know that',
  //     'sometimes people in England',
  //     'eat bacon and eggs for breakfast? They fry the bacon.',
  //     'They fry the eggs.',
  //     'They make the toast.',
  //     'They drink hot tea.',
  //   ],
  //   [
  //     'Did you know that',
  //     'sometimes people in Turkey',
  //     'eat bread and cheese for breakfast? They may eat eggs and meat',
  //     'with the bread and cheese. Sometimes they eat bread and nuts. They drink hot, black tea.',
  //   ],
  // ];

  return (
    <>
      <PillHeader />
      <div>
        {bookJSONExample.Pages.map((page, index) => (
          <>
            <h2>
              Page {page.start}/{page.end}
            </h2>
            <p>
              {page.Lines.map((line, i) => (
                <p>
                  {line.map((word, j) => (
                    <span
                      key={i}
                      onClick={() => console.log(`${word.value}:${word.type}`)}
                      className="cursor-pointer"
                    >
                      {word.value}{' '}
                    </span>
                  ))}
                  <br />
                </p>
              ))}
            </p>
          </>
        ))}
      </div>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = (context) => getUser(context);
export default Post;
