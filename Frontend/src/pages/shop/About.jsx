import React from 'react'
import Title from '../../components/Title.jsx'
import NewsLetterBox from '../../components/NewsLetterBox.jsx'
import { useEffect } from 'react'

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])
  return (
    <div>
      <div className='my-10 w-[95vw] sm:w-[70vw] md:w-[100vw] m-auto'>
        <Title title1={'ABOUT'} title2={'US'} />
        <div className="w-full max-w-6xl mx-auto p-8 bg-white flex flex-col md:flex-row items-start gap-10">
          <div className="relative">
            <img
              src="/images/aboutus.jpg"
              alt="Elegant jewellery display in a luxury store setting"
              className="w-full md:w-[40vw] h-[70vh] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
          <div className=" my-auto lg:w-3/5 w-full text-gray-600 font-sans leading-relaxed">
            <p className="mb-4 text-sm lg:text-base">RedBuddha Jwells was born from a passion for exquisite craftsmanship and a vision to make luxury jewelry accessible. Our journey started with one clear goal: to create a platform where people can discover and own timeless pieces that truly stand out.</p>
            <p className="mb-6 text-sm lg:text-base">From the very beginning, we've focused on curating a thoughtfully selected range of high-quality jewelry that blends elegance, quality, and value. Whether it's rings, necklaces, bracelets, or statement pieces, RedBuddha Jwells brings together designs that reflect individuality and refined taste, all sourced from master craftsmen and trusted partners.</p>
            <h3 className=" text-lg lg:text-xl font-bold  mt-6 mb-3">Our Mission</h3>
            <p className=" text-sm lg:text-base">At RedBuddha Jwells, our mission is to make discovering exceptional jewelry easy and inspiring. We aim to offer convenience, reliability, and confidence at every step of your journey — from browsing and selection to checkout and delivery. We believe jewelry shopping should feel effortless, enjoyable, and personal.</p>
          </div>
        </div>
        <div className="w-full max-w-6xl mb-10 mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3">Quality Assurance:</h3>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">We meticulously select and inspect every piece to ensure it meets our high standards of craftsmanship, durability, and finish.</p>
          </div>
          <div className="p-4 border-l border-gray-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3">Convenience:</h3>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">With our intuitive, user-friendly platform and a smooth ordering process, finding and purchasing the perfect jewellery piece is simple and stress-free.</p>
          </div>
          <div className="p-4 border-l border-gray-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3">Exceptional Customer Service:</h3>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">Our dedicated support team is always here to guide you at every step, ensuring your experience with RedBuddha Jwells is seamless, reassuring, and truly satisfying.</p>
          </div>
        </div>
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default About
