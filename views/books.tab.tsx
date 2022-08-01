import BookCover from '@Components/BookCover';
import { I_BookJSON } from '@Interfaces/books';
import { NextPage } from 'next';

const BooksTab: NextPage<{ tabName: string; books: I_BookJSON[] }> = ({ books }) => (
  <div className="grid grid-cols-3 gap-2 px-2 sm:px-8 md:grid-cols-4 lg:grid-cols-6 2xl:px-32">
    <h2 className="col-span-full ">Continue</h2>
    <div className="relative col-span-full flex w-full snap-x snap-mandatory gap-6 overflow-x-auto">
      {books.map((book, i) => (
        <div className="flex shrink-0 snap-center flex-row" key={i}>
          <img className="h-48" src={book.refs.coverArt} />
          <div className="flex-col justify-center">
            <h1 className="font-bold">{book.metadata.title}</h1>
            <h2>{book.metadata.author}</h2>
            <p>{book.metadata.description}</p>

            <button>Read</button>
          </div>
        </div>
      ))}
    </div>

    <h2 className="col-span-full">Books</h2>
    {books.map((book, i) => (
      <BookCover book={book} key={i} />
    ))}
  </div>
);


export default BooksTab;
