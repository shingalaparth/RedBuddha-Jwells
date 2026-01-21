import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const Carttotal = () => {
  const { getcartamount, currency, delivery_fee,} = useContext(ShopContext);
  return (
    <div className='w-full'>
  <div className="w-full lg:w-[30vw] p-4 font-sans text-gray-800 bg-white">
    <div className='flex justify-start mb-10'>
      <Title title1={'CART'} title2={'TOTALS'} />
    </div>
    {/* Subtotal Line */}
    <div className="flex justify-between mb-2">
      <span className="text-sm">Subtotal</span>
      <span className="text-sm font-medium">{`${currency}${getcartamount()}.00`}</span>
    </div>

    {/* Shipping Fee Line */}
    <div className="flex justify-between mb-4">
      <span className="text-sm">Shipping Fee</span>
      <span className="text-sm font-medium">{currency}{getcartamount() === 0 ? 0 : delivery_fee}.00</span>
    </div>

    {/* Separator and Total Line */}
    <div className="pt-3 border-t border-gray-300">
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{currency}{getcartamount() === 0 ? 0 : delivery_fee + getcartamount()}.00</span>
      </div>
    </div>
  </div>
</div>
  )
}

export default Carttotal
