import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Title from '../../components/Title';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Order = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderdata, setorderdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewedProducts, setReviewedProducts] = useState([]);
  const navigate = useNavigate();

  const loadorderdata = async () => {
    try {
      if (!token) return;
      setLoading(true);
      const response = await axios.post(
        backendURL + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let orderitem = [];
        response.data.orders.forEach(order => {
          (order.items || []).forEach(item => {
            orderitem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentmethod: order.paymentmethod,
              date: order.date,
              orderId: order._id
            });
          });
        });
        setorderdata(orderitem.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products user has already reviewed
  const loadReviewedProducts = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendURL + '/api/review/user-reviewed',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setReviewedProducts(response.data.reviewedProductIds || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadorderdata();
    loadReviewedProducts();
  }, [token]);

  const getStatusColor = (status) => {
    const statusColors = {
      'Order Placed': 'bg-blue-100 text-blue-700 border-blue-200',
      'Packing': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Shipped': 'bg-purple-100 text-purple-700 border-purple-200',
      'Out for delivery': 'bg-orange-100 text-orange-700 border-orange-200',
      'Delivered': 'bg-green-100 text-green-700 border-green-200'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusDot = (status) => {
    const dotColors = {
      'Order Placed': 'bg-blue-500',
      'Packing': 'bg-yellow-500',
      'Shipped': 'bg-purple-500',
      'Out for delivery': 'bg-orange-500',
      'Delivered': 'bg-green-500'
    };
    return dotColors[status] || 'bg-gray-500';
  };

  // Check if product has been reviewed
  const hasReviewed = (productId) => {
    return reviewedProducts.includes(productId);
  };

  // Handle write review click - navigate with state to open review form
  const handleWriteReview = (productId) => {
    navigate(`/product/${productId}`, { state: { openReviewForm: true } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#8B1538] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-12'>
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6'>
        {/* Header */}
        <div className='mb-12'>
          <Title title1={'MY'} title2={'ORDERS'} />
          <p className="text-gray-500 mt-2 text-base">Track and manage your jewelry purchases</p>
        </div>

        {orderdata.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-gray-100 shadow-lg">
            <div className="w-32 h-32 bg-gradient-to-br from-[#F4E4C1]/30 to-[#E8D5B7] rounded-full flex items-center justify-center mb-6">
              <svg className="w-16 h-16 text-[#8B1538]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Orders Yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-center">
              Looks like you haven't placed any orders yet. Discover our exquisite collection of handcrafted jewelry.
            </p>
            <Link
              to="/collection"
              className="px-10 py-4 bg-gradient-to-r from-black to-gray-800 text-white font-bold rounded-xl hover:from-gray-800 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              START SHOPPING
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className='space-y-6'>
            {orderdata.map((item, index) => {
              const isDelivered = item.status === 'Delivered';
              const alreadyReviewed = hasReviewed(item._id);

              return (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#D4AF37]/70 hover:shadow-xl transition-all duration-300"
                >
                  <div className='flex flex-col lg:flex-row gap-6'>

                    {/* Product Image */}
                    <div className="w-full lg:w-40 h-40 flex-shrink-0">
                      <div className="w-full h-full overflow-hidden rounded-xl bg-gray-50 border-2 border-gray-100">
                        <img
                          src={item.images?.[0] || ""}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="px-3 py-1.5 bg-[#F4E4C1]/30 border border-[#D4AF37]/70 rounded-lg text-sm font-bold text-[#6B0F1A]">
                                Size: {item.size}
                              </span>
                              <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-sm font-bold text-gray-700">
                                Qty: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{currency}{item.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-500 mt-1">Total: {currency}{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Ordered on {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t-2 border-gray-100">
                        {/* Status */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className={`w-3 h-3 rounded-full ${getStatusDot(item.status)} animate-pulse`}></div>
                          <span className={`px-4 py-2 rounded-xl border-2 font-bold text-sm ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          {item.payment && (
                            <span className="px-4 py-2 rounded-xl border-2 border-green-200 bg-green-50 text-green-700 font-bold text-sm">
                              ✓ Paid
                            </span>
                          )}
                          {/* Review Status Badge */}
                          {isDelivered && alreadyReviewed && (
                            <span className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#8B1538] font-semibold text-xs flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Reviewed
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                          {/* View Product Button */}
                          <Link
                            to={`/product/${item._id}`}
                            className="px-5 py-2.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Product
                          </Link>

                          {/* Write Review Button - Only for delivered and not yet reviewed */}
                          {isDelivered && !alreadyReviewed && (
                            <button
                              onClick={() => handleWriteReview(item._id)}
                              className="px-5 py-2.5 bg-gradient-to-r from-[#8B1538] to-[#6B0F2A] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

