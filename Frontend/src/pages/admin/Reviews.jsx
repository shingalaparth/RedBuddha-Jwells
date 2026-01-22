import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useOutletContext } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import { currency } from '../../components/admin/AdminLayout'

const Reviews = () => {
    const { token } = useOutletContext()
    const { backendURL } = useContext(ShopContext)
    const [reviews, setReviews] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview') // overview, all

    useEffect(() => {
        if (token) {
            fetchData()
        }
    }, [token])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [reviewsRes, statsRes] = await Promise.all([
                axios.get(`${backendURL}/api/review/all`, { headers: { token } }),
                axios.get(`${backendURL}/api/review/stats`, { headers: { token } })
            ])
            if (reviewsRes.data.success) setReviews(reviewsRes.data.reviews)
            if (statsRes.data.success) setStats(statsRes.data.stats)
        } catch (error) {
            console.log(error)
            toast.error('Failed to fetch reviews')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return
        try {
            const response = await axios.delete(`${backendURL}/api/review/delete/${reviewId}`, { headers: { token } })
            if (response.data.success) {
                toast.success('Review deleted')
                fetchData()
            }
        } catch (error) {
            toast.error('Failed to delete review')
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    // Star component
    const Stars = ({ rating, size = 'w-4 h-4' }) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`${size} ${star <= rating ? 'text-[#D4AF37]' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    )

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#8B1538]" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-white shadow-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            Reviews Analytics
                        </h1>
                        <p className="text-gray-500 mt-2">Monitor and manage customer feedback</p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#8B1538] hover:border-[#8B1538]/30 transition-colors shadow-sm"
                    >
                        <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 bg-white rounded-xl p-1.5 border border-gray-200 w-fit">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'overview' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'all' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                        All Reviews ({reviews.length})
                    </button>
                </div>

                {activeTab === 'overview' && stats && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Total Reviews */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform origin-left">{stats.totalReviews}</h3>
                                        <p className="text-sm font-medium text-gray-500 mt-1">Total Reviews</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Average Rating */}
                            <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/20 shadow-sm hover:shadow-lg transition-all group">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform origin-left">{stats.averageRating}</h3>
                                        <p className="text-sm font-medium text-gray-500 mt-1">Avg. Rating</p>
                                        <div className="mt-2"><Stars rating={Math.round(stats.averageRating)} /></div>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* This Month */}
                            <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all group">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform origin-left">{stats.thisMonth?.count || 0}</h3>
                                        <p className="text-sm font-medium text-gray-500 mt-1">This Month</p>
                                        {stats.thisMonth?.avgRating > 0 && <p className="text-xs text-green-600 font-medium mt-1">Avg: {stats.thisMonth.avgRating}★</p>}
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* 5-Star Reviews */}
                            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-lg transition-all group">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform origin-left">{stats.ratingDistribution?.[5] || 0}</h3>
                                        <p className="text-sm font-medium text-gray-500 mt-1">5-Star Reviews</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Rating Distribution */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Rating Distribution</h3>
                                <div className="space-y-4">
                                    {[5, 4, 3, 2, 1].map((rating) => {
                                        const count = stats.ratingDistribution?.[rating] || 0
                                        const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0
                                        return (
                                            <div key={rating} className="flex items-center gap-4">
                                                <div className="flex items-center gap-1 w-16">
                                                    <span className="text-sm font-semibold text-gray-700">{rating}</span>
                                                    <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-700 ease-out"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            background: rating >= 4 ? 'linear-gradient(90deg, #22c55e, #10b981)' : rating === 3 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #ef4444, #dc2626)'
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600 w-12 text-right">{count}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Monthly Trend */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Trend</h3>
                                <div className="flex items-end gap-4 h-48">
                                    {stats.monthlyTrend?.map((month, idx) => {
                                        const maxCount = Math.max(...stats.monthlyTrend.map(m => m.count), 1)
                                        const heightPercent = (month.count / maxCount) * 100
                                        return (
                                            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                                <span className="text-xs font-medium text-gray-500">{month.count}</span>
                                                <div className="w-full flex items-end justify-center h-32">
                                                    <div
                                                        className="w-full max-w-12 rounded-t-lg transition-all duration-500 bg-gradient-to-t from-[#8B1538] to-[#D4AF37]"
                                                        style={{ height: `${Math.max(heightPercent, 5)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-gray-600">{month.month}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Top Rated Products */}
                        {stats.topProducts && stats.topProducts.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Top Rated Products</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                    {stats.topProducts.map((product, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <div className="w-12 h-12 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                                                {product.productImage && <img src={product.productImage} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{product.productName}</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <Stars rating={Math.round(product.avgRating)} size="w-3 h-3" />
                                                    <span className="text-xs text-gray-500">({product.reviewCount})</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'all' && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/80 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Review</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {reviews.length > 0 ? reviews.map((review) => (
                                        <tr key={review._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                                        {review.productImage && <img src={review.productImage} alt="" className="w-full h-full object-cover" />}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900 truncate max-w-32">{review.productName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B1538] to-[#D4AF37] flex items-center justify-center text-white text-xs font-bold">
                                                        {review.userName?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{review.userName}</p>
                                                        {review.verified && <span className="text-xs text-green-600">Verified</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4"><Stars rating={review.rating} /></td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-xs">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{review.title}</p>
                                                    <p className="text-xs text-gray-500 truncate">{review.comment}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{formatDate(review.createdAt)}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleDelete(review._id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-gray-400">No reviews yet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Reviews
