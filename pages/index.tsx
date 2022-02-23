import { Prisma } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import  prisma from '../prisma/database'

interface Book {
    id: number;
    title: string;
}
interface StudentBook {
    id: number;
    book: Book;
}
interface Student {
    id: number;
    firstName: string;
    lastName: string;
    books: StudentBook[];
}

interface HomeProps {
    student: Student
}

const Home: NextPage<HomeProps> = ({ student}) => {
    return (
        <div>
            {
                student.books.map(book => (
                    <div key={book.id}>
                        <h1>{book.book.title}</h1>
                    </div>))
            }
        </div>

    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const student = await prisma.student.findUnique({
        where: {
            id: 1,
        },
    })

    return { props: {
        student 
    }};
};

export default Home;
