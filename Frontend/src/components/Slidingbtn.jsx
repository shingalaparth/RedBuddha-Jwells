import React from 'react'

const Slidingbtn = ({ view, setview }) => {
  return (
    <div className="relative bg-white p-0.5 sm:p-1 rounded-xl w-full sm:w-fit flex shadow-inner border border-gray-100">
      {/* Subtle slider */}
      <div 
        className={`
          absolute top-0.5 sm:top-1 bg-gradient-to-r from-blue-50 to-indigo-50 
          border border-blue-100 rounded-lg h-[calc(100%-4px)] sm:h-[calc(100%-8px)]
          transition-all duration-200 ease-in-out
          ${view === 'all' ? 'left-0.5 w-1/4' :
            view === 'pending' ? 'left-[25%] w-1/4' :
            view === 'delivered' ? 'left-1/2 w-1/4' :
            'left-3/4 w-1/4'
          }
        `}
        style={{
          transform: 'translateX(0)',
          width: 'calc(25% - 4px)',
          left: view === 'all' ? '2px' : 
                view === 'pending' ? 'calc(25% + 2px)' : 
                view === 'delivered' ? 'calc(50% + 2px)' : 
                'calc(75% + 2px)'
        }}
      ></div>
      
      <button 
        onClick={() => setview('all')}
        className={`relative z-10 flex-1 px-2 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm rounded-lg text-center transition-colors ${
          view === 'all' 
            ? 'text-blue-600 font-medium sm:font-semibold' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        All
      </button>
      
      <button 
        onClick={() => setview('pending')}
        className={`relative z-10 flex-1 px-2 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm rounded-lg text-center transition-colors ${
          view === 'pending' 
            ? 'text-blue-600 font-medium sm:font-semibold' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Pending
      </button>
      
      <button 
        onClick={() => setview('delivered')}
        className={`relative z-10 flex-1 px-2 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm rounded-lg text-center transition-colors ${
          view === 'delivered' 
            ? 'text-blue-600 font-medium sm:font-semibold' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Delivered
      </button>
      
      <button 
        onClick={() => setview('cancelled')}
        className={`relative z-10 flex-1 px-2 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm rounded-lg text-center transition-colors ${
          view === 'cancelled' 
            ? 'text-blue-600 font-medium sm:font-semibold' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Cancelled
      </button>
    </div>
  )
}

export default Slidingbtn