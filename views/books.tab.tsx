import { NextTabPage } from '@Interfaces/next';

const BooksTab: NextTabPage = () => {
  // return 100 h2 elements with "top of digi is the goal"
  return (
    <div className="flex flex-col">
      {[...Array(100)].map((_, i) => (
        <h2 className="text-2xl font-bold text-gray-800">Top of Digi is the Goal</h2>
      ))}
    </div>
  );
};

export default BooksTab;
