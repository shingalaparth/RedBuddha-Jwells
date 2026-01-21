
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Slidingbtn from '../components/Slidingbtn'; // Migrated Slidingbtn is not strictly required if we just inline or simplify. Let's see if we need it.
import { useOutletContext } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { currency } from '../../components/admin/AdminLayout';

const Orders = () => {
    const { token } = useOutletContext();
    const { backendURL } = useContext(ShopContext);

    const [orders, setorders] = useState([]);
    const [view, setview] = useState('orders');
    const [loading, setLoading] = useState(false);

    const fetchallorders = async () => {
        if (!token) return null;
        setLoading(true);
        try {
            const response = await axios.post(backendURL + '/api/order/list', {}, { headers: { token } })
            if (response.data.success) {
                setorders(response.data.orders.reverse()) // Show newest first
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const statushandler = async (e, orderid) => {
        try {
            const response = await axios.post(backendURL + '/api/order/status', { orderid, status: e.target.value }, { headers: { token } })
            if (response.data.success) {
                toast.success("Order status updated")
                await fetchallorders()
            }
        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        fetchallorders();
    }, [token])

    const statusColors = {
        'Order Placed': 'bg-blue-50 text-blue-700 border-blue-100',
        'Packing': 'bg-purple-50 text-purple-700 border-purple-100',
        'Shipped': 'bg-yellow-50 text-yellow-700 border-yellow-100',
        'Out for Delivery': 'bg-orange-50 text-orange-700 border-orange-100',
        'Delivered': 'bg-green-50 text-green-700 border-green-100',
        'Cancelled': 'bg-red-50 text-red-700 border-red-100'
    }

    // Simplified Sliding Button since I don't want to migrate a separate component for just this
    const Slidingbtn = ({ view, setview }) => (
        <div className="flex bg-gray-200 rounded-lg p-1 relative">
            {['orders', 'delivered', 'cancelled', 'all'].map((v) => (
                <button
                    key={v}
                    onClick={() => setview(v)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all z-10 capitalize ${view === v ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    {v}
                </button>
            ))}
        </div>
    )


    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                        <p className="text-gray-500 mt-2">Track and manage customer orders</p>
                    </div>
                    <Slidingbtn view={view} setview={setview} />
                </div>

                <div className="space-y-6">
                    {orders.map((order, index) =>
                        order.items.length > 0 && ((view === 'delivered' && order.status === 'Delivered') || (view === 'cancelled' && order.status === 'Cancelled') || (view === 'orders' && order.status !== 'Delivered' && order.status !== 'Cancelled') || (view === 'all')) && (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">

                                {/* Order Header */}
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                                            <span className="font-mono text-sm font-bold text-gray-600">#{order._id.slice(-6).toUpperCase()}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(order.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                            {order.status}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${order.payment ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                            {order.payment ? 'Paid' : 'Pending Payment'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

                                    {/* Items Section */}
                                    <div className="lg:col-span-6 space-y-4">
                                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Order Items</h4>
                                        <div className="bg-gray-50 rounded-lg p-1 space-y-1">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex gap-4 p-3 bg-white rounded-md border border-gray-100 shadow-sm">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                                                        <img src={item.images?.[0] || 'uploadarea.png'} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-grow flex justify-between">
                                                        <div>
                                                            <p className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">Size: <span className="font-medium">{item.size}</span></p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-bold text-gray-900">x{item.quantity}</p>
                                                            <p className="text-xs text-gray-500">{currency}{item.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-sm text-gray-500">{order.items.length} Items</span>
                                            <span className="text-lg font-bold text-gray-900">Total: {currency}{order.amount}</span>
                                        </div>
                                    </div>

                                    {/* Customer & Shipping */}
                                    <div className="lg:col-span-3 space-y-4 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-8 pt-6 lg:pt-0">
                                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Customer Details</h4>
                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <p className="text-gray-500 text-xs mb-0.5">Name</p>
                                                <p className="font-medium text-gray-900">{order.address.firstname} {order.address.lastname}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs mb-0.5">Contact</p>
                                                <p className="font-medium text-gray-900">{order.address.phone}</p>
                                                <p className="text-gray-600 truncate">{order.address.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs mb-0.5">Payment Method</p>
                                                <p className="font-medium text-gray-900">{order.paymentmethod}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery Details */}
                                    <div className="lg:col-span-3 space-y-4 pt-6 lg:pt-0">
                                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Delivery Address</h4>
                                        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-gray-700 leading-relaxed">
                                            <p className="font-medium text-gray-900">{order.address.street}</p>
                                            <p>{order.address.city}, {order.address.state}</p>
                                            <p>{order.address.country} - {order.address.zipcode}</p>
                                        </div>

                                        <div className="pt-2">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Update Status</label>
                                            <select onChange={(e) => statushandler(e, order._id)} value={order.status} className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                                <option value="Order Placed">Order Placed</option>
                                                <option value="Packing">Packing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Out for Delivery">Out for Delivery</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    )}

                    {orders.length === 0 && !loading && (
                        <div className="text-center py-20 text-gray-400">
                            <p>No orders found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Orders
