import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/Title.jsx'
import Carttotal from '../../components/Carttotal.jsx'
import { ShopContext } from '../../context/ShopContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { use } from 'react';
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
          toast.error('wrong')
        }
      }
    }
  }
  const fetchUser = async () => {
    console.log(backendURL)
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
    // SIMULATE PAYMENT
    toast.info("Redirecting to secure payment...");

    setTimeout(async () => {
      // Simulate success callback
      const response = {
        razorpay_order_id: order.id,
        razorpay_payment_id: "dummy_pay_" + Date.now()
      };

      console.log("Payment success:", response)
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
        console.log(error)
        toast.error("Payment verification failed")
      }
    }, 2000); // 2 second delay
  }

  const saveadd = async (req, res) => {
    const values = Object.values(formdata);
    if (values.some(v => v.trim() === '')) {
      toast.error('Please fill all address fields');
      return;
    }
    try {
      setloading(true)
      const resp = await axios.post(backendURL + '/api/user/address', { address: formdata }, { headers: { token } });
      if (resp.data.success) {
        toast.success('address saved')
        console.log('done')
        fetchUser()
      }
      else {
        toast.error(resp.data.message)
      }
      setloading(false)
    } catch (error) {
      console.log('done2')
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
    console.log(formdata)
  }

  const remadd = async (index) => {
    try {
      setloading(true)
      const res = await axios.post(backendURL + '/api/user/del', { index }, { headers: { token } })
      if (res.data.success) {
        toast.success('deleated')
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
      console.log(cartitems)
      for (const items in cartitems) {
        for (const s in cartitems[items]) {
          const quant = cartitems[items][s];
          const { data } = await axios.post(backendURL + '/api/order/check', { id: items, size: s, qua: quant }, { headers: { token } });
          if (!data.success) {
            a = false;
            toast.error(data.message);
            console.log(data.message);
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
          // userid: userId,
          address: formdata,
          items: orderitems,
          amount: getcartamount() + delivery_fee,
          // paymentmethod:method
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
              console.log(response.data.message)
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
              console.log(response.data.message)
              toast.error(response.data.message)
            }

          default:
            break;

        }
      }




    }
    catch (error) {
      console.log(error)
    }
  }



  return (loading ? <Loading /> :
    <form onSubmit={onsubmithandler} className='w-[90vw] md:w-[80vw] my-10 mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-0'>
      <div className='w-full lg:w-auto'>
        <div className='flex justify-start'>
          <Title title1={'DELEVERY'} title2={'INFORMATION'} />
        </div>
        <div className="w-full max-w-xl py-8 bg-white rounded-xl">
          {/* Field Group 1: First Name / Last Name (Two Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input onChange={onchangehandler} name='firstname' value={formdata.firstname} type="text" placeholder="First name" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            <input onChange={onchangehandler} name='lastname' value={formdata.lastname} type="text" placeholder="Last name" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 2: Email Address (Full Width) */}
          <div className="mb-4">
            <input onChange={onchangehandler} name='email' value={formdata.email} type="email" placeholder="Email address" required
              className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 3: Street (Full Width) */}
          <div className="mb-4">
            <input onChange={onchangehandler} name='street' value={formdata.street} type="text" placeholder="Street" required
              className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 4: City / State (Two Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input onChange={onchangehandler} name='city' value={formdata.city} type="text" placeholder="City" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            <input onChange={onchangehandler} name='state' value={formdata.state} type="text" placeholder="State" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 5: Zipcode / Country (Two Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input onChange={onchangehandler} name='zipcode' value={formdata.zipcode} type="text" placeholder="Zipcode" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            <input onChange={onchangehandler} name='country' value={formdata.country} type="text" placeholder="Country" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 6: Phone (Full Width) */}
          <div className="mb-6">
            <input onChange={onchangehandler} name='phone' value={formdata.phone} type="tel" placeholder="Phone" required
              className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

        </div>
        <button
          type='button'
          onClick={saveadd}
          className="px-8 mb-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl "
        >
          Save Address
        </button>
        {/* addresses  */}
        <div className='flex flex-wrap gap-4'>
          {user?.address?.map((addr, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:border-amber-300 hover:shadow-md transition-all duration-300 min-w-[280px] flex-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">
                    {addr.firstname} {addr.lastname}
                  </h3>
                </div>

                {addr.isDefault && (
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded border border-amber-200">
                    Default
                  </span>
                )}
              </div>

              <div className="space-y-2 text-gray-600 text-sm">
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

              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">

                <button type='button' onClick={() => remadd(index)} className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors duration-200 border border-red-200">
                  Remove
                </button>

                {!addr.isDefault && (
                  <button type='button' onClick={() => setadd(index)} className="text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-1.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ml-auto">
                    Use Address
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full lg:w-auto mt-8 lg:mt-0'>
        <div><Carttotal /></div>
        <div className='flex flex-col sm:flex-row justify-between gap-3 my-5'>
          <button type='button' onClick={() => setmethod('razorpay')} className={`w-full sm:w-[50%] p-2 border border-gray-300 active:bg-gray-200 ${method === 'razorpay' ? 'border-orange-600' : ''}`}><img className='h-7 mx-auto sm:mx-0' src="icons/Razorpay.png" alt="" /></button>
          <button type='button' onClick={() => setmethod('cod')} className={`w-full sm:w-[50%] p-2 border border-gray-300 active:bg-gray-200 ${method === 'cod' ? 'border-orange-600' : ''}`}>CASH ON DELIVERY</button>
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='bg-black text-white text-sm font-medium px-6 py-3 my-4 active:bg-gray-600 w-full sm:w-auto'>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
