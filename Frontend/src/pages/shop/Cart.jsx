import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext.jsx';
import Title from '../../components/Title.jsx'
import Carttotal from '../../components/Carttotal.jsx';

const Cart = () => {
  const { cartitems, currency, products, updatequantity, navigate, navtoplaceorder } = useContext(ShopContext);
  const [cartdata, setcartdata] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempdata = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              qualtity: cartitems[items][item]
            })
          }
        }
      }
      setcartdata(tempdata);
    }
  }, [cartitems, products])


  return (cartdata.length > 0 ?
    (<div className='w-[80vw] mx-auto my-8'>
      <div className='flex justify-start mb-0'>
        <Title title1={'YOUR'} title2={'CART'} />
      </div>
      <div className='mb-8'>
        {
          cartdata.map((item, index) => {
            const productdata = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='bg-white p-4 sm:p-5 my-5 flex flex-col sm:flex-row border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
                {/* Product Image */}
                <div className='w-full sm:w-1/5 mb-4 sm:mb-0 flex justify-center sm:justify-start'>
                  <img className='h-40 w-40 sm:h-35 sm:w-auto object-cover rounded-lg' src={productdata.images[0]} alt="" />
                </div>

                {/* Product Details and Controls */}
                <div className='w-full sm:w-4/5 sm:pl-5 flex flex-col sm:flex-row items-center justify-between'>
                  {/* Product Info */}
                  <div className='w-full sm:w-2/5 mb-4 sm:mb-0'>
                    <div className='text-lg sm:text-xl font-medium mb-2 text-gray-800'>{productdata.name}</div>
                    <div className='flex flex-wrap items-center gap-3 text-sm font-medium text-gray-600'>
                      <div className='text-amber-600 font-semibold'>{`${currency}${productdata.price}`}</div>
                      <div className='px-3 py-1 bg-gray-100 rounded-full text-xs'>{`Size: ${item.size}`}</div>
                    </div>
                  </div>

                  {/* Controls Container */}
                  <div className='w-full md:w-3/5 flex flex-col md:flex-row items-center justify-between md:justify-end gap-4'>
                    {/* Quantity Controls */}
                    <div className='flex items-center justify-center w-full sm:w-auto'>
                      <div className='flex lg:mr-20 items-center gap-3 bg-gray-50 p-2 rounded-lg'>
                        {/* Minus Button */}
                        <button
                          onClick={() => updatequantity(item._id, item.size, item.qualtity - 1)}
                          disabled={item.qualtity <= 1}
                          className={`h-9 w-9 flex justify-center items-center rounded-full border-2 transition-all duration-200
                          ${item.qualtity <= 1
                              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                              : 'border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 hover:shadow-sm'
                            }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>

                        {/* Quantity Display */}
                        <div className='mx-3 min-w-[40px] text-center'>
                          <span className='text-lg font-semibold text-gray-800'>{item.qualtity}</span>
                        </div>

                        {/* Plus Button */}
                        <button
                          onClick={() => updatequantity(item._id, item.size, item.qualtity + 1)}
                          className="h-9 w-9 flex justify-center items-center rounded-full border-2 border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 hover:shadow-sm transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div className='flex justify-center sm:justify-end w-full sm:w-auto'>
                      <button
                        onClick={() => updatequantity(item._id, item.size, 0)}
                        className="px-4 py-2.5 rounded-lg border border-gray-200 hover:border-red-200 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-200 flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className='text-sm font-medium hidden sm:inline'>Remove</span>
                        <span className='text-sm font-medium sm:hidden'>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='flex flex-col items-end'>
        <Carttotal />
        <div className='flex justify-end'>
          <button onClick={() => navtoplaceorder() ? navigate('/placeorder') : ''} className='bg-black text-white text-sm font-medium px-6 py-3 my-4 rounded-lg hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200'>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>)
    : (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
        <p className="text-gray-400 mt-2">Add items to get started</p>
      </div>
    )
  )
}

export default Cart