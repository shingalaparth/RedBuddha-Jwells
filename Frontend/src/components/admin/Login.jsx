
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../../context/ShopContext';

const Login = ({ settoken }) => {
    const { backendURL } = useContext(ShopContext);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onsubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post(backendURL + '/api/user/admin', { email, password })
            if (response.data.success) {
                settoken(response.data.token)
                toast.success("Welcome back!")
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/30 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]"></div>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 z-10 p-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Admin Portal</h1>
                    <p className="text-gray-500 mt-2">Sign in to manage your store</p>
                </div>

                <form onSubmit={onsubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            onChange={(e) => setemail(e.target.value)}
                            value={email}
                            id="email"
                            type="email"
                            required
                            placeholder="admin@example.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input
                            onChange={(e) => setpassword(e.target.value)}
                            value={password}
                            id="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl shadow-lg shadow-gray-200 hover:bg-black hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-gray-400">
                    © 2026 Admin Dashboard. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default Login;
