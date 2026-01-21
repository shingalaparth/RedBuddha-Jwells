
import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Login from './Login';
import { ToastContainer } from 'react-toastify';

export const currency = '₹';

const AdminLayout = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);


    if (!token) {
        return (
            <div className='bg-gray-50 min-h-screen'>
                <ToastContainer />
                <Login settoken={setToken} />
            </div>
        );
    }

    return (
        <div className='bg-gray-50 min-h-screen'>
            <ToastContainer />
            {token && <Navbar settoken={setToken} />}
            <div className='flex w-full'>
                <Sidebar />
                <div className='flex-1 w-full'>
                    <Outlet context={{ token, setToken }} />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
