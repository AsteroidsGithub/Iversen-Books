import StudentProfile from '@Components/StudentProfile';
import { NextTabPage } from '@Interfaces/next';

const ProgressTab: NextTabPage = () => {
  return (
    <div className="grid grid-cols-3 gap-2 px-2 sm:px-8 md:grid-cols-4 lg:grid-cols-6 2xl:px-32">
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

export default ProgressTab;
