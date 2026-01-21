import React from 'react'

const Slidingbtn = ({ view, setview }) => {
  return (
    <div className="relative bg-white p-1 rounded-xl w-full sm:w-fit flex shadow-inner border border-[#D4AF37]/30">
      {/* Subtle slider */}
      <div
        className={`
          absolute top-1 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A]
          rounded-lg h-[calc(100%-8px)] shadow-md
          transition-all duration-300 ease-in-out
          ${view === 'all' ? 'left-1 w-1/4' :
            view === 'pending' ? 'left-[25%] w-1/4' :
              view === 'delivered' ? 'left-1/2 w-1/4' :
                'left-3/4 w-1/4'
          }
        `}
        style={{
          width: 'calc(25% - 5px)',
          left: view === 'all' ? '4px' :
            view === 'pending' ? 'calc(25% + 2px)' :
              view === 'delivered' ? 'calc(50% + 2px)' :
                'calc(75% + 2px)'
        }}
      ></div>

      <button
        onClick={() => setview('all')}
        className={`relative z-10 flex-1 px-4 py-2.5 sm:px-8 text-xs sm:text-sm rounded-lg text-center transition-colors duration-300 ${view === 'all'
            ? 'text-white font-medium'
            : 'text-gray-500 hover:text-[#8B1538]'
          }`}
      >
        All
      </button>

      <button
        onClick={() => setview('pending')}
        className={`relative z-10 flex-1 px-4 py-2.5 sm:px-8 text-xs sm:text-sm rounded-lg text-center transition-colors duration-300 ${view === 'pending'
            ? 'text-white font-medium'
            : 'text-gray-500 hover:text-[#8B1538]'
          }`}
      >
        Pending
      </button>

      <button
        onClick={() => setview('delivered')}
        className={`relative z-10 flex-1 px-4 py-2.5 sm:px-8 text-xs sm:text-sm rounded-lg text-center transition-colors duration-300 ${view === 'delivered'
            ? 'text-white font-medium'
            : 'text-gray-500 hover:text-[#8B1538]'
          }`}
      >
        Delivered
      </button>

      <button
        onClick={() => setview('cancelled')}
        className={`relative z-10 flex-1 px-4 py-2.5 sm:px-8 text-xs sm:text-sm rounded-lg text-center transition-colors duration-300 ${view === 'cancelled'
            ? 'text-white font-medium'
            : 'text-gray-500 hover:text-[#8B1538]'
          }`}
      >
        Cancelled
      </button>
    </div>
  )
}

export default Slidingbtn