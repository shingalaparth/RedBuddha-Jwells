import React from 'react'

const Title = ({ title1, title2 }) => {
  return (
    <div className='flex gap-2 justify-center items-center'>
      <p><span className='text-2xl sm:text-4xl mx-1 text-gray-400'>{title1}</span> <span className='text-2xl sm:text-4xl font-semibold text-gray-600'>{title2}</span></p>
      <p className=' sm:block hidden w-12 h-1 bg-gray-600'></p>
    </div>
  )
}

export default Title