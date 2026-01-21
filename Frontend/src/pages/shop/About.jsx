import React, { useEffect } from 'react'
import Title from '../../components/Title.jsx'


const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  return (
    <div className='bg-gradient-to-b from-white via-gray-50 to-white'>
      {/* Hero Section */}
      <div className='relative h-[60vh] md:h-[70vh] overflow-hidden'>
        <img
          src="/images/aboutus.jpg"
          alt="Elegant jewellery display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white px-4'>
            <h1 className='font-serif text-5xl md:text-7xl mb-4'>Our Story</h1>
            <p className='text-lg md:text-xl text-gray-200 max-w-2xl mx-auto'>
              Crafting timeless elegance since our inception
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* About Story Section */}
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-16'>
          <div className='flex flex-col lg:flex-row'>
            {/* Image Side */}
            <div className='lg:w-2/5 relative'>
              <img
                src="/images/aboutus.jpg"
                alt="RedBuddha Jwells Craftsmanship"
                className="w-full h-full min-h-[400px] lg:min-h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538]/10 to-transparent"></div>
            </div>

            {/* Content Side */}
            <div className='lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center'>
              <div className='mb-8'>
                <Title title1={'ABOUT'} title2={'US'} />
              </div>

              <div className='space-y-6 text-gray-600 leading-relaxed'>
                <p className='text-base lg:text-lg'>
                  <span className='text-5xl font-serif text-[#8B1538] float-left mr-4 mt-2 leading-none'>R</span>
                  edBuddha Jwells was born from a passion for exquisite craftsmanship and a vision to make luxury jewelry accessible. Our journey started with one clear goal: to create a platform where people can discover and own timeless pieces that truly stand out.
                </p>

                <p className='text-base lg:text-lg'>
                  From the very beginning, we've focused on curating a thoughtfully selected range of high-quality jewelry that blends elegance, quality, and value. Whether it's rings, necklaces, bracelets, or statement pieces, RedBuddha Jwells brings together designs that reflect individuality and refined taste, all sourced from master craftsmen and trusted partners.
                </p>

                <div className='pt-6 border-t-2 border-[#F4E4C1]/30'>
                  <h3 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                    <span className='w-2 h-8 bg-gradient-to-b from-[#8B1538] to-[#8B1538] rounded-full'></span>
                    Our Mission
                  </h3>
                  <p className='text-base lg:text-lg text-gray-700'>
                    At RedBuddha Jwells, our mission is to make discovering exceptional jewelry easy and inspiring. We aim to offer convenience, reliability, and confidence at every step of your journey — from browsing and selection to checkout and delivery. We believe jewelry shopping should feel effortless, enjoyable, and personal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='font-serif text-4xl md:text-5xl text-gray-900 mb-4'>Why Choose Us</h2>
            <p className='text-gray-500 text-lg'>Excellence in every detail</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Quality Assurance */}
            <div className='bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#D4AF37]/70 hover:shadow-xl transition-all duration-300 group'>
              <div className='w-16 h-16 bg-gradient-to-br from-[#8B1538] to-[#8B1538] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Quality Assurance</h3>
              <p className='text-gray-600 leading-relaxed'>
                We meticulously select and inspect every piece to ensure it meets our high standards of craftsmanship, durability, and finish.
              </p>
            </div>

            {/* Convenience */}
            <div className='bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#D4AF37]/70 hover:shadow-xl transition-all duration-300 group'>
              <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Convenience</h3>
              <p className='text-gray-600 leading-relaxed'>
                With our intuitive, user-friendly platform and a smooth ordering process, finding and purchasing the perfect jewellery piece is simple and stress-free.
              </p>
            </div>

            {/* Customer Service */}
            <div className='bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#D4AF37]/70 hover:shadow-xl transition-all duration-300 group'>
              <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Exceptional Customer Service</h3>
              <p className='text-gray-600 leading-relaxed'>
                Our dedicated support team is always here to guide you at every step, ensuring your experience with RedBuddha Jwells is seamless, reassuring, and truly satisfying.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className='bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 mb-16 text-white relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-96 h-96 bg-[#8B1538]/10 rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-[#8B1538]/10 rounded-full blur-3xl'></div>

          <div className='relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div>
              <p className='text-5xl font-bold text-[#D4AF37] mb-2'>10K+</p>
              <p className='text-gray-300'>Happy Customers</p>
            </div>
            <div>
              <p className='text-5xl font-bold text-[#D4AF37] mb-2'>500+</p>
              <p className='text-gray-300'>Unique Designs</p>
            </div>
            <div>
              <p className='text-5xl font-bold text-[#D4AF37] mb-2'>100%</p>
              <p className='text-gray-300'>Authentic</p>
            </div>
            <div>
              <p className='text-5xl font-bold text-[#D4AF37] mb-2'>24/7</p>
              <p className='text-gray-300'>Support</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='font-serif text-4xl md:text-5xl text-gray-900 mb-4'>Our Values</h2>
            <p className='text-gray-500 text-lg'>The principles that guide us</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[
              {
                title: 'Craftsmanship',
                description: 'Every piece is a work of art, meticulously crafted by skilled artisans.',
                icon: '✨'
              },
              {
                title: 'Authenticity',
                description: '100% genuine materials and certified quality in every product.',
                icon: '💎'
              },
              {
                title: 'Innovation',
                description: 'Blending traditional techniques with modern design aesthetics.',
                icon: '🎨'
              },
              {
                title: 'Trust',
                description: 'Building lasting relationships through transparency and integrity.',
                icon: '🤝'
              }
            ].map((value, index) => (
              <div key={index} className='flex gap-6 p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-[#E8D5B7] hover:shadow-lg transition-all duration-300'>
                <div className='text-5xl'>{value.icon}</div>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>{value.title}</h3>
                  <p className='text-gray-600'>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}

      </div>
    </div>
  )
}

export default About
