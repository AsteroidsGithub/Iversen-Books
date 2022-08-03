import useSharedState from '@Middleware/useSharedState';

import { E_WordTypeColor, I_BookWord } from '@Interfaces/books';

import { useState } from 'react';

const Word: React.FC<{
  index: number;
  word: I_BookWord;
}> = ({ index, word }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { setStruggledWords, struggledWords } = useSharedState();
  return (
    <span
      key={index}
      onClick={() => {
        // Checked if the word is in the list, if not cancel the function
        // because it will crash horribly into the fiery pits of node.js
        const updatedWord = struggledWords.find((w) => w.value === word.type);
        if (!updatedWord) return;

        updatedWord.count = updatedWord.count + (isSelected ? -1 : 1);

        // Update the state and color of the word and then loop through the
        // struggledWords array and update the word if its' type matches our
        // new updatedWord. This ensures that our code cannot create duplicates
        // of the same word in the array.
        setIsSelected(!isSelected);
        setStruggledWords((previous) =>
          previous.map((w) => (w.value === word.type ? updatedWord : w)),
        );
      }}
      className={`cursor-pointer ${isSelected && `text-${E_WordTypeColor[word.type]}-500`}`}
    >
      {word.value}{' '}
    </span>
  );
};
export default Word;
