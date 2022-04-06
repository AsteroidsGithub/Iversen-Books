import { Prisma } from '@prisma/client';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';
import  prisma from '../prisma/database'


const Home: NextPage = () => {
    const router = useRouter();

    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={()=>axios
                                .post('/api/authMe')
                                .then(({ data, ...res }) => {
                                    localStorage.setItem(
                                        'auth-expr',
                                        data.expr
                                    );
                                    
                                }).then(()=> router.push('/protected'))
                                .catch((err) => {
                                    console.log(err);
                                    
                                })}>
                Auth ME
                </button>
        </div>

        
    );
};


export default Home;
