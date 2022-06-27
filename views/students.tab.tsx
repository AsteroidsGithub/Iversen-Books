import StudentProfile from '@Components/StudentProfile';
import { NextTabPage } from '@Interfaces/next';

const StudentsTab: NextTabPage = () => {
  return (
    <div className="grid grid-cols-4 gap-2 px-2 sm:px-8 md:grid-cols-7 lg:grid-cols-9 2xl:px-32">
      <h2 className="col-span-full">Class One</h2>
      {Array.from({ length: 4 }).map((_, i) => (
        <StudentProfile />
      ))}
      <h2 className="col-span-full">Class Two</h2>
      {Array.from({ length: 9 }).map((_, i) => (
        <StudentProfile />
      ))}
    </div>
  );
};

export default StudentsTab;
