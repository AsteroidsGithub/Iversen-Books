const BookCover: React.FC<{}> = ({}) => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center p-1 md:px-8 md:py-2">
        <img src="https://via.placeholder.com/128" className="w-full" alt="book cover" />
        <h2>CBT</h2>
      </div>
    </>
  );
};

export default BookCover;
