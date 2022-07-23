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
  const bookRawData: string[][] = [
    [
      'What did you have for breakfast today? Did you have a bran muffin?',
      'Did you have pancakes?',
      'Did you have cornflakes?',
      'Some people eat these things',
      'for breakfast.',
      'But did you know that sometimes',
      'people eat and drink other things, too?',
    ],
    [
      'Did you know that',
      'sometimes people in Mexico',
      'eat burritos for breakfast?',
      'They cook meat with tomato and eggs. They grate some cheese.',
      'They cut some lettuce.',
      'They warm tortillas.',
      'They put everything in a warm tortilla and eat it for breakfast.',
    ],
    [
      'Did you know that',
      'sometimes people in Korea',
      'eat rice and vegetables for breakfast? Sometimes they eat soup.',
      'They boil the rice. They make the soup. They cook the vegetables.',
      'They may put vegetables in the soup. They may drink green tea',
      'at breakfast time.',
    ],
    [
      'Did you know that',
      'sometimes people in England',
      'eat bacon and eggs for breakfast? They fry the bacon.',
      'They fry the eggs.',
      'They make the toast.',
      'They drink hot tea.',
    ],
    [
      'Did you know that',
      'sometimes people in Turkey',
      'eat bread and cheese for breakfast? They may eat eggs and meat',
      'with the bread and cheese. Sometimes they eat bread and nuts. They drink hot, black tea.',
    ],
  ];

  // Pages > Lines > Words
  const bookData: string[][][] = bookRawData.map((page) => page.map((line) => line.split(' ')));

  const [pill, setPill] = useState<PillInformation[]>([
    {
      word: {
        color: 'blue',
        count: 0,
      },
    },
  ]);

  return (
    <>
      <PillHeader pillInfo={pill} />
      <div>
        {bookData.map((pages, index) => (
          <>
            <h2>Page {index}</h2>
            <p>
              {pages.map((line, i) => (
                <p>
                  {line.map((word) => (
                    <span
                      key={i}
                      onClick={() => setPill((prev) => [...prev])}
                      className="cursor-pointer"
                    >
                      {word}{' '}
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
