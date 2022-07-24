import { BookWord, WordTypeColor } from '@Interfaces/books';
import { useState } from 'react';

const Word: React.FC<{
  index: number;
  word: BookWord;
}> = ({ index, word }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <span
      key={index}
      onClick={() => setIsSelected(!isSelected)}
      className={`cursor-pointer ${isSelected && `text-${WordTypeColor[word.type]}-500`}`}
    >
      {word.value}{' '}
    </span>
  );
};
export default Word;
