import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { NavLink } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <NavLink className='group block' to={`/product/${id}`} >
      <div className='relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all duration-300 cursor-pointer group-hover:shadow-xl group-hover:border-[#D4AF37]/30'>
        {/* Image Container with Aspect Ratio */}
        <div className='aspect-[4/5] overflow-hidden bg-gray-50 relative'>
          <img
            className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out'
            src={image}
            alt={name}
          />
          {/* Overlay gradient on hover */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

          {/* Quick Action Button (optional, illustrative) */}
          <div className='absolute bottom-4 right-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100'>
            <span className='w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#8B1538] shadow-lg hover:bg-[#8B1538] hover:text-white transition-colors'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className='p-4 bg-white'>
          <h3 className='text-sm text-gray-700 font-medium line-clamp-2 min-h-[2.5em] group-hover:text-[#8B1538] transition-colors duration-200'>
            {name}
          </h3>
          <div className='mt-2 flex items-center justify-between'>
            <p className='text-[#8B1538] text-base font-bold'>{currency}{price}</p>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default ProductItem
