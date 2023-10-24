'use client'
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { addItem, checkToken } from '../../components/action';
import * as Yup from 'yup';

export default function add() {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkToken(router);
  }, []);
  return (
    <Formik
      initialValues={{ tittle: '', note: '', file: null }}
      validationSchema={Yup.object({
        tittle: Yup.string().required('Required'),
        note: Yup.string().required('Required'),
        file: Yup.mixed()
          .test(
            'fileFormat',
            'File must be in JPG or PNG format',
            (value) => {
              if (!value) {
                return true; // Allow undefined or null values
              }
              return (value && /\.(jpg|jpeg|png)$/i.test(value.name));
            }
          )
          .required('Required'),
      })
      }
      onSubmit={async (values, { setSubmitting }) => {
        addItem(values, router, setSubmitting);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <div className='flex items-center justify-center p-4'>
          <Form className=' bg-blue-800 shadow-lg p-4 rounded-md'>
            <div>
              <label className='label'>
                <span className=' label-text text-white text-xl'>Tittle</span>
              </label>
              <Field className='input input-bordered w-full' type="text" name="tittle" />
              <ErrorMessage className=' text-red-500' name="tittle" component="div" />
            </div>
            <div>
              <label className='label'>
                <span className=' label-text text-white text-xl'>Note</span>
              </label>
              <Field className='input input-bordered w-full' type="text" name="note" />
              <ErrorMessage className=' text-red-500' name="note" component="div" />
            </div>
            <div>
              <label className='label'>
                <span className=' label-text text-white text-xl'>Image</span>
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className='file-input w-full'
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                  setSelectedImage(event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage className=' text-red-500' name="file" component="div" />
            </div>
            {selectedImage && (
              <div className='mt-1 border-4 border-green-700'>
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  priority={true}
                  style={{ width: "500px", height: "auto" }}
                />
              </div>
            )}
            <button type="submit" className='btn btn-neutral mt-2' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
