const BookCover: React.FC<{}> = ({}) => {
  return (
    <div className=" flex w-full flex-col items-center justify-center">
      <img src="https://via.placeholder.com/128" alt="book cover" className="w-full" />
      <h2 className="text-center">Book cover Template</h2>
      <h3 className="text-center">
        <span>Level</span>・<span>words</span>
      </h3>
    </div>
  );
};

export default BookCover;
