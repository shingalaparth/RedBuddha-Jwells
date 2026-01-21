import React from 'react'

const Title = ({ title1, title2 }) => {
  return (
    <div className='flex gap-3 justify-center items-center mb-8'>
      <div className='h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#8B1538]'></div>
      <p className='font-serif tracking-in-expand'>
        <span className='text-3xl sm:text-4xl mx-2 text-gray-500 font-light'>{title1}</span>
        <span className='text-3xl sm:text-4xl font-medium text-[#8B1538]'>{title2}</span>
      </p>
      <div className='h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#8B1538]'></div>
    </div>
  )
}

export default Title