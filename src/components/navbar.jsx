import Link from 'next/link'
import React from 'react'

export default function navbar() {
    return (
        <div className=' flex justify-between items-center bg-blue-600 text-white px-8 py-3'>
            <Link href={'/'} className=' text-2xl font-bold'>Logo.</Link>
            <Link href={'/add'} className='btn btn-active btn-neutral normal-case'>Add</Link>
        </div>
    )
}
