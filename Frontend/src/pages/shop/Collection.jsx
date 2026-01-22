import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../../context/ShopContext'
import Title from '../../components/Title';
import ProductItem from '../../components/ProductItem';
import Searchbar from '../../components/Searchbar';

const Collection = () => {
  const { products, backendURL } = useContext(ShopContext);
  const [visible, setvisible] = useState(false);
  const [filterproducts, setfilterproducts] = useState([]);
  const [sorttype, setsorttype] = useState("relavent");
  const [productRatings, setProductRatings] = useState({});
  const { searchTerm, setSearchTerm, showsearch, setshowsearch, setcategory, category, setsubCategory, subCategory, togglecategory, togglesubCategory } = useContext(ShopContext);

  // Fetch all product ratings
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

  useEffect(() => {
    fetchRatings();
  }, []);

  const applyfilters = () => {
    let copyproduct = products.slice();

    if (searchTerm && showsearch) {
      copyproduct = copyproduct.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (category.length > 0) {
      copyproduct = copyproduct.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      copyproduct = copyproduct.filter(item => subCategory.includes(item.subCategory));
    }
    setfilterproducts(copyproduct);
  }

  const sortproduct = () => {
    setfilterproducts(prev => {
      let copyproduct = [...prev];
      if (sorttype === "low-high") {
        copyproduct.sort((a, b) => a.price - b.price);
      } else if (sorttype === "high-low") {
        copyproduct.sort((a, b) => b.price - a.price);
      }
      return copyproduct;
    });
  };

  const clearAllFilters = () => {
    setcategory([]);
    setsubCategory([]);
    setSearchTerm('');
  }

  const hasActiveFilters = category.length > 0 || subCategory.length > 0;

  useEffect(() => {
    setfilterproducts(products);
  }, [products])

  useEffect(() => {
    applyfilters()
  }, [category, subCategory, searchTerm, products])

  useEffect(() => {
    sortproduct()
  }, [sorttype, category, subCategory])

  return (
    <div className='min-h-screen bg-[#FDFBF7]'>
      <div className='w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8'>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filter Sidebar */}
          <aside className='lg:w-64 lg:flex-shrink-0'>
            {/* Mobile Filter Toggle */}
            <div className='lg:hidden mb-6'>
              <button
                onClick={() => setvisible(!visible)}
                className='w-full flex items-center justify-between px-5 py-3.5 bg-white border border-[#D4AF37]/30 rounded-xl shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-200'
              >
                <div className='flex items-center gap-3'>
                  <div className='p-1.5 bg-[#F4E4C1]/30 rounded-lg'>
                    <svg className="w-4 h-4 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <span className='font-bold text-gray-900'>Filters</span>
                  {hasActiveFilters && (
                    <span className='px-2.5 py-1 bg-[#8B1538] text-white text-xs font-bold rounded-full shadow-sm'>
                      {category.length + subCategory.length}
                    </span>
                  )}
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${visible ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Filter Content */}
            <div className={`lg:block ${visible ? 'block' : 'hidden'}`}>
              <div className='bg-white rounded-2xl shadow-sm border border-[#D4AF37]/20 overflow-hidden lg:sticky lg:top-24'>
                {/* Filter Header */}
                <div className='px-5 py-4 border-b border-gray-100 bg-[#FDFBF7]'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-bold text-[#8B1538] uppercase tracking-wider flex items-center gap-2'>
                      Filters
                    </h3>
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className='text-[10px] font-bold text-[#8B1538] hover:underline uppercase tracking-wide'
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Filters */}
                <div className='px-5 py-5 border-b border-gray-100'>
                  <h4 className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-4'>
                    Categories
                  </h4>
                  <div className='space-y-2'>
                    {['Rings', 'Necklace', 'Bangles', 'Mangalsutra', 'Bracelet', 'Earrings', 'Sets'].map((cat) => (
                      <label key={cat} className='flex items-center gap-3 cursor-pointer group hover:bg-[#FDFBF7] -mx-2 px-2 py-1.5 rounded-lg transition-colors'>
                        <div className='relative flex items-center'>
                          <input
                            type="checkbox"
                            checked={category.includes(cat)}
                            onChange={() => togglecategory(cat)}
                            className='peer sr-only'
                          />
                          <div className='w-4 h-4 border border-gray-300 rounded peer-checked:border-[#8B1538] peer-checked:bg-[#8B1538] transition-all duration-200 flex items-center justify-center'>
                            <svg className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className={`text-sm transition-colors ${category.includes(cat) ? 'text-[#8B1538] font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type/Material Filters */}
                <div className='px-5 py-5'>
                  <h4 className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-4'>
                    Material Type
                  </h4>
                  <div className='space-y-2'>
                    {[
                      { value: 'Antitarnish', label: 'Anti-Tarnish' },
                      { value: 'Americand', label: 'American Diamond' },
                      { value: 'Rajwadi', label: 'Rajwadi' }
                    ].map((type) => (
                      <label key={type.value} className='flex items-center gap-3 cursor-pointer group hover:bg-[#FDFBF7] -mx-2 px-2 py-1.5 rounded-lg transition-colors'>
                        <div className='relative flex items-center'>
                          <input
                            type="checkbox"
                            checked={subCategory.includes(type.value)}
                            onChange={() => togglesubCategory(type.value)}
                            className='peer sr-only'
                          />
                          <div className='w-4 h-4 border border-gray-300 rounded peer-checked:border-[#8B1538] peer-checked:bg-[#8B1538] transition-all duration-200 flex items-center justify-center'>
                            <svg className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className={`text-sm transition-colors ${subCategory.includes(type.value) ? 'text-[#8B1538] font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <main className='flex-1 min-w-0'>
            {/* Header with Sort */}
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-[#D4AF37]/20'>
              <div className="text-center sm:text-left">
                <Title title1={'EXPLORE'} title2={'COLLECTION'} />
                <p className='text-xs text-gray-400 mt-1 uppercase tracking-widest font-medium'>
                  {filterproducts.length} Items Found
                </p>
              </div>

              {/* Premium Sort Dropdown */}
              <div className='relative'>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sort:</span>
                  <div className="relative">
                    <select
                      onChange={(e) => setsorttype(e.target.value)}
                      value={sorttype}
                      className='appearance-none pl-4 pr-10 py-2 bg-white border-2 border-[#8B1538]/20 rounded-lg text-sm font-semibold text-[#8B1538] hover:border-[#8B1538]/50 focus:outline-none focus:ring-2 focus:ring-[#8B1538]/20 focus:border-[#8B1538] transition-all cursor-pointer shadow-sm w-48'
                    >
                      <option value="relavent">Relevant</option>
                      <option value="low-high">Price: Low to High</option>
                      <option value="high-low">Price: High to Low</option>
                    </select>
                    {/* Custom Chevron */}
                    <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                      <svg className="w-4 h-4 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Chips */}
            {hasActiveFilters && (
              <div className='flex flex-wrap items-center gap-2 mb-8'>
                {category.map(cat => (
                  <button
                    key={cat}
                    onClick={() => togglecategory(cat)}
                    className='px-4 py-1.5 bg-white border-2 border-[#8B1538]/30 rounded-full text-xs font-bold text-[#8B1538] hover:bg-[#8B1538] hover:text-white hover:border-[#8B1538] transition-all flex items-center gap-2 group shadow-sm'
                  >
                    {cat}
                    <svg className="w-3.5 h-3.5 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
                {subCategory.map(sub => (
                  <button
                    key={sub}
                    onClick={() => togglesubCategory(sub)}
                    className='px-4 py-1.5 bg-white border-2 border-[#8B1538]/30 rounded-full text-xs font-bold text-[#8B1538] hover:bg-[#8B1538] hover:text-white hover:border-[#8B1538] transition-all flex items-center gap-2 group shadow-sm'
                  >
                    {sub === 'Antitarnish' ? 'Anti-Tarnish' : sub === 'Americand' ? 'American Diamond' : sub}
                    <svg className="w-3.5 h-3.5 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
                {/* Clear All Button - Now Highly Visible */}
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-1.5 bg-[#8B1538] text-white text-xs font-bold rounded-full hover:bg-[#6B0F1A] transition-all flex items-center gap-1.5 shadow-md ml-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid - Increased Columns for Smaller Size */}
            {filterproducts.length > 0 ? (
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {filterproducts.map((item, index) => (
                  <div
                    key={index}
                    className='group animate-fadeIn'
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductItem
                      name={item.name}
                      id={item._id}
                      price={item.price}
                      image={item.images[0]}
                      rating={productRatings[item._id]?.averageRating || 0}
                      reviewCount={productRatings[item._id]?.reviewCount || 0}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-24 px-4 text-center'>
                <div className='w-20 h-20 bg-[#F4E4C1]/30 rounded-full flex items-center justify-center mb-4'>
                  <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>No gems found</h3>
                <p className='text-gray-500 mb-6 max-w-xs mx-auto text-sm'>
                  Try adjusting your filters to uncover more treasures.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className='px-6 py-2.5 bg-[#8B1538] text-white rounded-lg font-medium text-sm hover:bg-[#6B0F1A] transition-colors shadow-lg shadow-[#8B1538]/20'
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default Collection
