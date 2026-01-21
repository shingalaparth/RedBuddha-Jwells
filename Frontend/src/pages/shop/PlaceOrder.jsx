import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/Title.jsx'
import Carttotal from '../../components/Carttotal.jsx'
import { ShopContext } from '../../context/ShopContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../components/Loading.jsx';

const PlaceOrder = () => {
  const [method, setmethod] = useState('cod');
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(false);
  const { navigate, backendURL, token, cartitems, setcartitems, getcartamount, delivery_fee, products, clearcart } = useContext(ShopContext);
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onchangehandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setformdata(data => ({ ...data, [name]: value }))
  }

  const updateinventory = async () => {
    for (const items in cartitems) {
      for (const s in cartitems[items]) {
        const quant = cartitems[items][s];
        const { data } = await axios.post(backendURL + '/api/order/stock', { id: items, size: s, qua: quant }, { headers: { token } });
        if (!data.success) {
          toast.error('Stock update failed')
        }
      }
    }
  }

  const fetchUser = async () => {
    const res = await axios.get(
      backendURL + '/api/user/getuser',
      { headers: { token } }
    );
    if (res.data.success) {
      setUser(res.data.user);
    }
  };

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  const initpay = (order) => {
    toast.info("Redirecting to secure payment...");

    setTimeout(async () => {
      const response = {
        razorpay_order_id: order.id,
        razorpay_payment_id: "dummy_pay_" + Date.now()
      };

      try {
        const { data } = await axios.post(backendURL + '/api/order/varifyrazorpay', response, { headers: { token } })
        if (data.success) {
          toast.success("Payment successful!")
          updateinventory();
          await clearcart()
          navigate('/order')
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error("Payment verification failed")
      }
    }, 2000);
  }

  const saveadd = async () => {
    const values = Object.values(formdata);
    if (values.some(v => v.trim() === '')) {
      toast.error('Please fill all address fields');
      return;
    }
    try {
      setloading(true)
      const resp = await axios.post(backendURL + '/api/user/address', { address: formdata }, { headers: { token } });
      if (resp.data.success) {
        toast.success('Address saved successfully')
        fetchUser()
      }
      else {
        toast.error(resp.data.message)
      }
      setloading(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const setadd = (index) => {
    const addr = user.address[index];
    setformdata({
      firstname: addr.firstname,
      lastname: addr.lastname,
      email: addr.email,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zipcode: addr.zipcode,
      country: addr.country,
      phone: addr.phone
    });
  }

  const remadd = async (index) => {
    try {
      setloading(true)
      const res = await axios.post(backendURL + '/api/user/del', { index }, { headers: { token } })
      if (res.data.success) {
        toast.success('Address deleted')
      }
      setloading(false)
    } catch (error) {
      toast.error(error.message)
    }
    fetchUser();
  }

  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      let a = true
      for (const items in cartitems) {
        for (const s in cartitems[items]) {
          const quant = cartitems[items][s];
          const { data } = await axios.post(backendURL + '/api/order/check', { id: items, size: s, qua: quant }, { headers: { token } });
          if (!data.success) {
            a = false;
            toast.error(data.message);
          }
        }
      }
      if (a) {
        let orderitems = [];
        for (const items in cartitems) {
          for (const item in cartitems[items]) {
            const iteminfo = structuredClone(products.find(product => product._id === items))
            if (iteminfo) {
              iteminfo.size = item
              iteminfo.quantity = cartitems[items][item]
              orderitems.push(iteminfo)
            }
          }
        }
        let orderdata = {
          address: formdata,
          items: orderitems,
          amount: getcartamount() + delivery_fee,
        }

        switch (method) {
          case 'cod':
            const response = await axios.post(backendURL + '/api/order/place', orderdata, { headers: { token } })
            if (response.data.success) {
              updateinventory()
              await clearcart();
              navigate('/order')
            }
            else {
              a = false
              toast.error(response.data.message)
            }
            break;

          case 'razorpay':
            const responserazorpay = await axios.post(backendURL + '/api/order/razorpay', orderdata, { headers: { token } })
            if (responserazorpay.data.success) {
              initpay(responserazorpay.data.order)
            }
            else {
              a = false
              toast.error(responserazorpay.data.message)
            }

          default:
            break;
        }
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (loading ? <Loading /> :
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-8'>
      <div className='w-full max-w-[1400px] mx-auto px-4 sm:px-6'>
        <form onSubmit={onsubmithandler} className='flex flex-col lg:flex-row gap-8'>

          {/* Delivery Information Section */}
          <div className='lg:flex-1'>
            <div className='mb-8'>
              <Title title1={'DELIVERY'} title2={'INFORMATION'} />
              <p className='text-sm text-gray-500 mt-2'>Please provide your delivery details</p>
            </div>

            {/* Delivery Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>First Name *</label>
                  <input
                    onChange={onchangehandler}
                    name='firstname'
                    value={formdata.firstname}
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all"
                    placeholder="name"
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Last Name *</label>
                  <input
                    onChange={onchangehandler}
                    name='lastname'
                    value={formdata.lastname}
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all"
                    placeholder="last name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address *</label>
                <input
                  onChange={onchangehandler}
                  name='email'
                  value={formdata.email}
                  type="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all"
                  placeholder="name12@example.com"
                />
              </div>

              <div className="mb-4">
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Street Address *</label>
                <input
                  onChange={onchangehandler}
                  name='street'
                  value={formdata.street}
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>City *</label>
                  <input
                    onChange={onchangehandler}
                    name='city'
                    value={formdata.city}
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all"
                    placeholder="Surat"
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>State *</label>
                  <input
                    onChange={onchangehandler}
                    name='state'
                    value={formdata.state}
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all"
                    placeholder="Gujarat"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Zipcode *</label>
                  <input
                    onChange={onchangehandler}
                    name='zipcode'
                    value={formdata.zipcode}
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all"
                    placeholder="395001"
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Country *</label>
                  <input
                    onChange={onchangehandler}
                    name='country'
                    value={formdata.country}
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all"
                    placeholder="India"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Phone Number *</label>
                <input
                  onChange={onchangehandler}
                  name='phone'
                  value={formdata.phone}
                  type="tel"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <button
                type='button'
                onClick={saveadd}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-[#8B1538] to-[#8B1538] hover:from-[#8B1538] hover:to-[#6B0F1A] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Save This Address
              </button>
            </div>

            {/* Saved Addresses */}
            {user?.address && user.address.length > 0 && (
              <div className='mb-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-4'>Saved Addresses</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {user.address.map((addr, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-[#D4AF37]/70 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-gray-800">
                          {addr.firstname} {addr.lastname}
                        </h4>
                        {addr.isDefault && (
                          <span className="px-2.5 py-1 bg-[#F4E4C1]/30 text-[#6B0F1A] text-xs font-bold rounded-lg border border-[#D4AF37]/70">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-gray-600 text-sm mb-4">
                        <p className="font-medium">{addr.street}</p>
                        <p>{addr.city}, {addr.state}</p>
                        <p>{addr.country} - {addr.zipcode}</p>
                        <div className="flex items-center gap-2 pt-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{addr.phone}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type='button'
                          onClick={() => setadd(index)}
                          className="flex-1 text-sm bg-black hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg transition-all duration-200 font-semibold"
                        >
                          Use This Address
                        </button>
                        <button
                          type='button'
                          onClick={() => remadd(index)}
                          className="text-sm text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg transition-colors duration-200 border-2 border-red-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className='lg:w-[420px] lg:flex-shrink-0'>
            <div className='lg:sticky lg:top-24 space-y-6'>
              {/* Cart Total */}
              <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Summary
                </h2>
                <Carttotal />
              </div>

              {/* Payment Method */}
              <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-4'>Payment Method</h3>
                <div className='space-y-3'>
                  <button
                    type='button'
                    onClick={() => setmethod('razorpay')}
                    className={`w-full p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${method === 'razorpay' ? 'border-[#8B1538] bg-[#F4E4C1]/10' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <img className='h-8 mx-auto' src="/icons/Razorpay.png" alt="Razorpay" />
                  </button>
                  <button
                    type='button'
                    onClick={() => setmethod('cod')}
                    className={`w-full p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md font-semibold ${method === 'cod' ? 'border-[#8B1538] bg-[#F4E4C1]/10 text-[#6B0F1A]' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                  >
                    💵 CASH ON DELIVERY
                  </button>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-black to-gray-800 text-white text-base font-bold px-6 py-4 rounded-xl hover:from-gray-800 hover:to-black shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2'
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                PLACE ORDER
              </button>

              {/* Trust Badges */}
              <div className='bg-gray-50 rounded-xl p-4 space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className='font-medium'>Secure Checkout</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='font-medium'>Money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder
