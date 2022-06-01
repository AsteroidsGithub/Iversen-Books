import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import type { NextPage } from 'next';

import elenSpin from '../public/images/spin.gif';
import landingPageImage from '../public/images/landing.png';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home: NextPage = () => {
  const [formError, setFormError] = useState('');
  const router = useRouter();

  return (
    <>
      <div className="h-view flex w-full items-center justify-center ">
        <div className="flex h-fit w-4/5 max-w-sm flex-col items-center rounded border-2 border-gray-100 bg-white py-8 px-6 shadow-md ">
          <h1 className="w-full text-3xl text-black">
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
                    <ErrorMessage name="email" component="div" className="text-red-500" />

                    <label className="mt-2 block text-sm font-bold">Password</label>
                    <Field type="password" placeholder="Password" name="password" />
                    <ErrorMessage name="password" component="div" className="text-red-500" />

                    <button
                      type="submit"
                      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <img className="h-auto w-fit" src={elenSpin.src}></img>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <img src={landingPageImage.src} className="fixed top-0 -z-10 h-screen  flex-none " />
    </>
  );
};

export default Home;
