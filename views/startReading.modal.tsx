import useSharedState from '@Middleware/useSharedState';
import { Book, Class } from '@Services/database';
import { useRouter } from 'next/router';
import { useState } from 'react';


const StartReadingModal: React.FC<{ book: Book; classes: Class[] }> = ({ book, classes }) => {
  const router = useRouter();
  const { setActiveModal } = useSharedState();
  const [selectedClass, setSelectedClass] = useState<number>(classes[0].id);
  const [selectedStudent, setSelectedStudent] = useState<number>(0);

  return (
    <div>
      <h1>Start a Report for {book.json.metadata.title}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel
        consectetur euismod, nisi nisl aliquet nisl, eget consectetur nisl nisi vel nisl.
      </p>
      {/* Make two dropdown menus to select a student from a class */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2>Select a Class</h2>
          <select
            className="w-full"
            value={selectedClass}
            onChange={(e) => setSelectedClass(Number(e.target.value))}
          >
            {classes.map((c, i) => (
              <option key={i} value={i}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2>Select a Student</h2>
          <select
            className="w-full"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(Number(e.target.value))}
          >
            {classes[selectedClass].students.map((c, i) => (
              <option key={i} value={c.id}>
                {c.firstName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          setActiveModal(null);
          router.push(`/app/book/${book.id}/${selectedStudent}`);
        }}
      >
        Start Reading
      </button>
    </div>
  );
};

export default StartReadingModal;