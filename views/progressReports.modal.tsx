import useSharedState from '@Middleware/useSharedState';
import { Student, StudentProgress } from '@Services/database';
import { useRouter } from 'next/router';

const ProgressReportList: React.FC<{
  student: Student;
}> = ({ student }) => {
  const router = useRouter();
  const { setActiveModal } = useSharedState();

  return (
    <div>
      <h1>
        Previous Reports for {student.firstName} {student.lastName}
      </h1>
      <table>
        <thead>
          <tr>
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
            <tr>
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
