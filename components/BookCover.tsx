import StartReadingModal from '@Views/startReading.modal';
import { Book, Class } from '@Services/database';
import useSharedState from '@Middleware/useSharedState';
import { I_BookJSON } from '@Interfaces/books';

const BookCover: React.FC<{ book: Book; classes: Class[] }> = ({ book, classes }) => {
  const { setActiveModal } = useSharedState();

  return (
    <div
      className=" flex w-full flex-col items-center justify-center"
      onClick={() => {
        setActiveModal(<StartReadingModal book={book} classes={classes} />);
      }}
    >
      <img src={book.json.refs.coverArt} alt="book cover" className="w-full rounded-md" />
      <h2 className="text-center">{book.json.metadata.title}</h2>
      <h3 className="text-center">
        <span>Level {book.json.metadata.interventionLevel}</span>・
        <span>words {book.json.metadata.wordCount}</span>
      </h3>
    </div>
  );
};

export default BookCover;
