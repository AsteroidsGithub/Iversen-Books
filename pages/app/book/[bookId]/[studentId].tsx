import PillHeader from '@Components/PillHeader';
import Word from '@Components/Word';
import useSharedState from '@Middleware/useSharedState';
import checkAuth from '@Utilities/checkAuth';
import prisma from '@Services/database';

import { GetServerSideProps, NextPage } from 'next';
import { I_BookJSON } from '@Interfaces/books';
import { I_User } from '@Interfaces/users';

const Post: NextPage<{ user: I_User; book: I_BookJSON }> = ({ user }) => {
  useSharedState().setUser(user);
  // Pages > Lines

  const bookJSONExample: I_BookJSON = {
    version: 1,
    metadata: {
      title: 'Breakfast',
      author: 'John Doe',
      description: 'A book about breakfast',
      interventionLevel: 15.3,
      wordCount: 189,
      newPhonicSkill: 'Compound Words',
      newHighFrequencyWord: 'Sometimes',
    },
    refs: {
      raw: 'https://raw.githubusercontent.com/...',
      coverArt: 'https://...',
    },
    pages: [
      {
        start: 2,
        end: 3,
        lines: [
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
          [
            {
              value: 'Did',
              type: 'Previous Skill',
            },
            {
              value: 'you',
              type: 'Previous High-Frequency',
            },
            {
              value: 'have',
              type: 'Previous High-Frequency',
            },
            {
              value: 'a',
              type: 'Previous High-Frequency',
            },
            {
              value: 'bran',
              type: 'Previous Skill',
            },
            {
              value: 'muffin?',
              type: 'Photo / Context Aware',
            },
          ],
          [
            {
              value: 'Did',
              type: 'Previous Skill',
            },
            {
              value: 'you',
              type: 'Previous High-Frequency',
            },
            {
              value: 'have',
              type: 'Previous High-Frequency',
            },
            {
              value: 'pancakes?',
              type: 'New Skill',
            },
          ],
          [
            {
              value: 'Did',
              type: 'Previous Skill',
            },
            {
              value: 'you',
              type: 'Previous High-Frequency',
            },
            {
              value: 'have',
              type: 'Previous High-Frequency',
            },
            {
              value: 'cornflakes?',
              type: 'New Skill',
            },
          ],
          [
            {
              value: 'Some',
              type: 'Previous High-Frequency',
            },
            {
              value: 'people',
              type: 'Previous High-Frequency',
            },
            {
              value: 'eat',
              type: 'Previous Skill',
            },
            {
              value: 'these',
              type: 'Previous High-Frequency',
            },
            {
              value: 'things',
              type: 'Previous Skill',
            },
          ],
          [
            {
              value: 'for',
              type: 'Previous High-Frequency',
            },
            {
              value: 'breakfast.',
              type: 'New Skill',
            },
          ],
        ],
      },
    ],
    comprehension: {
      literal: [],
      inferential: [],
    },
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
        <div>
          <h2>Key</h2>
          <p>
            <span className="text-red-500">New Skill</span>
            <br />
            <span className="text-green-500">Previous Skill</span>
            <br />
            <span className="text-blue-500">New High-Frequency</span>
            <br />
            <span className="text-pink-500">Previous High-Frequency</span>
            <br />
            <span className="text-amber-500">Photo / Context Aware</span>
            <br />
            <br />
          </p>
        </div>
        {bookJSONExample.pages.map((page, a) => (
          <div key={a}>
            <h2>
              Page {page.start}/{page.end}
            </h2>
            <p>
              {page.lines.map((line, b) => (
                <p key={b}>
                  {line.map((word, c) => (
                    <Word index={c} word={word} />
                  ))}
                  <br />
                </p>
              ))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await checkAuth(context.req.cookies.auth);
  if (!user) return { redirect: { destination: '/' }, props: {} };

  const { bookId } = context.query;

  const book = await prisma.book.findUnique({
    where: { id: parseInt(`${bookId}`) },
  });

  if (!book) return { redirect: { destination: '/app' }, props: {} };

  console.log(book.rawJSON);

  return {
    props: {
      user,
      book: book.rawJSON,
    },
  };
};
export default Post;
