import BookCover from '@Components/BookCover';
import BookCoverLarge from '@Components/BookCoverLarge';



import { Book, Class } from '@Services/database';

import { NextPage } from 'next';


const BooksTab: NextPage<{ tabName: string; books: Book[]; classes: Class[] }> = ({
  books,
  classes,
}) => (
  <div className="grid grid-cols-3 gap-2 px-2  sm:px-8 md:grid-cols-4 lg:grid-cols-6 2xl:px-32">
    <h1 className="col-span-full pb-2 pt-4 text-2xl font-bold">Featured</h1>
    <div className="relative no-scrollbar col-span-full flex w-full snap-x snap-proximity pb-2 snap-center gap-6 overflow-x-scroll ">
      {/* Get a random selection of three books from the database. */}
      {books
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((book, i) => (
          <BookCoverLarge book={book} classes={classes} key={i} />
        ))}
    </div>

    <h1 className="col-span-full pb-2 pt-4 text-2xl font-bold">All Books</h1>
    {books.map((book, i) => (
      <BookCover book={book} classes={classes} key={i} />
    ))}
  </div>
);

export default BooksTab;