import BookCover from '@Components/BookCover';
import { NextTabPage } from '@Interfaces/next';

const BooksTab: NextTabPage = () => {
  // return 100 h2 elements with "top of digi is the goal"
  return (
    <div className="grid grid-cols-3 gap-2 px-2 sm:px-8 md:grid-cols-4 lg:grid-cols-6 2xl:px-32">
      <h2 className="col-span-full">Books</h2>
      {Array.from({ length: 4 }).map((_, i) => (
        <BookCover />
      ))}
      <h2 className="col-span-full">Books</h2>
      {Array.from({ length: 9 }).map((_, i) => (
        <BookCover />
      ))}
    </div>
  );
};

export default BooksTab;
