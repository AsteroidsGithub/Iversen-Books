import StartReadingModal from '@Views/startReading.modal';

import useSharedState from '@Middleware/useSharedState';
import { Book, Class } from '@Services/database';

const BookCover: React.FC<{ book: Book; classes: Class[] }> = ({ book, classes }) => {
  const { setActiveModal } = useSharedState();

  return (
    <div
      className=" flex w-full  flex-col items-center p-1  pb-2 justify-center border-2 border-slate-100 rounded shadow-sm bg-white hover:bg-gray-50 cursor-pointer"
      onClick={() => {
        setActiveModal(<StartReadingModal book={book} classes={classes} />);
      }}
    >
      <img src={book.json.refs.coverArt} alt="book cover" className="w-full " />
      <h2 className="text-center font-bold py-1">{book.json.metadata.title}</h2>
      <h3 className="text-center">
        <span>Level {book.json.metadata.interventionLevel}</span>・
        <span>words {book.json.metadata.wordCount}</span>
      </h3>
    </div>
  );
};

export default BookCover;
