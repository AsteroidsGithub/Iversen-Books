import StudentProfile from '@Components/StudentProfile';
import { I_Class, I_Student } from '@Interfaces/users';
import { Class } from '@Services/database';
import { NextPage } from 'next';

const StudentsTab: NextPage<{ tabName: string; classes: Class[] }> = ({ classes }) => {
  return (
    <div className="grid grid-cols-4 gap-2 px-2 sm:px-8 md:grid-cols-7 lg:grid-cols-9 2xl:px-32">
      {classes.map((classroom) => (
        <>
          <h2 className="col-span-full">{classroom.name}</h2>
          {classroom.students.map((student) => (
            <StudentProfile />
          ))}
        </>
      ))}
    </div>
  );
};

export default StudentsTab;
