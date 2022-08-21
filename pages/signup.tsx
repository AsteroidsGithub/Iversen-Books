import landingPageImage from '@Public/images/login-head.png';
import elenSpin from '@Public/images/spin.gif';

import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginPage: NextPage = () => {
  const [formError, setFormError] = useState('');
  const router = useRouter();

  return (
    <>
      <div className="h-view flex w-full items-center justify-center bg-white/70">
        <div className="flex h-fit w-4/5 max-w-sm flex-col items-center rounded border-2 border-gray-100 bg-white py-8 px-6 shadow-md ">
          <h1 className="w-full text-3xl text-black">
            Welcome to <span className="font-semibold">Quick60</span>
          </h1>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              confirmEmail: '',
              password: '',
              confirmPassword: '',
              role: 'Teacher',
            }}
            onSubmit={(formData, { setSubmitting }) => {
              axios
                .post('/api/auth/signup', formData)

                .then(() => {
                  router.push('/app');
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
                    <label className="mt-2 block text-sm font-bold">First Name</label>
                    <Field type="name" placeholder="First Name" name="firstName" />
                    <ErrorMessage name="firstName" component="div" className="text-red-500" />

                    <label className="mt-2 block text-sm font-bold">Last Name</label>
                    <Field type="name" placeholder="Last Name" name="lastName" />
                    <ErrorMessage name="lastName" component="div" className="text-red-500" />

                    <label className="mt-2 block text-sm font-bold">Email</label>
                    <Field type="email" placeholder="Email" name="email" />
                    <ErrorMessage name="email" component="div" className="text-red-500" />

                    <label className="mt-2 block text-sm font-bold">Confirm Email</label>
                    <Field type="email" placeholder="Confirm Email" name="confirmEmail" />
                    <ErrorMessage name="confirmEmail" component="div" className="text-red-500" />

                    <label className="mt-2 block text-sm font-bold">Password</label>
                    <Field type="password" placeholder="Password" name="password" />
                    <ErrorMessage name="password" component="div" className="text-red-500" />

                    <label className="mt-2 block text-sm font-bold">Confirm Password</label>
                    <Field type="password" placeholder="Confirm Password" name="confirmPassword" />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />

                    <button
                      type="submit"
                      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    >
                      Sign Up
                    </button>

                    <label className="mt-2 block text-sm font-bold">Already have an account?</label>
                    <button
                      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                      onClick={() => router.push('/')}
                    >
                      Log In
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
      <img
        src={landingPageImage.src}
        className="fixed top-0 -z-10 block h-full w-full flex-none overflow-hidden object-cover "
      />
    </>
  );
};

export default LoginPage;
