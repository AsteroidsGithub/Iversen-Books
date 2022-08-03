import { useRouter } from 'next/router';
import { Student, StudentProgress } from '@Services/database';
import useSharedState from '@Middleware/useSharedState';

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
            <th>Score</th>
            <th>Struggled Words</th>
          </tr>
        </thead>
        <tbody>
          {student.studentProgress.map((progress: StudentProgress) => (
            <tr className="odd:bg-slate-100">
              <td>{progress.id}</td>
              <td>{progress.book.json.metadata.title}</td>
              <td>{progress.book.json.metadata.interventionLevel}</td>
              <td>1/1/1970</td>
              <td>233</td>
              <td>{progress.struggledWords.join(',')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressReportList;
