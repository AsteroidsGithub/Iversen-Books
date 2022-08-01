import StudentProfile from '@Components/StudentProfile';
import { I_Class, I_Student } from '@Interfaces/users';
import { NextPage } from 'next';

const StudentsTab: NextPage<{ tabName: string; classes: I_Class[] }> = ({ classes }) => {
  return (
    <div className="grid grid-cols-4 gap-2 px-2 sm:px-8 md:grid-cols-7 lg:grid-cols-9 2xl:px-32">
      {classes.map((classroom) => (
        <>
          <h2 className="col-span-full">Class Two</h2>
          {Array.from({ length: 9 }).map((_, i) => (
            <StudentProfile />
          ))}
        </>
      ))}
    </div>
  );
};

export default StudentsTab;
