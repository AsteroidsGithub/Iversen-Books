import axios from "axios";
import { Field, Form, Formik } from 'formik';
import type { NextPage } from 'next';

import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-blue-400">
            <div className="flex flex-col items-center justify-center bg-white py-10 px-6">
                <h1 className="text-3xl text-black">
                    Welcome to <span className="font-semibold">Quick60</span>
                </h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(formData) => {
                        axios
                            .post('/api/authUser', formData)

                            .then(() => router.push('/protected'))
                            .catch((err) => {
                                console.log(err);
                            });
                    }}
                >
                    <Form className="flex w-full flex-col space-y-2">
                        <label className="mt-2 block text-sm font-bold">Email</label>
                        <Field type="email" placeholder="Email" name="email" />

                        <label className="mt-2 block text-sm font-bold">Password</label>
                        <Field type="password" placeholder="Password" name="password" />
                        <button
                            type="submit"
                            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>
                {/* <button
                    onClick={() =>
                        
                    }
                    className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                    Auth ME
                </button> */}
            </div>
        </div>
    );
};

export default Home;
