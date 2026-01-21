import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import Title from '../../components/Title'
import ProductItem from '../../components/ProductItem'
import NewsLetterBox from '../../components/NewsLetterBox'

// --- Internal Components for Home Page ---

const Hero = () => {
  return (
    <div className='relative w-full h-[85vh] bg-[#fdfbf7] overflow-hidden flex flex-col md:flex-row'>
      {/* Text Content */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 z-10'>
        <div className='text-center md:text-left max-w-lg animate-fade-in'>
          <div className='flex items-center justify-center md:justify-start gap-2 mb-4'>
            <span className='w-8 md:w-12 h-[1px] bg-[#880e4f]'></span>
            <p className='font-medium text-sm md:text-base tracking-[0.2em] text-[#880e4f] uppercase'>
              RedBuddha Jwells
            </p>
          </div>
          <h1 className='prata-regular text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-tight mb-6'>
            Timeless <br /> <span className='text-[#880e4f]'>Elegance</span>
          </h1>
          <p className='text-gray-600 text-sm md:text-base mb-8 leading-relaxed'>
            Discover jewelry that speaks to your soul. Handcrafted with passion, designed for the modern muse.
          </p>
          <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start'>
            <Link to="/collection" className='group relative px-8 py-3 bg-gray-900 text-white font-medium tracking-wide overlow-hidden border border-gray-900 hover:bg-transparent hover:text-gray-900 transition-all duration-300'>
              SHOP LATEST
            </Link>
            <Link to="/about" className='px-8 py-3 border border-gray-300 text-gray-700 font-medium tracking-wide hover:border-gray-900 transition-all duration-300'>
              OUR STORY
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className='w-full md:w-1/2 h-full relative'>
        <img
          src='/icons/hero_img.png'
          alt='RedBuddha Jewelry Collection'
          className='absolute w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[#fdfbf7]/50 to-transparent md:bg-gradient-to-l'></div>
      </div>
    </div>
  )
}

// Product Images for Categories
import imgRing from '../../assets/p_img1.jpeg'
import imgNecklace from '../../assets/p_img2_2.jpeg'
import imgEarring from '../../assets/p_img3.jpeg'
import imgBracelet from '../../assets/p_img11.jpeg'

const ShopByCategory = () => {
  const categories = [
    { name: 'Rings', img: imgRing },
    { name: 'Necklaces', img: imgNecklace },
    { name: 'Earrings', img: imgEarring },
    { name: 'Bracelets', img: imgBracelet }
  ];

  return (
    <div className='my-20'>
      <div className='text-center mb-10'>
        <h2 className='prata-regular text-3xl text-gray-900 mb-2'>Shop By Category</h2>
        <p className='text-gray-500 text-sm tracking-wide'>Find your perfect piece</p>
      </div>
      <div className='flex flex-wrap justify-center gap-8 md:gap-16 px-4'>
        {categories.map((cat, idx) => (
          <Link to='/collection' key={idx} className='group flex flex-col items-center cursor-pointer'>
            <div className='w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#880e4f] transition-all duration-300 shadow-md'>
              <img src={cat.img} alt={cat.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
            </div>
            <p className='mt-3 font-medium text-gray-800 group-hover:text-[#880e4f] transition-colors'>{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestproduct, setlatestproduct] = useState([])

  useEffect(() => {
    setlatestproduct(products.slice(0, 8));
  }, [products])

  return (
    <div className='py-16 bg-white'>
      <div className='text-center mb-12'>
        <Title title1={"NEW"} title2={"ARRIVALS"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mt-2'>
          Fresh from our artisans. Explore the latest additions to the RedBuddha collection.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {latestproduct.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.images[0]} name={item.name} price={item.price} />
        ))}
      </div>

      <div className='text-center mt-12'>
        <Link to='/collection' className='inline-block border-b-2 border-gray-900 pb-1 text-gray-900 font-medium hover:text-[#880e4f] hover:border-[#880e4f] transition-colors'>
          VIEW ALL COLLECTIONS
        </Link>
      </div>
    </div>
  )
}

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestseller, setbestseller] = useState([]);

  useEffect(() => {
    const bestprod = products.filter(item => item.bestseller)
    setbestseller(bestprod.slice(0, 4))
  }, [products])

  return (
    <div className='py-16 bg-[#fdfbf7]'>
      <div className='text-center mb-12'>
        <Title title1={"MOST"} title2={"LOVED"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mt-2'>
          Our most coveted pieces, chosen by you.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {bestseller.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.images[0]} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  )
}

const Icon = ({ d }) => (
  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#880e4f] mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const OurPolicy = () => {
  return (
    <div className="py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">

        <div className="flex flex-col items-center text-center p-6">
          <Icon d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-6-13L21 7.5m0 0L16.5 12M21 7.5h-18" />
          <h3 className="text-lg font-serif text-gray-900 mb-2">Easy Exchange</h3>
          <p className="text-sm text-gray-500">Hassle-free exchanges within 30 days.</p>
        </div>

        <div className="flex flex-col items-center text-center p-6">
          <Icon d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <h3 className="text-lg font-serif text-gray-900 mb-2">7 Days Return</h3>
          <p className="text-sm text-gray-500">Shop with confidence. Money back guarantee.</p>
        </div>

        <div className="flex flex-col items-center text-center p-6">
          <Icon d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          <h3 className="text-lg font-serif text-gray-900 mb-2">Premium Support</h3>
          <p className="text-sm text-gray-500">Dedicated assistance for our valued clients.</p>
        </div>

      </div>
    </div>
  );
};

const Testimonial = () => (
  <div className='py-20 bg-[url("/testimonials-bg.jpg")] bg-cover bg-center relative'>
    <div className='absolute inset-0 bg-black/5'></div>
    <div className='relative max-w-4xl mx-auto text-center px-4'>
      <span className='text-3xl text-[#880e4f] font-serif mb-4 block'>"</span>
      <h2 className='prata-regular text-2xl md:text-3xl text-gray-800 mb-6 leading-relaxed'>
        "The craftsmanship of RedBuddha Jwells is simply unmatched. I felt like royalty wearing their necklace to my gala."
      </h2>
      <p className='text-sm tracking-widest uppercase font-semibold text-gray-500'>- Sarah Jenkins</p>
    </div>
  </div>
)

// --- Main Page Component ---

const Home = () => {
  return (
    <div className='animate-fade-in'>
      <Hero />
      <ShopByCategory />
      <LatestCollection />
      <Testimonial />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home
