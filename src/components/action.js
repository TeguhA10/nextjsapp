import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/getnote/';
const apiUrlAuth = 'http://localhost:5000/';

const initialData = [];

export const checkToken = (router) => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/')
    }
}

export const handleLogin = async (values, router, setSubmitting) => {
    try {
        const response = await axios.post(`${apiUrlAuth}login`, values);

        const token = response.data.token;

        // console.log('Token:', token);
        localStorage.setItem('token', token);
        window.location.reload()
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    } finally {
        setSubmitting(false);
    }
};

export const handleRegister = async (values, router, setSubmitting) => {
    try {
        const response = await axios.post(`${apiUrlAuth}register`, values);

        const token = response.data.token;

        // console.log('Token:', token);
        localStorage.setItem('token', token);
        router.push('/');
        router.refresh();
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    } finally {
        setSubmitting(false);
    }
};

export const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload()
};

export const getAll = () => {
    const [data, setData] = useState(initialData);

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl);
            setData(response.data);
        } catch (error) {
            console.log('fetch data', error);
        }
    }
    return { data, fetchData };
};

export const useData = () => {
    const [data, setData] = useState(initialData);

    const fetchData = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}${id}`);
            setData(response.data);
        } catch (error) {
            console.log('fetch data', error);
        }
    };

    return { data, fetchData };
};

export const addItem = async (values, router, setSubmitting) => {
    try {
        const formData = new FormData();
        formData.append('tittle', values.tittle);
        formData.append('note', values.note);
        formData.append('image', values.file);

        const response = await axios.post(apiUrl, formData);
        // console.log(response.data);
        router.push('/')
        router.refresh()
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setSubmitting(false);
    }
}

export const updateItem = async (id, values, router, setSubmitting) => {
    try {
        const formData = new FormData();
        formData.append('tittle', values.tittle);
        formData.append('note', values.note);
        if (values.file) {
            formData.append('image', values.file);
        }

        const response = await axios.put(`${apiUrl}${id}`, formData);

        console.log(response.data);
        router.push('/');
        router.refresh();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setSubmitting(false);
    }
}

export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}${id}`);
        console.log(response.data);
        console.log('Item berhasil dihapus');
        window.location.reload();
    } catch (error) {
        console.error(`Gagal menghapus item:${error}`);
    }
};