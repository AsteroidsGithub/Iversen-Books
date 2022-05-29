import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import type { NextPage } from 'next';

import elenSpin from '../public/spin.gif';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home: NextPage = () => {
    const [formError, setFormError] = useState('');
    const router = useRouter();

    return (
        <div className=" h-view bg-blue-400">
            <div className="flex w-14 flex-col items-center justify-center bg-white py-10 px-6">
                <h1 className="text-3xl text-black">
                    Welcome to <span className="font-semibold">Quick60</span>
                </h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(formData, { setSubmitting }) => {
                        axios
                            .post('/api/authUser', formData)

                            .then(() => {
                                router.push('/protected');
                                setSubmitting(true);
                            })
                            .catch((err) => {
                                console.log(err);
                                setFormError(err.response.data.message || 'Something went wrong');
                                setSubmitting(false);
                            });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex w-full flex-col space-y-2">
                            {!isSubmitting ? (
                                <>
                                    <p className="text-red-600">{formError}</p>

                                    <label className="mt-2 block text-sm font-bold">Email</label>
                                    <Field type="email" placeholder="Email" name="email" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <label className="mt-2 block text-sm font-bold">Password</label>
                                    <Field type="password" placeholder="Password" name="password" />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <button
                                        type="submit"
                                        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                                    >
                                        Login
                                    </button>
                                </>
                            ) : (
                                <img className="" src={elenSpin.src}></img>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Home;
