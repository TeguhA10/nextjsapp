'use client'
import React, { useEffect } from 'react';
import Removebutton from './removebutton';
import Link from 'next/link';
import Image from 'next/image';
import { getAll } from '../components/action';
import { FaPencilAlt } from 'react-icons/fa';

export default function listdata() {
  const { data, fetchData } = getAll();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data.map((i) => (
        <div key={i.id} className=' flex justify-between gap-5 p-4 border border-slate-300 items-start'>
          <div className=' '>
            <div><h1 className=' font-bold text-xl mb-2'>{i.tittle}</h1></div>
            <div><p>{i.note}</p></div>
            <hr className=' w-full h-2 text-black mt-3' />
            <div className='mt-1'>
              <Image
                src={`http://localhost:5000/uploads/${i.image}`}
                width={500}
                height={500}
                alt="Picture of the author"
                priority={true}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className='flex gap-2 mr-2'>
            <div>
              <Removebutton id={i.id} />
            </div>
            <div className=' ml-3'>
              <Link href={`/edit?id=${i.id}`} className=' text-green-500 hover:text-green-700'><FaPencilAlt /></Link>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
