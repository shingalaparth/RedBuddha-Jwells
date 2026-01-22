import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../../context/ShopContext';
import Relatedproducts from '../../components/Relatedproducts';
import ReviewSection from '../../components/ReviewSection';

const Product = () => {
  const { productid } = useParams();
  const { products, currency, addtocart, backendURL } = useContext(ShopContext);
  const [productdata, setproductdata] = useState(false)
  const [images, setimage] = useState('');
  const [size, setsize] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [productRating, setProductRating] = useState({ averageRating: 0, reviewCount: 0 });
  const allsize = ['S', 'M', 'L', 'XL'];
  let isempty = true;

  // Try to find product in context first
  const fetchdata = async () => {
    if (products && products.length > 0) {
      const foundProduct = products.find((item) => item._id === productid);
      if (foundProduct) {
        setproductdata(foundProduct);
        setimage(foundProduct.images[0]);
        return;
      }
    }

    // Fallback: fetch from API if not found in context
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);
      if (response.data.success) {
        const foundProduct = response.data.products.find((item) => item._id === productid);
        if (foundProduct) {
          setproductdata(foundProduct);
          setimage(foundProduct.images[0]);
        } else {
          setNotFound(true);
        }
      }
    } catch (error) {
      console.log(error);
      setNotFound(true);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect(() => {
    fetchdata();
    // Fetch product rating
    const fetchRating = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/review/product/${productid}`);
        if (response.data.success) {
          setProductRating({
            averageRating: response.data.stats.averageRating,
            reviewCount: response.data.stats.totalReviews
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (productid) fetchRating();
  }, [productid, products])

  const getStockStatus = () => {
    if (!productdata) return null;
    const availableSizes = allsize.filter(s => productdata.quant[s] > 0);
    if (availableSizes.length === 0) return { status: 'out', text: 'Out of Stock', color: 'text-red-600 bg-red-50 border-red-200' };

    const totalStock = availableSizes.reduce((sum, s) => sum + productdata.quant[s], 0);
    if (totalStock <= 10) return { status: 'low', text: 'Low Stock', color: 'text-[#8B1538] bg-[#F4E4C1]/10 border-[#E8D5B7]' };
    return { status: 'in', text: 'In Stock', color: 'text-green-600 bg-green-50 border-green-200' };
  }

  const stockStatus = getStockStatus();

  return productdata ? (
    <div className='bg-gradient-to-b from-white via-gray-50 to-white min-h-screen py-8'>
      <div className='w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Product Main Section */}
        <div className='flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-lg overflow-hidden'>

          {/* Image Gallery */}
          <div className='lg:w-1/2 p-6 lg:p-8'>
            <div className='flex flex-col-reverse md:flex-row gap-4'>
              {/* Thumbnails */}
              <div className='flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px] pb-2 scrollbar-thin scrollbar-thumb-gray-300'>
                {productdata.images.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setimage(item)}
                    onMouseEnter={() => setimage(item)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${item === images
                      ? 'border-[#8B1538] shadow-md scale-105 ring-2 ring-[#8B1538]/20'
                      : 'border-gray-200 hover:border-[#D4AF37] opacity-80 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={item}
                      alt={`Product ${index + 1}`}
                      className='w-full h-full object-cover'
                    />
                    {/* Image number badge */}
                    <span className='absolute top-0.5 left-0.5 w-4 h-4 bg-black/50 text-white text-[10px] font-bold rounded flex items-center justify-center'>
                      {index + 1}
                    </span>
                  </button>
                ))}
              </div>

              {/* Image count indicator */}
              {productdata.images.length > 1 && (
                <div className='hidden md:block text-center mt-2'>
                  <span className='text-xs text-gray-500'>{productdata.images.length} images</span>
                </div>
              )}

              {/* Main Image */}
              <div className='flex-1 relative group'>
                <div
                  onClick={() => setShowImageModal(true)}
                  className='relative bg-gray-50 rounded-2xl overflow-hidden cursor-zoom-in aspect-square'
                >
                  <img
                    src={images}
                    alt={productdata.name}
                    className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-105'
                  />
                  {/* Zoom Hint */}
                  <div className='absolute bottom-4 right-4 px-3 py-2 bg-black/70 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Click to zoom
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className='lg:w-1/2 p-6 lg:p-8 flex flex-col'>
            {/* Product Title & Stock */}
            <div className='mb-6'>
              <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-3'>
                {productdata.name}
              </h1>

              {/* Stock Badge */}
              {stockStatus && (
                <div className='flex items-center gap-3 mb-4'>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-sm ${stockStatus.color}`}>
                    <span className='w-2 h-2 rounded-full bg-current animate-pulse'></span>
                    {stockStatus.text}
                  </span>
                  {productdata.bestseller && (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 font-semibold text-sm'>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Bestseller
                    </span>
                  )}
                </div>
              )}

              {/* Rating */}
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(productRating.averageRating) ? 'text-[#D4AF37]' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className='text-sm text-gray-600 font-medium'>
                  {productRating.averageRating > 0
                    ? `${productRating.averageRating} (${productRating.reviewCount} reviews)`
                    : 'No reviews yet'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className='mb-6 pb-6 border-b border-gray-200'>
              <div className='flex items-baseline gap-3'>
                <span className='text-4xl font-bold text-gray-900'>
                  {currency}{productdata.price.toLocaleString()}
                </span>
                <span className='text-sm text-gray-500 line-through'>
                  {currency}{(productdata.price * 1.2).toLocaleString()}
                </span>
                <span className='px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full'>
                  17% OFF
                </span>
              </div>
            </div>

            {/* Description */}
            <div className='mb-8'>
              <h3 className='text-sm font-bold text-gray-700 uppercase tracking-wide mb-3'>Description</h3>
              <p className='text-gray-600 leading-relaxed'>{productdata.description}</p>
            </div>

            {/* Size Selector */}
            <div className='mb-8'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-sm font-bold text-gray-700 uppercase tracking-wide'>Select Size</h3>
                <button className='text-sm text-[#8B1538] hover:text-[#6B0F1A] font-medium flex items-center gap-1'>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Size Guide
                </button>
              </div>
              <div className='grid grid-cols-4 gap-3'>
                {allsize.map((item, index) => {
                  const available = productdata.quant[item] > 0;
                  if (!available) return null;
                  isempty = false;
                  return (
                    <button
                      key={index}
                      onClick={() => setsize(item)}
                      disabled={!available}
                      className={`relative py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200 ${item === size
                        ? 'bg-black text-white shadow-lg scale-105'
                        : available
                          ? 'bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-400 hover:shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {item}
                      {item === size && (
                        <div className='absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center'>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {isempty && (
                <div className='mt-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-200'>
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className='font-medium'>Currently unavailable in all sizes</span>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addtocart(productdata._id, size)}
              disabled={isempty}
              className='w-full py-4 px-6 bg-black text-white rounded-xl font-bold text-base hover:bg-gray-800 active:scale-98 transition-all duration-200 shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 mb-4'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              ADD TO CART
            </button>

            {/* Trust Badges */}
            <div className='grid grid-cols-3 gap-4 pt-6 border-t border-gray-200'>
              <div className='text-center'>
                <div className='w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center'>
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className='text-xs font-semibold text-gray-700'>100% Authentic</p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <p className='text-xs font-semibold text-gray-700'>COD Available</p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 mx-auto mb-2 bg-[#F4E4C1]/30 rounded-full flex items-center justify-center'>
                  <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <p className='text-xs font-semibold text-gray-700'>7-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection productId={productid} />

        {/* Related Products */}
        <div className='mt-16' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Relatedproducts category={productdata.category} subcategory={productdata.subCategory} id={productdata._id} />
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div
          className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
          onClick={() => setShowImageModal(false)}
        >
          <button
            className='absolute top-4 right-4 text-white hover:text-gray-300 transition-colors'
            onClick={() => setShowImageModal(false)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={images}
            alt={productdata.name}
            className='max-w-full max-h-full object-contain'
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  ) : notFound ? (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='text-center p-8'>
        <div className='w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center'>
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Product Not Found</h2>
        <p className='text-gray-500 mb-6'>This product may have been removed or is no longer available.</p>
        <a href='/collection' className='px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all'>
          Browse Collection
        </a>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-black'></div>
    </div>
  )
}

export default Product
