import BookCover from '@Components/BookCover';
import { NextTabPage } from '@Interfaces/next';

const BooksTab: NextTabPage = () => {
  // return 100 h2 elements with "top of digi is the goal"
  return (
    <div className="grid grid-cols-7">
      {Array.from({ length: 100 }).map((_, i) => (
        <BookCover />
      ))}
    </div>
  );
};

export default BooksTab;
