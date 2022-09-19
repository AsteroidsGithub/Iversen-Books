import useSharedState from '@Middleware/useSharedState';
import { Book, Class } from '@Services/database';

import { useRouter } from 'next/router';
import { useState } from 'react';

const StartReadingModal: React.FC<{ book: Book; classes: Class[] }> = ({ book, classes }) => {
  const router = useRouter();
  const { setActiveModal } = useSharedState();
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const [selectedStudent, setSelectedStudent] = useState<number |undefined>(0);

  return (
    <div>
      <h2 className="text-slate-900">
          Level {book.json.metadata.interventionLevel} - {book.json.metadata.wordCount} Words - By {book.json.metadata.author}
        </h2>
      <h1 className='pb-2  text-2xl font-bold'>Start a Report for {book.json.metadata.title}</h1>
      
      <p>{book.json.metadata.description}<br/>Select a student from your classes to begin marking their reading performance</p>
      {/* Make two dropdown menus to select a student from a class */}
      <div className="flex flex-col py-2 space-y-1">
        <div className="flex flex-col">
          <h3 className='text-sm font-medium text-slate-800'>Select a Class</h3>
          <select
            className="w-full border-2 bg-gray-100 py-1 border-slate-200"
            value={selectedClass}
            onChange={(e) => setSelectedClass(Number(e.target.value))}
          >
            <option value={undefined}>Select a Class</option>
            {classes.map((c, i) => (
              <option key={i} value={i}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col ">
          <h3 className='text-sm font-medium text-slate-800'>Select a Student</h3>
          <select
            className="w-full border-2 bg-gray-100 py-1 border-slate-200"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(Number(e.target.value))}
          >
            {(selectedClass == undefined) ?
              (<option value={undefined}>Select a Student</option>)
              : 
                classes[selectedClass].students.map((c, i) => (
              <option key={i} value={c.id}>
                {c.firstName} {c.lastName}
              </option>
            ))
            
            }
          </select>
        </div>
      </div>

      <button
        className='text-white font-medium hover:bg-blue-600 rounded-sm w-full bg-blue-500 py-2'
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
