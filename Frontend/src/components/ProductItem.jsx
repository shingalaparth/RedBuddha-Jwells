import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { NavLink } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <NavLink className='text-gray-700 cursor-pointer' to={`/product/${id}`} >
      <div className='overflow-hidden h-60 flex items-center justify-center '>
        <img className='w-full h-full object-contain hover:scale-110 transition ease-in-out' src={image} alt="" />
      </div>
      <p className=' mx-2 py-3 text-sm whitespace-normal break-words '  >{name}</p>
      <p className='mx-2 text-sm font-medium'>{`${currency} ${price}`}</p>  
    </NavLink>
  )
}

export default ProductItem
