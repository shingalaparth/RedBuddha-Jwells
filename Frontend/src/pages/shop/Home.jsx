import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../../context/ShopContext'
import Title from '../../components/Title'
import ProductItem from '../../components/ProductItem'


// --- Internal Components for Home Page ---

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      className='relative w-full min-h-screen overflow-hidden bg-[#FDFBF7]'
      onMouseMove={handleMouseMove}
    >
      {/* Animated Grid Background */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute inset-0' style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #8B1538 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Sparkles */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='absolute w-2 h-2 bg-[#D4AF37] rounded-full animate-sparkle'
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Floating Orbs with Parallax */}
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#8B1538]/15 to-[#D4AF37]/10 rounded-full blur-3xl animate-float'
          style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
        />
        <div
          className='absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/15 to-[#8B1538]/10 rounded-full blur-3xl animate-float-delayed'
          style={{ transform: `translate(${-mousePosition.x * 30}px, ${-mousePosition.y * 30}px)` }}
        />
      </div>

      <div className='relative max-w-[1600px] mx-auto min-h-[90vh] flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-12'>

        {/* Text Content */}
        <div className='w-full lg:w-1/2 flex items-center justify-center z-10 mb-10 lg:mb-0'>
          <div className='text-center lg:text-left max-w-xl'>
            {/* Badge */}
            <div className='inline-flex items-center gap-3 mb-6 animate-slide-in'>
              <span className='w-12 h-[2px] bg-gradient-to-r from-[#8B1538] to-[#D4AF37]'></span>
              <span className='px-4 py-2 bg-[#8B1538]/10 rounded-full text-xs font-bold tracking-[0.2em] text-[#8B1538] uppercase border border-[#8B1538]/20'>
                ✦ Premium Collection
              </span>
            </div>

            {/* Main Heading */}
            <h1 className='font-serif text-5xl md:text-7xl lg:text-8xl text-gray-900 leading-[0.9] mb-6 animate-slide-in-delayed'>
              Timeless <br />
              <span className='relative inline-block'>
                <span className='bg-gradient-to-r from-[#8B1538] via-[#D4AF37] to-[#8B1538] bg-clip-text text-transparent animate-gradient-text bg-300%'>
                  Elegance
                </span>
                {/* Underline Decoration */}
                <svg className='absolute -bottom-2 left-0 w-full' viewBox="0 0 200 12" fill="none">
                  <path d="M2 8 C50 2, 150 2, 198 8" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" className='animate-draw' />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className='text-gray-600 text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up max-w-md mx-auto lg:mx-0'>
              Discover jewelry that speaks to your soul. Handcrafted with passion, designed for the modern muse.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up-delayed'>
              <Link
                to="/collection"
                className='group px-10 py-4 bg-gradient-to-r from-[#8B1538] to-[#6B0F1A] text-white font-bold tracking-wide rounded-full hover:shadow-2xl hover:shadow-[#8B1538]/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3'
              >
                <span>EXPLORE NOW</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className='px-10 py-4 bg-white border-2 border-[#8B1538]/30 text-[#8B1538] font-bold tracking-wide rounded-full hover:border-[#8B1538] hover:bg-[#8B1538]/5 transition-all duration-300'
              >
                OUR STORY
              </Link>
            </div>

            {/* Trust Stats */}
            <div className='mt-10 flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-[#8B1538]/10'>
              {[
                { number: '10K+', label: 'Happy Clients' },
                { number: '500+', label: 'Designs' },
                { number: '5★', label: 'Rated' }
              ].map((stat, index) => (
                <div key={index} className='text-center group cursor-default'>
                  <p className='text-2xl md:text-3xl font-bold text-[#8B1538] group-hover:scale-110 transition-transform'>{stat.number}</p>
                  <p className='text-xs text-gray-500 mt-1 uppercase tracking-wider'>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className='w-full lg:w-1/2 flex items-center justify-center z-10'>
          <div className='relative w-full max-w-lg'>
            {/* Decorative Frame */}
            <div className='absolute -inset-4 border-2 border-[#D4AF37]/30 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform'></div>
            <div className='absolute -inset-4 border-2 border-[#8B1538]/20 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform'></div>

            {/* Main Image Container */}
            <div className='relative rounded-3xl overflow-hidden shadow-2xl shadow-[#8B1538]/20 border-4 border-white group'>
              {/* Glowing Border Effect */}
              <div className='absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#8B1538]/20 z-10 pointer-events-none'></div>

              <img
                src='/icons/hero_img.png'
                alt='RedBuddha Luxury Jewelry Collection'
                className='w-full aspect-[4/5] object-cover transform group-hover:scale-110 transition-transform duration-700'
              />

              {/* Overlay Gradient */}
              <div className='absolute inset-0 bg-gradient-to-t from-[#8B1538]/30 via-transparent to-transparent z-10'></div>

              {/* Floating Tag */}
              <div className='absolute bottom-6 left-6 right-6 z-20'>
                <div className='bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#D4AF37]/30'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-xs text-[#8B1538] font-bold uppercase tracking-wider'>Featured</p>
                      <p className='text-sm font-bold text-gray-900 mt-1'>Rose Gold Collection</p>
                    </div>
                    <Link to="/collection" className='w-10 h-10 bg-[#8B1538] rounded-full flex items-center justify-center hover:bg-[#6B0F1A] transition-colors'>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className='absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-full flex items-center justify-center shadow-lg animate-bounce-slow'>
              <span className='text-white text-xl'>✦</span>
            </div>
            <div className='absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-full flex items-center justify-center shadow-lg animate-pulse'>
              <span className='text-white text-sm'>♦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow'>
        <div className='flex flex-col items-center gap-2 text-gray-400'>
          <span className='text-xs uppercase tracking-widest'>Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
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
    <div className='py-24 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative'>
      {/* Background Decoration */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute top-10 right-20 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-2xl'></div>
      </div>

      <div className='relative text-center mb-16'>
        <h2 className='font-serif text-4xl md:text-5xl text-gray-900 mb-4'>Shop By Category</h2>
        <p className='text-gray-500 text-lg'>Find your perfect piece</p>
      </div>
      <div className='relative flex flex-wrap justify-center gap-8 md:gap-16 px-4'>
        {categories.map((cat, idx) => (
          <Link to='/collection' key={idx} className='group flex flex-col items-center cursor-pointer'>
            <div className='w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#8B1538]/20 group-hover:border-[#8B1538] transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-[#8B1538]/20'>
              <img src={cat.img} alt={cat.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
            </div>
            <p className='mt-4 font-bold text-lg text-gray-800 group-hover:text-[#8B1538] transition-colors'>{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

const LatestCollection = () => {
  const { products, backendURL } = useContext(ShopContext);
  const [latestproduct, setlatestproduct] = useState([])
  const [productRatings, setProductRatings] = useState({});

  useEffect(() => {
    setlatestproduct(products.slice(0, 8));
  }, [products])

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/review/ratings`);
        if (response.data.success) {
          setProductRatings(response.data.ratings);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRatings();
  }, []);

  return (
    <div className='py-24 bg-gradient-to-b from-white to-[#F4E4C1]/10 relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-[#8B1538]/5 rounded-full blur-3xl animate-pulse-slow'></div>
      </div>

      <div className='relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <Title title1={"NEW"} title2={"ARRIVALS"} />
          <p className='text-gray-600 text-lg mt-4 max-w-2xl mx-auto'>
            Fresh from our artisans. Explore the latest additions to the RedBuddha collection.
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {latestproduct.map((item, index) => (
            <div key={index} className='animate-fadeIn' style={{ animationDelay: `${index * 50}ms` }}>
              <ProductItem
                id={item._id}
                image={item.images[0]}
                name={item.name}
                price={item.price}
                rating={productRatings[item._id]?.averageRating || 0}
                reviewCount={productRatings[item._id]?.reviewCount || 0}
              />
            </div>
          ))}
        </div>

        <div className='text-center mt-16'>
          <Link
            to='/collection'
            className='inline-flex items-center gap-2 px-8 py-3 border-2 border-[#8B1538] text-[#8B1538] font-bold rounded-xl hover:bg-[#8B1538] hover:text-white transition-all duration-300 group'
          >
            VIEW ALL COLLECTIONS
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

const CustomerTestimonials = () => {
  const { backendURL } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch stats which includes top products with reviews
        const response = await axios.get(`${backendURL}/api/review/stats`);
        if (response.data.success && response.data.stats.topProducts) {
          setReviews(response.data.stats.topProducts.slice(0, 4));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, []);

  // Static testimonials as fallback if no reviews
  const staticTestimonials = [
    { name: "Priya S.", text: "Absolutely stunning craftsmanship! The necklace exceeded my expectations.", rating: 5 },
    { name: "Ananya M.", text: "Perfect for my wedding. Everyone complimented my jewelry!", rating: 5 },
    { name: "Rhea K.", text: "Beautiful packaging and quick delivery. Will order again!", rating: 5 },
    { name: "Kavita P.", text: "The quality is exceptional. Worth every penny!", rating: 5 }
  ];

  return (
    <div className='py-24 bg-gradient-to-b from-white to-[#FDFBF7] relative overflow-hidden'>
      {/* Background Decoration */}
      <div className='absolute top-20 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 left-0 w-60 h-60 bg-[#8B1538]/5 rounded-full blur-3xl'></div>

      <div className='relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <Title title1={"CUSTOMER"} title2={"LOVE"} />
          <p className='text-gray-600 text-lg mt-4 max-w-2xl mx-auto'>
            What our customers are saying about their RedBuddha experience
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {(reviews.length > 0 ? reviews : staticTestimonials).map((item, index) => (
            <div
              key={index}
              className='bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 animate-fadeIn'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className='flex gap-1 mb-4'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= (item.avgRating || item.rating || 5) ? 'text-[#D4AF37]' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className='text-gray-600 text-sm mb-4 italic line-clamp-3'>
                {item.text || `"Amazing quality jewelry from ${item.productName || 'RedBuddha'}. Highly recommended!"`}
              </p>

              {/* Customer/Product Info */}
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#8B1538] to-[#D4AF37] flex items-center justify-center text-white font-bold text-sm'>
                  {(item.name?.[0] || item.productName?.[0] || 'C').toUpperCase()}
                </div>
                <div>
                  <p className='font-semibold text-gray-900 text-sm'>{item.name || item.productName || 'Happy Customer'}</p>
                  <p className='text-xs text-gray-500'>{item.reviewCount ? `${item.reviewCount} reviews` : 'Verified Buyer'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className='text-center mt-12'>
          <Link
            to='/collection'
            className='inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#8B1538] to-[#6B0F2A] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300'
          >
            Shop Our Collection
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

const OurPolicy = () => {
  const policies = [
    {
      icon: (
        <svg className="w-12 h-12 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18m-6-13L21 7.5m0 0L16.5 12M21 7.5h-18" />
        </svg>
      ),
      title: 'Easy Exchange',
      description: 'Hassle-free exchanges within 30 days.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '7 Days Return',
      description: 'Shop with confidence. Money back guarantee.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Premium Support',
      description: 'Dedicated assistance for our valued clients.'
    }
  ];

  return (
    <div className="py-24 border-t border-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {policies.map((policy, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-[#8B1538]/5 hover:to-[#D4AF37]/5 transition-all duration-300 group border-2 border-transparent hover:border-[#8B1538]/10">
              <div className='mb-6 group-hover:scale-110 transition-transform duration-300'>
                {policy.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{policy.title}</h3>
              <p className="text-gray-600">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => (
  <div className='py-32 bg-gradient-to-br from-[#8B1538] via-[#6B0F1A] to-[#4A0D12] relative overflow-hidden'>
    {/* Animated Orbs */}
    <div className='absolute inset-0 opacity-20'>
      <div className='absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-float'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-[#F4E4C1] rounded-full blur-3xl animate-float-delayed'></div>
    </div>

    <div className='relative max-w-4xl mx-auto text-center px-4 sm:px-6'>
      <svg className='w-16 h-16 text-[#D4AF37] mx-auto mb-8 animate-pulse' fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
      </svg>
      <h2 className='font-serif text-3xl md:text-4xl text-white mb-8 leading-relaxed'>
        "The craftsmanship of RedBuddha Jwells is simply unmatched. I felt like royalty wearing their necklace to my gala."
      </h2>
      <p className='text-sm tracking-widest uppercase font-bold text-[#D4AF37]'>— Sarah Jenkins</p>
    </div>
  </div>
)

// --- Main Page Component ---

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
      <Hero />
      <ShopByCategory />
      <LatestCollection />
      <CustomerTestimonials />
      <OurPolicy />


      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-delayed {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up-delayed {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes gradient-text {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(139, 21, 56, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }
        .animate-slide-in-delayed {
          animation: slide-in-delayed 1s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.4s forwards;
          opacity: 0;
        }
        .animate-fade-in-up-delayed {
          animation: fade-in-up-delayed 1s ease-out 0.6s forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-gradient-text {
          animation: gradient-text 5s ease infinite;
        }
        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  )
}

export default Home
