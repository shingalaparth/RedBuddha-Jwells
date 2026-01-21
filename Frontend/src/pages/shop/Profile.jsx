
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../components/Title';

const Profile = () => {
  const { navigate, backendURL, token, settoken } = useContext(ShopContext);
  const [user, setuser] = useState(null)
  const [loading, setLoading] = useState(true);

  const fetchuser = async () => {
    try {
      setLoading(true);
      const usr = await axios.get(backendURL + '/api/user/getuser', { headers: { token } });
      if (usr.data.success) {
        setuser(usr.data.user)
      } else {
        toast.error(usr.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    settoken('');
  }

  useEffect(() => {
    if (token) {
      fetchuser()
    } else {
      setLoading(false);
      // Redirect to login handled by protected route or context usually, but if not:
      // navigate('/login') 
    }
  }, [token])

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
    </div>
  }

  if (!user) {
    return <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Please sign in to view your profile.</p>
      <button onClick={() => navigate('/login')} className="px-6 py-2 bg-black text-white rounded">Login</button>
    </div>
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className="mb-12 text-center">
        <Title title1={'MY'} title2={'PROFILE'} />
        <p className="text-gray-500 mt-2 text-sm tracking-wide">Manage your account details and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Sidebar Area */}
        <div className="space-y-6">
          {/* User Card */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm text-center">
            <div className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center text-3xl font-serif mx-auto mb-4">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2 className="text-xl font-medium text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-6">{user.email}</p>

            <button onClick={logout} className="w-full py-2 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-black hover:text-white hover:border-black transition-colors rounded">
              Log Out
            </button>
          </div>

          {/* Navigation Links (Visual only for now matching requested complexity) */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/order')}>
              <span className="text-sm font-medium text-gray-700">My Orders</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm font-medium text-gray-700">Account Settings</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-8">

          {/* Contact Info */}
          <div className="bg-white p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-serif text-gray-900 mb-6 border-b border-gray-100 pb-2">Account Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-1">Full Name</label>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-1">Email Address</label>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Address Book */}
          <div className="bg-white p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
              <h3 className="text-lg font-serif text-gray-900">Saved Addresses</h3>
              {/* Add Address button logic would go here */}
            </div>

            {user.address && user.address.length > 0 ? (
              <div className="space-y-4">
                {user.address.map((addr, index) => (
                  <div key={index} className="flex relative p-4 border border-gray-200 rounded-lg hover:border-black transition-colors bg-gray-50/50">
                    <div className="flex-grow">
                      <div className='flex items-center gap-2 mb-1'>
                        <p className="font-semibold text-gray-900">{addr.firstname} {addr.lastname}</p>
                        <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">Default</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {addr.street}<br />
                        {addr.city}, {addr.state} {addr.zipcode}<br />
                        {addr.country}
                      </p>
                      <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-900">Phone:</span> {addr.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <p>No addresses saved yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile