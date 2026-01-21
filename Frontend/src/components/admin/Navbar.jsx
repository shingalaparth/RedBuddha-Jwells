import React from 'react';

const Navbar = ({ settoken }) => {
    return (
        <div className='flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 w-full'>
            <div className='flex items-center gap-3'>
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                    R
                </div>
                <div className='flex flex-col leading-tight'>
                    <span className='font-bold text-lg text-gray-800 tracking-wide'>RedBuddha</span>
                    <span className='text-xs text-gray-500 font-medium tracking-wider uppercase'>Admin Panel</span>
                </div>
            </div>
            <button
                onClick={() => settoken('')}
                className='bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg active:scale-95'
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar
