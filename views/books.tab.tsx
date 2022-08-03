import BookCover from '@Components/BookCover';

import { Book, Class } from '@Services/database';

import { NextPage } from 'next';

const BooksTab: NextPage<{ tabName: string; books: Book[]; classes: Class[] }> = ({
  books,
  classes,
}) => (
  <div className="grid grid-cols-3 gap-2 px-2  sm:px-8 md:grid-cols-4 lg:grid-cols-6 2xl:px-32">
    <h1 className="col-span-full pb-2 pt-4  text-2xl font-bold">Continue</h1>
    <div className="relative col-span-full flex w-full snap-x snap-mandatory gap-6 overflow-x-auto">
      {books.map((book, i) => (
        <div className="flex shrink-0 snap-center flex-row" key={i}>
          <img className="h-48" src={book.json.refs.coverArt} />
          <div className="flex-col justify-center">
            <h1 className="font-bold">{book.json.metadata.title}</h1>
            <h2>{book.json.metadata.author}</h2>
            <p>{book.json.metadata.description}</p>

            <button>Read</button>
          </div>
        </div>
      ))}
    </div>
    <h1 className="col-span-full pb-2 pt-4 text-2xl font-bold">All Books</h1>
    {books.map((book, i) => (
      <BookCover book={book} classes={classes} key={i} />
    ))}
  </div>
);

export default BooksTab;
