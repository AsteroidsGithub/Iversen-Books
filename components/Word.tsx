import useSharedState from '@Middleware/useSharedState';



import { E_WordTypeColor, I_BookWord } from '@Interfaces/books';



import { useState } from 'react';


const Word: React.FC<{
  index: number;
  word: I_BookWord;
}> = ({ index, word }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selfCorrected, setSelfCorrected] = useState<boolean>(false);
  const { setStruggledWords, struggledWords } = useSharedState();
  return (
    <span
      key={index}
      onClick={() => {
        // Checked if the word is in the list, if not cancel the function
        // because it will crash horribly into the fiery pits of node.js
        const updatedWordArray = struggledWords.find((w) => w.value === word.type);
        if (!updatedWordArray) return;

        const updatedWord = updatedWordArray.words.find((w) => w.id === index);

        // Update the state and color of the word and then loop through the
        // struggledWords array and update the  word if its' type matches our
        // new updatedWord. This ensures that our code cannot create duplicates
        // of the same word in the array.
        if (isSelected == false) {
          setIsSelected(true);
          setSelfCorrected(false);
          updatedWordArray.words.push({
            id: index,
            word: word.value,
            selfCorrected: selfCorrected,
          });

          updatedWordArray.count += 1;
        } else if (isSelected == true && selfCorrected == false) {
          setIsSelected(true);
          setSelfCorrected(true);

          // If the selected word is already in the words array then we set it
          // as selfCorrected and update it's state
          if (updatedWord) updatedWord.selfCorrected = !updatedWord.selfCorrected;
        } else if (isSelected == true && selfCorrected == true) {
          setSelfCorrected(false);
          setIsSelected(false);

          if (updatedWord)
            updatedWordArray.words.splice(updatedWordArray.words.indexOf(updatedWord), 1);

          updatedWordArray.count -= 1;
        }

        console.log(updatedWordArray);

        setStruggledWords((previous) =>
          previous.map((w) => (w.value === word.type ? updatedWordArray : w)),
        );
      }}
      className={`cursor-pointer  ${selfCorrected && `line-through`} ${
        isSelected && `text-${E_WordTypeColor[word.type]}-500`
      }`}
    >
      {word.value}{' '}
    </span>
  );
};
export default Word;