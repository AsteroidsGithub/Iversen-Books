import { I_BookJSON } from '@Interfaces/books';
import useSharedState from '@Middleware/useSharedState';
import StartReadingModal from '@Views/startReading.modal';

const BookCover: React.FC<{ book: I_BookJSON }> = ({ book }) => {
  const { setActiveModal } = useSharedState();

  return (
    <div
      className=" flex w-full flex-col items-center justify-center"
      onClick={() => {
        setActiveModal(<StartReadingModal />);
      }}
    >
      <img src={book.refs.coverArt} alt="book cover" className="w-full rounded-md" />
      <h2 className="text-center">{book.metadata.title}</h2>
      <h3 className="text-center">
        <span>Level {book.metadata.interventionLevel}</span>・
        <span>words {book.metadata.wordCount}</span>
      </h3>
    </div>
  );
};

export default BookCover;
