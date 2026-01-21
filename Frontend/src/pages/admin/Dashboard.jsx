
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext';
import { currency } from '../../components/admin/AdminLayout';

const Dashboard = () => {
    const { token } = useOutletContext();
    const { backendURL } = useContext(ShopContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        deliveredOrders: 0
    })
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (token) {
            fetchStats()
        }
    }, [token])

    const fetchStats = async () => {
        try {
            setLoading(true)
            // Fetch Orders
            const orderResponse = await axios.post(backendURL + '/api/order/list', {}, { headers: { token } })
            let orders = []
            if (orderResponse.data.success) {
                orders = orderResponse.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date))
                setRecentOrders(orders.slice(0, 5)); // Get top 5 recent
            }

            // Fetch Products
            const productResponse = await axios.get(backendURL + '/api/product/list')
            let products = []
            if (productResponse.data.success) {
                products = productResponse.data.products
            }

            // Calculate Stats
            const totalOrders = orders.length
            const totalProducts = products.length
            const totalRevenue = orders.reduce((acc, order) => {
                return order.payment ? acc + order.amount : acc
            }, 0)
            const pendingOrders = orders.filter(order => order.status === 'Order Placed' || order.status === 'Packing' || order.status === 'Shipped' || order.status === 'Out for Delivery').length
            const deliveredOrders = orders.filter(order => order.status === 'Delivered').length


            setStats({
                totalOrders,
                totalProducts,
                totalRevenue,
                pendingOrders,
                deliveredOrders
            })

        } catch (error) {
            console.error(error)
            toast.error("Failed to fetch dashboard data")
        } finally {
            setLoading(false)
        }
    }

    const StatCard = ({ title, value, icon, gradient, textColor, borderColor }) => (
        <div className={`bg-white p-6 rounded-2xl border ${borderColor} shadow-sm hover:shadow-lg transition-all duration-300 group`}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform origin-left">{value}</h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">{title}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform`}>
                    {icon}
                </div>
            </div>
            <div className={`mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden`}>
                <div className={`h-full ${textColor.replace('text', 'bg')} w-2/3 rounded-full opacity-50 group-hover:w-full transition-all duration-500`}></div>
            </div>
        </div>
    )

    const statusStyles = {
        'Order Placed': 'bg-blue-50 text-blue-700 ring-blue-600/20',
        'Packing': 'bg-purple-50 text-purple-700 ring-purple-600/20',
        'Shipped': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        'Out for Delivery': 'bg-orange-50 text-orange-700 ring-orange-600/20',
        'Delivered': 'bg-green-50 text-green-700 ring-green-600/20',
        'Cancelled': 'bg-red-50 text-red-700 ring-red-600/20'
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                        <p className="text-gray-500 mt-2">Welcome back, Admin. Here's what's happening today.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={fetchStats} className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                            <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Revenue"
                        value={`${currency}${stats.totalRevenue.toLocaleString()}`}
                        gradient="from-green-500 to-emerald-600"
                        textColor="text-emerald-500"
                        borderColor="border-emerald-100"
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    />
                    <StatCard
                        title="Active Orders"
                        value={stats.pendingOrders}
                        gradient="from-blue-500 to-indigo-600"
                        textColor="text-blue-500"
                        borderColor="border-blue-100"
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    />
                    <StatCard
                        title="Products In Stock"
                        value={stats.totalProducts}
                        gradient="from-purple-500 to-pink-600"
                        textColor="text-purple-500"
                        borderColor="border-purple-100"
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                    />
                    <StatCard
                        title="Total Orders"
                        value={stats.totalOrders}
                        gradient="from-orange-400 to-red-500"
                        textColor="text-orange-500"
                        borderColor="border-orange-100"
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                    />
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                            <p className="text-sm text-gray-500">Latest orders from your store</p>
                        </div>
                        <button onClick={() => navigate('/admin/orders')} className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                            View All Orders
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order, index) => (
                                        <tr key={index} className="hover:bg-gray-50/80 transition-colors cursor-pointer" onClick={() => navigate('/admin/orders')}>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-700">
                                                        {order.address.firstname[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">{order.address.firstname} {order.address.lastname}</p>
                                                        <p className="text-xs text-gray-400">{order.address.city}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 text-sm">
                                                {currency}{order.amount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${statusStyles[order.status] || 'bg-gray-50 text-gray-600 ring-gray-600/20'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[order.status]?.replace('bg-', 'bg-').replace('text-', 'bg-').split(' ')[1] || 'bg-gray-400'}`}></span>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400 text-sm">
                                            No orders found yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
