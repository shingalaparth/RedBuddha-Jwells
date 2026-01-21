
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Title from '../../components/Title';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Order = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderdata, setorderdata] = useState([]);
  const [loading, setLoading] = useState(true);

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
              date: order.date
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

  useEffect(() => {
    loadorderdata();
  }, [token]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
    </div>
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]'>
      <div className='mb-10'>
        <Title title1={'MY'} title2={'ORDERS'} />
        <p className="text-gray-500 mt-2 text-sm tracking-wide">Track your recent purchases and returns.</p>
      </div>

      {orderdata.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Orders Yet</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">Looks like you haven't placed any orders yet. Discover our latest collection today.</p>
          <Link to="/collection" className="px-8 py-3 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-black transition-colors rounded-sm shadow-sm hover:shadow-md">
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div className='space-y-4'>
          {orderdata.map((item, index) => (
            <div key={index} className="group bg-white border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 rounded-lg flex flex-col md:flex-row gap-6">

              {/* Product Image */}
              <div className="w-full md:w-32 h-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 border border-gray-100">
                <img src={item.images?.[0] || ""} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Product Details */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-lg font-semibold text-gray-900">{currency}{item.price}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="bg-gray-100 px-2.5 py-0.5 rounded text-xs font-medium text-gray-700">Size: {item.size}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Ordered on {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0 mt-2 md:mt-0">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                  <span className="font-medium text-sm text-gray-700">{item.status}</span>
                </div>
                <button onClick={loadorderdata} className="w-full py-2.5 px-4 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors rounded-md text-center">
                  Track Order
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
