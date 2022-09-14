import useSharedState from '@Middleware/useSharedState';
import { Student, StudentProgress } from '@Services/database';

import { useRouter } from 'next/router';

const ProgressReportList: React.FC<{
  student: Student;
}> = ({ student }) => {
  const router = useRouter();
  const { setActiveModal } = useSharedState();

  return (
    <div className="w-full">
      <h1>
        Previous Reports for {student.firstName} {student.lastName}
      </h1>
      <table className="w-full">
        <thead>
          <tr className="bg-slate-400">
            <th>Id</th>
            <th>Book Name</th>
            <th>Book Level</th>
            <th>Date</th>
            <th>Time</th>
            <th>Struggled Words</th>
          </tr>
        </thead>
        <tbody>
          {student.studentProgress.map((progress: StudentProgress) => (
            <tr
              className="odd:bg-slate-100 cursor-pointer hover:bg-slate-200"
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
                  .map((struggleWord) => struggleWord.words)
                  .flat()
                  .join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressReportList;
