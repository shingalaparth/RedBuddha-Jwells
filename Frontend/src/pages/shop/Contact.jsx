import React, { useEffect } from 'react'


const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  return (
    <div className='bg-gradient-to-b from-white via-gray-50 to-white min-h-screen py-16'>
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>

        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-4'>
            Get In Touch
          </h1>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>

          {/* Contact Image & Info */}
          <div className='space-y-8'>
            {/* Image */}
            <div className='relative rounded-2xl overflow-hidden shadow-2xl h-96'>
              <img
                src="https://images.pexels.com/photos/7974/pexels-photo.jpg?cs=srgb&dl=pexels-life-of-pix-7974.jpg&fm=jpg"
                alt="Contact Us"
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
              <div className='absolute bottom-8 left-8 text-white'>
                <h3 className='font-serif text-3xl font-bold mb-2'>Let's Connect</h3>
                <p className='text-gray-200'>Your feedback matters to us</p>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-[#D4AF37]/70 hover:shadow-lg transition-all duration-300'>
                <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4'>
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className='font-bold text-gray-900 mb-2'>Business Hours</h4>
                <p className='text-sm text-gray-600'>Mon-Sat: 10am-8pm</p>
                <p className='text-sm text-gray-600'>Sunday: Closed</p>
              </div>

              <div className='bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-[#D4AF37]/70 hover:shadow-lg transition-all duration-300'>
                <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4'>
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className='font-bold text-gray-900 mb-2'>Visit Us</h4>
                <p className='text-sm text-gray-600'>Surat, Gujarat</p>
                <p className='text-sm text-gray-600'>India</p>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12'>
            <h3 className='font-serif text-3xl font-bold text-gray-900 mb-8'>Contact Information</h3>

            <div className='space-y-8'>
              {/* Phone */}
              <div className='flex items-start gap-6 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 hover:shadow-lg transition-all duration-300'>
                <div className='flex-shrink-0'>
                  <div className='w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center'>
                    <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-bold text-blue-900 uppercase tracking-wider mb-2'>Phone</h4>
                  <a href='tel:+919999999999' className='text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors block mb-1'>
                    +91 99999 99999
                  </a>
                  <p className='text-sm text-gray-600'>Available Mon-Sat, 10am-8pm</p>
                </div>
              </div>

              {/* Email */}
              <div className='flex items-start gap-6 p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 hover:shadow-lg transition-all duration-300'>
                <div className='flex-shrink-0'>
                  <div className='w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center'>
                    <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-bold text-green-900 uppercase tracking-wider mb-2'>Email</h4>
                  <a href='mailto:redbuddhajwells@gmail.com' className='text-xl font-bold text-gray-900 hover:text-green-600 transition-colors block mb-1'>
                    redbuddhajwells@gmail.com
                  </a>
                  <p className='text-sm text-gray-600'>We'll respond within 24 hours</p>
                </div>
              </div>

              {/* Instagram */}
              <div className='flex items-start gap-6 p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100/50 border-2 border-pink-200 hover:shadow-lg transition-all duration-300'>
                <div className='flex-shrink-0'>
                  <div className='w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center'>
                    <svg className='w-7 h-7 text-white' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-bold text-pink-900 uppercase tracking-wider mb-2'>Instagram</h4>
                  <a href='https://www.instagram.com/redbuddhajwells' target='_blank' rel='noopener noreferrer' className='text-xl font-bold text-gray-900 hover:text-pink-600 transition-colors block mb-1'>
                    @RedBuddhaJwells
                  </a>
                  <p className='text-sm text-gray-600'>Follow for updates & style inspiration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 text-white mb-16 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-96 h-96 bg-[#8B1538]/10 rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-[#8B1538]/10 rounded-full blur-3xl'></div>

          <div className='relative z-10 text-center max-w-3xl mx-auto'>
            <h3 className='font-serif text-3xl md:text-4xl font-bold mb-4'>Have Questions?</h3>
            <p className='text-gray-300 mb-8 text-lg'>
              Our customer support team is here to help you with any queries about our products, orders, or services.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a
                href='tel:+919999999999'
                className='px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#8B1538] text-white font-bold rounded-xl hover:from-[#8B1538] hover:to-[#6B0F1A] shadow-lg hover:shadow-xl transition-all duration-200'
              >
                CALL US NOW
              </a>
              <a
                href='mailto:redbuddhajwells@gmail.com'
                className='px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200'
              >
                SEND EMAIL
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}

      </div>
    </div>
  )
}

export default Contact