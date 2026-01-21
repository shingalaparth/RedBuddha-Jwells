import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../components/Title';

const Profile = () => {
  const { navigate, backendURL, token, settoken } = useContext(ShopContext);
  const [user, setuser] = useState(null)
  const [loading, setLoading] = useState(true);

  // Function to fetch user details
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
      console.log('Error fetching profile')
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
    }
  }, [token])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#F4E4C1] border-t-[#8B1538] rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="group relative w-20 h-20 bg-[#F4E4C1]/30 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-[#8B1538] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">Please sign in to view your profile.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-3 bg-[#8B1538] text-white rounded-xl shadow-lg shadow-[#8B1538]/30 hover:bg-[#6B0F1A] hover:shadow-xl transition-all duration-300 font-medium tracking-wide"
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12'>

      {/* Header Section with Breadcrumb/Title */}
      <div className="mb-10 text-center">
        <Title title1={'MY'} title2={'ACCOUNT'} />
        <p className="text-gray-500 mt-2 text-base">Manage your personal information and orders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Sidebar: Profile Card & Navigation */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">

          {/* Profile Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#D4AF37]/20 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] opacity-10"></div>

            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white shadow-md bg-gradient-to-br from-[#8B1538] to-[#4A0D12] text-white flex items-center justify-center text-3xl font-serif">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-sm text-gray-500 mb-6">{user.email}</p>

              <button
                onClick={logout}
                className="w-full py-3 border border-[#8B1538]/30 text-[#8B1538] text-sm font-bold hover:bg-[#8B1538] hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center gap-2 group-hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Sign Out
              </button>
            </div>
          </div>

          {/* Quick Links Menu */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Menu</h3>
            </div>
            <nav className="divide-y divide-gray-50">
              <button
                onClick={() => navigate('/order')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#FDFBF7] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#8B1538] group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#8B1538]">My Orders</span>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-[#8B1538]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              <button className="w-full flex items-center justify-between p-4 text-left hover:bg-[#FDFBF7] transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#8B1538] group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#8B1538]">Settings (Coming Soon)</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content: Info & Addresses */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-8">

          {/* Personal Info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F4E4C1]/30 to-transparent rounded-bl-full -mr-8 -mt-8"></div>

            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#8B1538] rounded-full"></span>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#D4AF37]/10">
                <label className="text-xs text-[#8B1538] uppercase tracking-wider font-bold block mb-1">Full Name</label>
                <p className="text-gray-900 text-lg font-medium">{user.name}</p>
              </div>
              <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#D4AF37]/10">
                <label className="text-xs text-[#8B1538] uppercase tracking-wider font-bold block mb-1">Email Address</label>
                <p className="text-gray-900 text-lg font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Address Book */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#8B1538] rounded-full"></span>
                Saved Addresses
              </h3>
              <button className="text-sm font-bold text-[#8B1538] hover:underline hover:text-[#6B0F1A] flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add New
              </button>
            </div>

            {user.address && user.address.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.address.map((addr, index) => (
                  <div key={index} className="relative p-5 border-2 border-gray-100 rounded-xl hover:border-[#D4AF37] transition-colors bg-white hover:shadow-md group">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-[#8B1538]"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    </div>

                    <div className='flex items-center gap-2 mb-3'>
                      <div className="w-8 h-8 rounded-full bg-[#F4E4C1]/50 flex items-center justify-center text-[#8B1538]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      </div>
                      <span className="font-bold text-gray-900">{addr.firstname} {addr.lastname}</span>
                      {index === 0 && <span className="bg-[#8B1538]/10 text-[#8B1538] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border border-[#8B1538]/20">Default</span>}
                    </div>

                    <div className="pl-10">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {addr.street}<br />
                        {addr.city}, {addr.state} {addr.zipcode}<br />
                        {addr.country}
                      </p>
                      <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {addr.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 bg-[#FDFBF7] rounded-xl border border-dashed border-[#D4AF37]/30 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                  <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <p className="font-medium">No addresses saved yet.</p>
                <p className="text-sm text-gray-400 mt-1">Add an address for faster checkout.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile