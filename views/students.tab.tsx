import ProgressReportList from '@Views/progressReports.modal';

import useSharedState from '@Middleware/useSharedState';
import { Class, Student } from '@Services/database';

import { NextPage } from 'next';

const StudentsTab: NextPage<{ tabName: string; classes: Class[] }> = ({ classes }) => {
  const { setActiveModal } = useSharedState();
  return (
    <div className="px-2 sm:px-4 2xl:px-32">
      {classes.map((class_) => (
        <>
          <h1 className=" pb-2 pt-4 text-2xl"><span className=' font-bold'>{class_.name}</span> - { class_.students.length} Students</h1>
          <table className="w-full rounded-sm table-fixed border-2 border-slate-200">
            <thead>
              <tr className="bg-slate-300  ">
                <th className='text-left px-2 py-2'>Id</th>
                <th className='text-left px-2 py-2'>First Name</th>
                <th className='text-left px-2 py-2'>Last Name</th>
                <th className='text-left px-2 py-2'>Reports</th>
              </tr>
            </thead>
            <tbody>
              {class_.students.map((student: Student) => (
                <tr className="odd:bg-slate-100 hover:bg-blue-100 hover:border-2 hover:border-blue-200">
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>
                    {student.studentProgress.length < 1 ? (
                      'No reports'
                    ) : (
                      <button
                        onClick={() => setActiveModal(<ProgressReportList student={student} />)}
                      >
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
