import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Searchbar from './Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShopLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Navbar />
            <Searchbar />
            <div className="flex-1 w-full max-w-[1600px] mx-auto px-0">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default ShopLayout;
