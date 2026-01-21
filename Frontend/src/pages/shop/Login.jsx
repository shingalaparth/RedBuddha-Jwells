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


    //to prevent reloading of page 
    e.preventDefault()
    try {
      if (currentstate === 'Sign up') {
        const response = await axios.post(backendURL + '/api/user/register', { name, email, password })
        if (response.data.success) {
          toast.success("signed in successfully")
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
          toast.success("logged in successfully")
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
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 mx-auto flex flex-col items-center bg-white">
        <h2 className="text-3xl prata-regular font-medium text-gray-800 mb-8 tracking-wider">{currentstate} &mdash;</h2>
        {currentstate !== 'Login' && <input onChange={(e) => setname(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full p-3 mb-4 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-sm focus:outline-none focus:border-black transition duration-150" />}
        <input onChange={(e) => setemail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full p-3 mb-4 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-sm focus:outline-none focus:border-black transition duration-150" />
        <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" placeholder="Password" required className="w-full p-3 mb-8 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-sm focus:outline-none focus:border-black transition duration-150" />
        <div className="w-full flex justify-between text-sm mt-[-20px] mb-6">
          <p className="cursor-pointer text-gray-500 hover:text-gray-800">Forgot your password?</p>
          {currentstate === 'Login'
            ? <p onClick={() => setcurrentstate('Sign up')} className="cursor-pointer font-semibold text-blue-600 hover:text-blue-800 hover:underline">Create new account</p>
            : <p onClick={() => setcurrentstate('Login')} className="cursor-pointer font-semibold text-blue-600 hover:text-blue-800 hover:underline">Login Here</p>}
        </div>
        <button type="submit" className="bg-black text-white py-2 px-8 m-4 w-full active:bg-gray-700">{currentstate === 'Login' ? 'Sign In' : 'Sign Up'}</button>

      </form>
    </div>
  )
}

export default Login
