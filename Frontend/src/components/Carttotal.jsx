import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Carttotal = () => {
  const { getcartamount, currency, delivery_fee } = useContext(ShopContext);

  return (
    <div className='space-y-4'>
      {/* Subtotal Line */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 font-medium">Subtotal</span>
        <span className="text-sm font-bold text-gray-900">{currency}{getcartamount().toLocaleString()}</span>
      </div>

      {/* Shipping Fee Line */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 font-medium">Shipping Fee</span>
        <span className="text-sm font-bold text-gray-900">{currency}{getcartamount() === 0 ? 0 : delivery_fee}</span>
      </div>

      {/* Separator */}
      <hr className='border-t-2 border-gray-200' />

      {/* Total Line */}
      <div className="flex justify-between items-center pt-2">
        <span className="text-base font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">{currency}{getcartamount() === 0 ? 0 : (delivery_fee + getcartamount()).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default Carttotal
