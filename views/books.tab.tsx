import BookCover from '@Components/BookCover';
import { T_NextTabPage } from '@Interfaces/next';

const BooksTab: T_NextTabPage = () => {
  const test: string[] = [
    'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80',
    'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80',
    'https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80',
    'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80',
    'https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80',
    'https://images.unsplash.com/photo-1559333086-b0a56225a93c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80',
  ];
  // return 100 h2 elements with "top of digi is the goal"
  return (
    <div className="grid grid-cols-3 gap-2 px-2 sm:px-8 md:grid-cols-4 lg:grid-cols-6 2xl:px-32">
      <h2 className="col-span-full ">Continue</h2>
      <div className="relative  col-span-full flex w-full snap-x snap-mandatory gap-6 overflow-x-auto">
        {test.map((url, i) => (
          <div className="flex shrink-0 snap-center flex-row" key={i}>
            <img src={url} />
            <div className=" ">
              <h1>Title</h1>
              <h2>Author</h2>
              <p>The really cool thing something</p>
              <button>Read</button>
              <div>I'm a progress bar soon</div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="col-span-full">Books</h2>
      {Array.from({ length: 4 }).map((_, i) => (
        <BookCover key={i} />
      ))}
      <h2 className="col-span-full">Books</h2>
      {Array.from({ length: 9 }).map((_, i) => (
        <BookCover key={i} />
      ))}
    </div>
  );
};

export default BooksTab;
