import StartReadingModal from '@Views/startReading.modal';

import useSharedState from '@Middleware/useSharedState';
import { Book, Class } from '@Services/database';

const BookCoverLarge: React.FC<{ book: Book; classes: Class[] }> = ({ book, classes }) => {
  const { setActiveModal } = useSharedState();

  return (
    <div
      className="flex shrink-0 snap-center flex-row border-2 border-slate-100 rounded shadow-md bg-white hover:bg-gray-50 cursor-pointer"
      onClick={() => {
        setActiveModal(<StartReadingModal book={book} classes={classes} />);
      }}
    >
      <img className="h-48 my-2 ml-2" src={book.json.refs.coverArt} />
      <div className="flex h-full flex-col p-4">
        <h2 className="text-slate-900">
          Level {book.json.metadata.interventionLevel} - {book.json.metadata.wordCount} Words
        </h2>
        <h1 className="font-bold text-lg">{book.json.metadata.title}</h1>
        <h2 className="text-slate-900">{book.json.metadata.author}</h2>
        <p>{book.json.metadata.description}</p>
      </div>
    </div>
  );
};

export default BookCoverLarge;
