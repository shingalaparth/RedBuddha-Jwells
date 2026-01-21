import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const Searchbar = () => {
  const { searchTerm, setSearchTerm, showsearch, setshowsearch } = useContext(ShopContext);
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Logic handled via context/state mostly
    }
  };

  useEffect(() => {
    if (location.pathname !== 'collection' && location.pathname !== '/collection') {
      setshowsearch(false)
    }
  }, [location.pathname]);

  if (!showsearch) return null;

  return (
    <div className="border-t border-b border-[#D4AF37]/20 bg-[#FDFBF7] transition-all duration-300 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <form onSubmit={handleSearch} className="relative flex items-center justify-center">

          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search for exquisite jewelry..."
              className="w-full py-3 pl-12 pr-12 text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] transition-all duration-200 shadow-sm placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Clear/Close Icon */}
            <button
              type="button"
              onClick={() => { setSearchTerm(""); setshowsearch(false); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#8B1538] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </form>
      </div>
      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Searchbar;
