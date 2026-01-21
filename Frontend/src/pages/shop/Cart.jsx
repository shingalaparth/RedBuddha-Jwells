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

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4E4C1]/10 to-[#8B1538]/5 py-8'>
      {cartdata.length > 0 ? (
        <div className='w-full max-w-[1400px] mx-auto px-4 sm:px-6'>
          {/* Header */}
          <div className='mb-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div>
                <Title title1={'SHOPPING'} title2={'CART'} />
                <p className='text-gray-500 mt-2 font-medium'>
                  {cartdata.length} {cartdata.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              <button
                onClick={() => navigate('/collection')}
                className='text-sm font-semibold text-[#6B0F1A] hover:text-[#4A0D12] flex items-center gap-2 transition-colors'
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </button>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Cart Items */}
            <div className='lg:flex-1 space-y-4'>
              {cartdata.map((item, index) => {
                const productdata = products.find((product) => product._id === item._id);
                if (!productdata) return null;

                return (
                  <div
                    key={index}
                    className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 animate-slideIn'
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className='flex gap-4'>
                      {/* Product Image */}
                      <div className='w-24 h-24 flex-shrink-0'>
                        <div className='relative w-full h-full bg-gray-50 rounded-lg overflow-hidden group'>
                          <img
                            src={productdata.images[0]}
                            alt={productdata.name}
                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className='flex-1 min-w-0 flex flex-col sm:flex-row gap-4 justify-between'>
                        {/* Product Info */}
                        <div className='flex-1 min-w-0'>
                          <h3 className='text-base font-bold text-gray-900 mb-2 truncate hover:text-[#6B0F1A] transition-colors cursor-pointer'>
                            {productdata.name}
                          </h3>
                          <div className='flex flex-wrap items-center gap-3 mb-2'>
                            <span className='text-xl font-bold text-gray-900'>
                              {currency}{productdata.price.toLocaleString()}
                            </span>
                            <span className='px-2.5 py-1 bg-[#F4E4C1]/10 border border-[#E8D5B7] rounded-md text-xs font-bold text-[#6B0F1A]'>
                              Size: {item.size}
                            </span>
                          </div>

                          {/* Stock Warning */}
                          {productdata.quant[item.size] <= 5 && (
                            <div className='flex items-center gap-1.5 text-xs text-[#8B1538] bg-[#F4E4C1]/10 px-2.5 py-1.5 rounded-md inline-flex'>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              Only {productdata.quant[item.size]} left
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className='flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3'>
                          {/* Quantity Controls */}
                          <div className='flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-200'>
                            <button
                              onClick={() => updatequantity(item._id, item.size, item.qualtity - 1)}
                              disabled={item.qualtity <= 1}
                              className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 ${item.qualtity <= 1
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-white hover:shadow-sm active:scale-95'
                                }`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                              </svg>
                            </button>

                            <div className='min-w-[40px] text-center'>
                              <span className='text-sm font-bold text-gray-900'>{item.qualtity}</span>
                            </div>

                            <button
                              onClick={() => updatequantity(item._id, item.size, item.qualtity + 1)}
                              disabled={item.qualtity >= productdata.quant[item.size]}
                              className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 ${item.qualtity >= productdata.quant[item.size]
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-white hover:shadow-sm active:scale-95'
                                }`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => updatequantity(item._id, item.size, 0)}
                            className='p-2 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 hover:border-red-300 transition-all duration-200 group'
                            title='Remove item'
                          >
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary - Sticky on Desktop */}
            <div className='lg:w-[380px] flex-shrink-0'>
              <div className='bg-white rounded-xl shadow-md border border-gray-100 p-6 lg:sticky lg:top-24'>
                <h2 className='text-lg font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Summary
                </h2>

                <Carttotal />

                <button
                  onClick={() => navtoplaceorder() ? navigate('/placeorder') : ''}
                  className='w-full mt-6 py-3.5 px-6 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group'
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {/* Trust Badges */}
                <div className='mt-6 pt-6 border-t border-gray-200 space-y-3'>
                  <div className='flex items-center gap-3 text-sm text-gray-600'>
                    <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className='font-medium'>Secure Checkout</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-gray-600'>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <span className='font-medium'>Free Shipping on ₹2000+</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-gray-600'>
                    <div className='w-8 h-8 bg-[#F4E4C1]/30 rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className="w-4 h-4 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className='font-medium'>7-Day Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart State
        <div className='flex flex-col items-center justify-center min-h-[90vh] px-4 animate-slideIn'>
          <div className='text-center max-w-screen-md w-full mb-16 relative'>


            <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#F4E4C1]/30 to-[#F4E4C1]/50 rounded-full flex items-center justify-center shadow-inner relative z-10'>
              <svg className="w-10 h-10 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-3 font-serif'>Your cart is empty</h2>
            <p className='text-gray-500 mb-8 max-w-xs mx-auto text-sm leading-relaxed'>
              Looks like you haven't discovered our treasures yet. Explore our collection to find your perfect piece.
            </p>
            <button
              onClick={() => navigate('/collection')}
              className='inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#8B1538] to-[#6B0F1A] text-white rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 group'
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Start Shopping
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Cart