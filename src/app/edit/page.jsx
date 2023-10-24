'use client'
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { updateItem, useData, checkToken } from '../../components/action';
import * as Yup from 'yup';

export default function edit() {
  const router = useRouter();
  const param = useSearchParams();
  const id = param.get('id');

  const { data, fetchData } = useData();

  useEffect(() => {
    fetchData(id);
    checkToken(router);
  }, [id]);

  // console.log(data.tittle)
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ tittle: data.tittle || '', note: data.note || '', file: '' }}
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
            ),
          // .required('Required'),
        })
        }
        onSubmit={async (values, { setSubmitting }) => {
          updateItem(id, values, router, setSubmitting);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <div className='flex items-center justify-center mt-4'>
            <Form className=' bg-blue-800 shadow-lg p-4 rounded-md'>
              <div>
                <label className='label'>
                  <span className=' label-text text-white text-xl'>Tittle</span>
                </label>
                <Field className='input input-bordered w-full' type="text" name="tittle" id="tittle" />
                <ErrorMessage className=' text-red-500' name="tittle" component="div" />
              </div>
              <div>
                <label className='label'>
                  <span className=' label-text text-white text-xl'>Note</span>
                </label>
                <Field className='input input-bordered w-full' type="text" name="note" id="note" />
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
                  }}
                />
                <ErrorMessage className=' text-red-500' name="file" component="div" />
              </div>
              <div className='mt-1 border-4 border-green-700'>
                {data.image ? (
                  <Image
                    src={`http://localhost:5000/uploads/${data.image}`}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    priority={true}
                    style={{ width: "500px", height: "auto" }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <span className='btn btn-neutral mt-2' onClick={() => document.getElementById(`my_modal_1`).showModal()}>Submit</span>
              <dialog id={`my_modal_1`} className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Alert!</h3>
                  <p className="py-4 text-red-600">Are you sure for update this item?</p>
                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      Yes
                    </button>
                    <button
                      className="btn ml-2 bg-green-600 text-white"
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById(`my_modal_1`).close();
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </dialog>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

