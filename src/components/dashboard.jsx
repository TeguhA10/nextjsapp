'use client'
import Navbar from './navbar';
import Listdata from './listdata';
import { handleLogout } from './action';
import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';

export default function dashboard() {
    const logout = () => {
        handleLogout();
    };

    const token = localStorage.getItem('token');
    const decoded = jwt.decode(token);

    useEffect(() => {
    }, []);
    return (
        <main className=" lg:px-96 md:px-48 sm:px-10 mt-3">
            <div>
                <button className="btn ml-2 bg-green-600 text-white" onClick={logout}>Logout</button>
                <Navbar />
                <div>
                    <h1>Selamat datang : {decoded.username}</h1>
                </div>
                <Listdata />
            </div>
        </main>
    )
}

