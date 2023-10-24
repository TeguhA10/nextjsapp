'use client'

import React, {useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleRegister } from '../../components/action';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function register() {
    const router = useRouter();
    return (
        <>
            <div>
                <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .min(8, 'Password must be at least 8 characters')
                            .matches(
                                /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                                'Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)'
                            )
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        handleRegister(values, router, setSubmitting);
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
                                <label className=' label-text text-white text-xl' htmlFor="email">Email Address</label>
                                <Field className="input input-bordered w-full" name="email" type="email" />
                                <ErrorMessage className=' text-red-500' name="email" />
                            </div>
                            <div className='form-control w-full'>
                                <label className=' label-text text-white text-xl' htmlFor="password">Password</label>
                                <Field className="input input-bordered w-full" name="password" type="password" />
                                <ErrorMessage className=' text-red-500' name="password" />
                            </div>
                            <div className=' mt-2'>
                                <span className=' text-white'>Go to <Link href={'/'}>login</Link></span>
                            </div>
                            <button type="submit" className='btn btn-neutral mt-2'>Submit</button>
                        </Form>
                    </div>
                </Formik>
            </div>
        </>
    )
}
