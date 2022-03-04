import { Prisma } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import  prisma from '../prisma/database'


const Home: NextPage = () => {
    return (
        <div>
            <h1>Hello World</h1>
        </div>

    );
};


export default Home;
