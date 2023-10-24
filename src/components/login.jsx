'use client'
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleLogin } from './action';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function login() {
    const router = useRouter();
    return (
        <>
            <div>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .required('Required'),
                        password: Yup.string()
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        handleLogin(values, router, setSubmitting);
                    }}
                >
                    <div className='flex items-center justify-center p-4'>
                        <Form className='bg-blue-800 shadow-lg p-4 rounded-md'>
                            <div className='form-control w-full'>
                                <label className=' label-text text-white text-xl' htmlFor="username">Username</label>
                                <Field className="input input-bordered w-full" name="username" type="text" />
                                <ErrorMessage className=' text-red-500' name="username" />
                            </div>
                            <div className='form-control w-full'>
                                <label className=' label-text text-white text-xl' htmlFor="password">Password</label>
                                <Field className="input input-bordered w-full" name="password" type="password" />
                                <ErrorMessage className=' text-red-500' name="password" />
                            </div>
                            <div className=' mt-2'>
                                <span className=' text-white'>Go to <Link href={'/register'}>register</Link></span>
                            </div>
                            <button type="submit" className='btn btn-neutral mt-2'>Submit</button>
                        </Form>
                    </div>
                </Formik>
            </div>
        </>
    )
}
