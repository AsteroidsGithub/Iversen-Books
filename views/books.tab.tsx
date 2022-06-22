import BookCover from '@Components/BookCover';
import { NextTabPage } from '@Interfaces/next';

const BooksTab: NextTabPage = () => {
  // return 100 h2 elements with "top of digi is the goal"
  return (
    <div className="grid h-auto grid-flow-row-dense grid-cols-5 gap-2 ">
      {/* {[...Array(100)].map((_, i) => (
        <BookCover />
      ))} */}
      <BookCover />
      <BookCover />
      <BookCover />
      <BookCover />
      <BookCover />
    </div>
  );
};

export default BooksTab;
