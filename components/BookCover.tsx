const BookCover: React.FC<{}> = ({}) => {
  return (
    <div className=" flex h-fit w-1/3  flex-col items-center justify-center p-2">
      <img src="https://via.placeholder.com/128" alt="book cover" className="w-16" />
      <h2>CBT</h2>
    </div>
  );
};

export default BookCover;
