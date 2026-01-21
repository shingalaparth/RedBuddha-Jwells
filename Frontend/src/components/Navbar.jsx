import React, { useContext, useRef, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const [open, setopen] = useState(false);
  const [scrolled, setscrolled] = useState(false);
  const { showsearch, setshowsearch, getcartcount, token, settoken, setcartitems } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Handle scroll for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setscrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setopen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const onsearch = () => {
    if (location.pathname != '/collection') {
      navigate('/collection')
    }
    setshowsearch(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    settoken('')
    setcartitems({})
    navigate('/login')
  }

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/98 backdrop-blur-md shadow-xl border-b border-[#8B1538]/10'
        : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
      }`}>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>

          {/* LEFT SECTION - Logo/Brand */}
          <div className='flex-shrink-0'>
            <NavLink to='/'>
              <div className="flex items-center space-x-3 cursor-pointer group relative">
                {/* Animated Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-red-100/30 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-full"></div>

                {/* Premium Gem Badge */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 border-2 border-[#880e4f]/20 rounded-full group-hover:border-[#880e4f]/50 transition-colors duration-500"></div>

                  {/* Gem Center (Ruby/Red Theme) */}
                  <div className="relative w-6 h-6 transform rotate-45 transition-transform duration-700 group-hover:rotate-180">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#880e4f] via-[#c2185b] to-[#4a0000] shadow-inner rounded-sm"></div>
                    <div className="absolute inset-0 border border-white/20 rounded-sm"></div>

                    {/* Facets */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30"></div>

                    {/* Center Sparkle */}
                    <div className="absolute inset-2 bg-gradient-to-br from-white via-transparent to-transparent opacity-40 rounded-full animate-pulse"></div>
                  </div>

                  {/* Orbiting Particle */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff8f00] rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Brand Name */}
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold bg-gradient-to-r from-[#8B1538] to-[#6B0F1A] bg-clip-text text-transparent group-hover:from-[#6B0F1A] group-hover:to-[#8B1538] transition-all">
                    RedBuddha
                  </span>
                  <span className="text-xs font-bold tracking-[0.3em] text-[#D4AF37]">
                    JWELLS
                  </span>
                </div>
              </div>
            </NavLink>
          </div>

          {/* CENTER SECTION - Navigation Links (Desktop) */}
          <nav className='hidden lg:flex items-center gap-1'>
            {[
              { to: '/', label: 'Home' },
              { to: '/collection', label: 'Collection' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' }
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) => `
                  relative px-6 py-2 text-sm font-bold tracking-wide transition-all duration-200
                  ${isActive
                    ? 'text-[#8B1538]'
                    : 'text-gray-700 hover:text-[#8B1538]'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label.toUpperCase()}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-sm shadow-[#D4AF37]"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8B1538]/5 to-[#D4AF37]/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200 -z-0"></div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT SECTION - Icons */}
          <div className='flex items-center gap-2'>
            {/* Search Button */}
            <button
              onClick={onsearch}
              className='p-2.5 hover:bg-gradient-to-br hover:from-[#8B1538]/10 hover:to-[#D4AF37]/10 rounded-xl transition-all duration-200 group'
              title="Search"
            >
              <svg className="w-5 h-5 text-gray-700 group-hover:text-[#8B1538] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Profile Icon with Dropdown */}
            <div ref={dropdownRef} className='relative'>
              <button
                onClick={() => token ? setopen(prev => !prev) : navigate('/login')}
                className='p-2.5 hover:bg-gradient-to-br hover:from-[#8B1538]/10 hover:to-[#D4AF37]/10 rounded-xl transition-all duration-200 group'
                title="Profile"
              >
                <svg className="w-5 h-5 text-gray-700 group-hover:text-[#8B1538] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {token && open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-[#8B1538]/10 py-2 animate-fadeIn overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#8B1538]/10 bg-gradient-to-r from-[#8B1538]/5 to-[#D4AF37]/5">
                    <p className="text-xs text-[#8B1538] font-bold tracking-wider">MY ACCOUNT</p>
                  </div>
                  <button
                    onClick={() => { navigate('/profile'); setopen(false); }}
                    className='flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-[#8B1538]/10 hover:to-[#D4AF37]/10 hover:text-[#8B1538] transition-all duration-200'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </button>
                  <button
                    onClick={() => { navigate('/order'); setopen(false); }}
                    className='flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-[#8B1538]/10 hover:to-[#D4AF37]/10 hover:text-[#8B1538] transition-all duration-200'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    My Orders
                  </button>
                  <div className="border-t border-[#8B1538]/10 mt-2 pt-2">
                    <button
                      onClick={() => { logout(); setopen(false); }}
                      className='flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200'
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon with Badge */}
            <NavLink to='/cart' className='relative p-2.5 hover:bg-gradient-to-br hover:from-[#8B1538]/10 hover:to-[#D4AF37]/10 rounded-xl transition-all duration-200 group'>
              <svg className="w-5 h-5 text-gray-700 group-hover:text-[#8B1538] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getcartcount() > 0 && (
                <div className='absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] text-white rounded-full text-[10px] flex justify-center items-center font-bold shadow-lg shadow-[#8B1538]/30'>
                  {getcartcount()}
                </div>
              )}
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setvisible(true)}
              className='lg:hidden p-2.5 hover:bg-gradient-to-br hover:from-[#8B1538]/10 hover:to-[#D4AF37]/10 rounded-xl transition-all duration-200 group'
            >
              <svg className="w-6 h-6 text-gray-700 group-hover:text-[#8B1538] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setvisible(false)}>
        <div
          className={`fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className='p-6 border-b-2 border-[#8B1538]/10 bg-gradient-to-br from-[#8B1538]/5 via-white to-[#D4AF37]/5'>
            <div className='flex items-center justify-between'>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-xl rotate-45 shadow-lg"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-black rounded-lg rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#D4AF37] rounded-sm rotate-45"></div>
                </div>
                <div>
                  <p className='text-sm font-bold bg-gradient-to-r from-[#8B1538] to-[#6B0F1A] bg-clip-text text-transparent'>RedBuddha</p>
                  <p className='text-xs font-bold text-[#D4AF37] tracking-widest'>JWELLS</p>
                </div>
              </div>
              <button onClick={() => setvisible(false)} className='p-2 hover:bg-[#8B1538]/10 rounded-xl transition-colors'>
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <nav className='p-4 space-y-2'>
            {[
              { to: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { to: '/collection', label: 'Collection', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
              { to: '/about', label: 'About Us', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { to: '/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
            ].map((item, index) => (
              <NavLink
                key={index}
                onClick={() => setvisible(false)}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-[#8B1538] to-[#6B0F1A] text-white shadow-lg shadow-[#8B1538]/30'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#8B1538]/10 hover:to-[#D4AF37]/10 hover:text-[#8B1538]'
                  }
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          {token && (
            <div className='absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#8B1538]/10 bg-gradient-to-r from-gray-50 to-[#8B1538]/5'>
              <button
                onClick={() => { logout(); setvisible(false); }}
                className='w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg'
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Navbar
