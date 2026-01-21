import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Footer = () => {
  const { navigate, setcategory, setsubCategory, togglecategory } = useContext(ShopContext);

  const handleCategoryClick = (categoryName) => {
    setcategory([]);
    setsubCategory([]);
    togglecategory(categoryName);
    navigate('/collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-black to-gray-950 text-gray-300 overflow-hidden">
      {/* Decorative Elements */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-[#8B1538]/5 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-[#8B1538]/5 rounded-full blur-3xl'></div>

      {/* Main Footer Content */}
      <div className="relative max-w-[1600px] mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-3 mb-6 cursor-pointer group"
            >
              {/* Diamond Icon */}
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#8B1538] rounded-2xl rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-black rounded-xl rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#D4AF37] rounded-sm rotate-45 animate-pulse"></div>
              </div>

              {/* Brand Name */}
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-white tracking-tight">
                  RedBuddha
                </span>
                <span className="text-xs font-bold tracking-[0.3em] text-[#8B1538]">
                  JWELLS
                </span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Discover timeless elegance with our curated collection of fine jewellery. Each piece is crafted to perfection for your special moments.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-gray-500">Follow Us:</p>
              <a
                href="https://www.instagram.com/redbuddhajwells"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-gradient-to-br from-pink-500/10 to-purple-600/10 border-2 border-pink-500/20 rounded-xl hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#8B1538] to-[#8B1538] rounded-full"></span>
              Shop
            </h4>
            <ul className="space-y-3">
              {['All Collections', 'Rings', 'Necklace', 'Bracelet', 'Mangalsutra', 'Earrings'].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => item === 'All Collections'
                      ? (() => { setcategory([]); setsubCategory([]); navigate('/collection'); window.scrollTo({ top: 0, behavior: 'smooth' }); })()
                      : handleCategoryClick(item)
                    }
                    className="group flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-all duration-200"
                  >
                    <span className="w-0 h-0.5 bg-[#8B1538] group-hover:w-4 transition-all duration-300"></span>
                    <span className="text-sm font-medium">{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#8B1538] to-[#8B1538] rounded-full"></span>
              Materials
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'American Diamond', value: 'Americand' },
                { name: 'Anti-Tarnish', value: 'Antitarnish' },
                { name: 'Rajwadi Brass', value: 'Rajwadi' }
              ].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleCategoryClick(item.value)}
                    className="group flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-all duration-200"
                  >
                    <span className="w-0 h-0.5 bg-[#8B1538] group-hover:w-4 transition-all duration-300"></span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#8B1538] to-[#8B1538] rounded-full"></span>
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms of Service', path: '#' }
              ].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="group flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-all duration-200"
                  >
                    <span className="w-0 h-0.5 bg-[#8B1538] group-hover:w-4 transition-all duration-300"></span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-black/50 border-t border-gray-800/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-500">
              <span>© {new Date().getFullYear()} <span className="text-[#8B1538] font-semibold">RedBuddha Jwells</span></span>
              <span className="hidden sm:block">•</span>
              <span>All rights reserved</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>Designed with ❤️ by <span className="text-[#D4AF37]/80 font-medium">Nandani & Team</span></span>
              <span>•</span>
              <a
                href="mailto:nandanichauhan07@gmail.com"
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Dev
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;