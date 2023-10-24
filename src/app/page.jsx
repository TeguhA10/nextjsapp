'use client'
import React, { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard';
import Login from '../components/login';

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  return (
    <>
      {token ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </>
  );
}
