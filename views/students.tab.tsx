import StudentProfile from '@Components/StudentProfile';
import { I_Class, I_Student } from '@Interfaces/users';
import { Class, Student } from '@Services/database';
import { NextPage } from 'next';

const StudentsTab: NextPage<{ tabName: string; classes: Class[] }> = ({ classes }) => {
  return (
    <div className="px-2 sm:px-4 2xl:px-32">
      {classes.map((class_) => (
        <>
          <h1 className="pb-2 pt-4  text-2xl font-bold">{class_.name}</h1>
          <table className="w-full table-fixed border-separate">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Reports</th>
              </tr>
            </thead>
            <tbody>
              {class_.students.map((student: Student) => (
                <tr className="odd:bg-slate-100">
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>
                    {student.studentProgress.length < 1 ? (
                      'No reports'
                    ) : (
                      <button>
                        View {student.studentProgress.length} report
                        {student.studentProgress.length != 1 && 's'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ))}
    </div>
  );
};

export default StudentsTab;
