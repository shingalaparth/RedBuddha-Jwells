import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentstate, setcurrentstate] = useState('Login')
  const { token, settoken, navigate, backendURL } = useContext(ShopContext);
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentstate === 'Sign up') {
        const response = await axios.post(backendURL + '/api/user/register', { name, email, password })
        if (response.data.success) {
          toast.success("Signed in successfully")
          settoken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
      else {
        const response = await axios.post(backendURL + '/api/user/login', { email, password })
        if (response.data.success) {
          localStorage.setItem('userid', response.data.userid);
          localStorage.setItem('token', response.data.token)
          toast.success("Logged in successfully")
          settoken(response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
    }
    catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#F4E4C1]/10 via-white to-gray-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white'>

        {/* Left Side - Branding */}
        <div className='lg:w-1/2 p-12 lg:p-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col justify-center relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-96 h-96 bg-[#8B1538]/10 rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-[#8B1538]/10 rounded-full blur-3xl'></div>

          <div className='relative z-10'>
            <div className='mb-8'>
              <div className='w-16 h-16 bg-gradient-to-br from-[#8B1538] to-[#8B1538] rounded-2xl flex items-center justify-center mb-6'>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L2 7v10c0 5.523 4.477 10 10 10s10-4.477 10-10V7L12 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 6h.01" />
                </svg>
              </div>
              <h1 className='font-serif text-4xl lg:text-5xl font-bold mb-4'>
                Welcome to <br />
                <span className='bg-gradient-to-r from-[#D4AF37] to-[#8B1538] bg-clip-text text-transparent'>
                  RedBuddha Jwells
                </span>
              </h1>
              <p className='text-gray-300 text-lg leading-relaxed'>
                Discover timeless elegance and exquisite craftsmanship. Your journey to luxury jewelry starts here.
              </p>
            </div>

            <div className='space-y-4 mb-8'>
              {[
                { icon: '✨', text: 'Authentic luxury jewelry' },
                { icon: '🔒', text: 'Secure checkout' },
                { icon: '🎁', text: 'Special member benefits' }
              ].map((item, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <span className='text-2xl'>{item.icon}</span>
                  <span className='text-gray-300'>{item.text}</span>
                </div>
              ))}
            </div>

            <div className='pt-6 border-t border-gray-700'>
              <p className='text-sm text-gray-400'>
                Trusted by 10,000+ customers worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className='lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center'>
          <div className='mb-8'>
            <h2 className='font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
              {currentstate === 'Login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className='text-gray-600'>
              {currentstate === 'Login' ? 'Sign in to continue your journey' : 'Join our exclusive community'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {currentstate !== 'Login' && (
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Full Name</label>
                <input
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="John Doe"
                  required
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all'
                />
              </div>
            )}

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                type="email"
                placeholder="you@example.com"
                required
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Password</label>
              <input
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                type="password"
                placeholder="••••••••"
                required
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all'
              />
            </div>

            {currentstate === 'Login' && (
              <div className='flex items-center justify-between text-sm'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input type="checkbox" className='w-4 h-4 rounded border-gray-300 text-[#8B1538] focus:ring-[#8B1538]' />
                  <span className='text-gray-600'>Remember me</span>
                </label>
                <a href="#" className='text-[#8B1538] hover:text-[#6B0F1A] font-medium'>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className='w-full py-4 px-6 bg-gradient-to-r from-black to-gray-800 text-white font-bold rounded-xl hover:from-gray-800 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2'
            >
              {currentstate === 'Login' ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  SIGN IN
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  CREATE ACCOUNT
                </>
              )}
            </button>

            <div className='text-center'>
              <p className='text-gray-600 text-sm'>
                {currentstate === 'Login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type='button'
                  onClick={() => setcurrentstate(currentstate === 'Login' ? 'Sign up' : 'Login')}
                  className='text-[#8B1538] hover:text-[#6B0F1A] font-bold hover:underline'
                >
                  {currentstate === 'Login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
