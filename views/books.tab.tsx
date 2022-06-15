import BookCover from '@Components/BookCover';
import { NextTabPage } from '@Interfaces/next';

const BooksTab: NextTabPage = () => {
  // return 100 h2 elements with "top of digi is the goal"
  return (
    <div className="grid grid-cols-3 justify-center gap-4 self-center md:grid-cols-5">
      {[...Array(100)].map((_, i) => (
        <BookCover />
      ))}
    </div>
  );
};

export default BooksTab;
