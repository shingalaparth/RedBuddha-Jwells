import React, { useContext, useRef, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const [open, setopen] = useState(false);
  const { showsearch, setshowsearch, getcartcount, token, settoken, setcartitems } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

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
    <div className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm'>
      <div className='max-w-9xl mx-auto px-6 sm:px-8x lg:px-6'>
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

                {/* Typography */}
                <div className="relative">
                  <span className="text-2xl font-serif font-bold tracking-tighter flex flex-col leading-none">
                    <span className="relative">
                      <span className="text-gray-900 drop-shadow-sm">RED</span>
                      <span className="absolute inset-0 text-gray-900/0 bg-clip-text bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#880e4f] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        RED
                      </span>
                    </span>
                    <span className="relative text-sm tracking-[0.2em] font-sans -mt-1">
                      <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                        BUDDHA
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#880e4f] to-[#ff8f00] bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        BUDDHA
                      </span>
                    </span>
                  </span>
                </div>

                {/* Underline Indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-transparent via-[#880e4f] to-transparent transition-all duration-500"></div>
              </div>
            </NavLink>
          </div>

          {/* CENTER SECTION - Navigation Links (Desktop) */}
          <nav className='hidden md:flex items-center space-x-10 lg:space-x-12'>
            <NavLink
              to='/'
              className='relative group flex flex-col items-center gap-1 py-2 text-sm font-medium text-gray-700 hover:text-[#880e4f] transition-colors duration-200'
            >
              <span>HOME</span>
              <hr className='w-0 group-hover:w-full h-[2px] bg-[#880e4f] transition-all duration-300 absolute bottom-0' />
            </NavLink>

            <NavLink
              to='/collection'
              className='relative group flex flex-col items-center gap-1 py-2 text-sm font-medium text-gray-700 hover:text-[#880e4f] transition-colors duration-200'
            >
              <span>COLLECTION</span>
              <hr className='w-0 group-hover:w-full h-[2px] bg-[#880e4f] transition-all duration-300 absolute bottom-0' />
            </NavLink>

            <NavLink
              to='/about'
              className='relative group flex flex-col items-center gap-1 py-2 text-sm font-medium text-gray-700 hover:text-[#880e4f] transition-colors duration-200'
            >
              <span>ABOUT</span>
              <hr className='w-0 group-hover:w-full h-[2px] bg-[#880e4f] transition-all duration-300 absolute bottom-0' />
            </NavLink>

            <NavLink
              to='/contact'
              className='relative group flex flex-col items-center gap-1 py-2 text-sm font-medium text-gray-700 hover:text-[#880e4f] transition-colors duration-200'
            >
              <span>CONTACT</span>
              <hr className='w-0 group-hover:w-full h-[2px] bg-[#880e4f] transition-all duration-300 absolute bottom-0' />
            </NavLink>
          </nav>

          {/* RIGHT SECTION - Icons */}
          <div className='flex items-center space-x-6'>
            {/* Search Icon */}
            <button onClick={onsearch} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
              <img className='h-5 w-5' src="/icons/search.svg" alt="Search" />
            </button>

            {/* Profile Icon with Dropdown */}
            <div ref={dropdownRef} className='relative'>
              <button
                onClick={() => token ? setopen(prev => !prev) : navigate('/login')}
                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
              >
                <img className='h-5 w-5' src="/icons/profileicon.svg" alt="Profile" />
              </button>

              {token && (
                <div className={`absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 ${open ? 'block' : 'hidden'}`}>
                  <button
                    onClick={() => { navigate('/profile'); setopen(false); }}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#880e4f] transition-colors'
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => { navigate('/order'); setopen(false); }}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#880e4f] transition-colors'
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => { logout(); setopen(false); }}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#880e4f] transition-colors'
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>

            {/* Cart Icon with Badge */}
            <NavLink to='/cart' className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'>
              <img className='h-5 w-5' src="/icons/cart.svg" alt="Cart" />
              <div className='absolute -top-1 -right-1 h-5 w-5 bg-[#880e4f] text-white rounded-full text-[10px] flex justify-center items-center font-medium'>
                {getcartcount()}
              </div>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setvisible(true)}
              className='md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <img className='h-6 w-6' src="/icons/menu.svg" alt="Menu" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>Menu</h2>
          <button onClick={() => setvisible(false)} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <img className='h-6 w-6' src="/icons/back.svg" alt="Close" />
          </button>
        </div>

        <nav className='flex flex-col divide-y divide-gray-100'>
          <NavLink
            onClick={() => setvisible(false)}
            to='/'
            className='block px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-[#880e4f] transition-colors font-medium'
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            to='/collection'
            className='block px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-[#880e4f] transition-colors font-medium'
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            to='/about'
            className='block px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-[#880e4f] transition-colors font-medium'
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            to='/contact'
            className='block px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-[#880e4f] transition-colors font-medium'
          >
            CONTACT
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
