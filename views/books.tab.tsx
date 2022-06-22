import BookCover from '@Components/BookCover';
import { NextTabPage } from '@Interfaces/next';

const BooksTab: NextTabPage = () => {
  // return 100 h2 elements with "top of digi is the goal"
  return (
    <div className="flex h-auto w-full ">
      {[...Array(100)].map((_, i) => (
        <div className="">
          <img src="https://via.placeholder.com/128" alt="book cover" />
          <h2>CBT</h2>
        </div>
      ))}
    </div>
  );
};

export default BooksTab;
