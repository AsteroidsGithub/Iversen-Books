import useSharedState from '@Middleware/useSharedState';
import { Student, StudentProgress } from '@Services/database';

import { useRouter } from 'next/router';

const ProgressReportList: React.FC<{
  student: Student;
}> = ({ student }) => {
  const router = useRouter();
  const { setActiveModal } = useSharedState();

  return (
    <div className="w-full pb-2">
       <h1 className=" pb-2 text-2xl font-bold">Reports for {student.firstName} {student.lastName}</h1>
      <h1>
        
      </h1>
      <table className="w-full rounded-sm table-fixed overflow-x-auto border-2 border-slate-200">
        <thead>
          <tr className="bg-slate-300">
            <th className='text-left px-2 py-2'>Id</th>
            <th className='text-left px-2 py-2'>Title</th>
            <th className='text-left px-2 py-2'>Level</th>
            <th className='text-left px-2 py-2'>Date</th>
            <th className='text-left px-2 py-2'>Time</th>
            <th className='text-left px-2 py-2'>Errors</th>
          </tr>
        </thead>
        <tbody>
          {student.studentProgress.map((progress: StudentProgress) => (
            <tr
              className="odd:bg-slate-100 cursor-pointer hover:bg-blue-100 hover:border-2 hover:border-blue-200"
              onClick={() => {
                setActiveModal(null);
                router.push(`/app/report/${progress.id}`);
              }}
            >
              <td>{progress.id}</td>
              <td>{progress.book.json.metadata.title}</td>
              <td>{progress.book.json.metadata.interventionLevel}</td>
              <td>{new Date(progress.date).toLocaleDateString()}</td>
              <td>{new Date(progress.time * 1000).toISOString().substring(14, 19)}</td>
              <td>
                {progress.struggledWords
                    .flat()
                    .map((word) => word.words.length)
                    .reduce((a, b) => a + b, 0)} ({progress.struggledWords
                    .flat()
                    .map((word) => word.words.filter((w) => w.selfCorrected).length)
                    .reduce((a, b) => a + b, 0)} Corrected)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressReportList;
