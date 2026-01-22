import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import ReviewForm from './ReviewForm'
import ReviewCard from './ReviewCard'
import { toast } from 'react-toastify'

const ReviewSection = ({ productId }) => {
    const { backendURL, token } = useContext(ShopContext)
    const location = useLocation()
    const reviewSectionRef = useRef(null)
    const [reviews, setReviews] = useState([])
    const [stats, setStats] = useState({ totalReviews: 0, averageRating: 0, ratingDistribution: {} })
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [canReview, setCanReview] = useState(false)
    const [reviewReason, setReviewReason] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch reviews
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/review/product/${productId}`)
            if (response.data.success) {
                setReviews(response.data.reviews)
                setStats(response.data.stats)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // Check if user can review
    const checkCanReview = async () => {
        if (!token) return
        try {
            const response = await axios.post(
                `${backendURL}/api/review/can-review`,
                { productId },
                { headers: { token } }
            )
            if (response.data.success) {
                setCanReview(response.data.canReview)
                if (!response.data.canReview) {
                    setReviewReason(response.data.reason)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchReviews()
        checkCanReview()
    }, [productId, token])

    // Auto-open review form when navigating from Order page
    useEffect(() => {
        if (location.state?.openReviewForm && canReview && !loading) {
            setShowForm(true)
            // Scroll to review section
            setTimeout(() => {
                reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }, [location.state, canReview, loading])

    // Submit review
    const handleSubmitReview = async (reviewData) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post(
                `${backendURL}/api/review/add`,
                { productId, ...reviewData },
                { headers: { token } }
            )
            if (response.data.success) {
                toast.success('Review submitted successfully!')
                setShowForm(false)
                fetchReviews()
                setCanReview(false)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('Failed to submit review')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-[#8B1538]" />
            </div>
        )
    }

    return (
        <div ref={reviewSectionRef} className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mt-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        Customer Reviews
                        <span className="text-sm font-normal text-gray-500">({stats.totalReviews})</span>
                    </h2>
                </div>

                {/* Write Review Button */}
                {token && canReview && !showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 bg-gradient-to-r from-[#8B1538] to-[#6B0F2A] text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Write a Review
                    </button>
                )}
            </div>

            {/* Stats Section */}
            {stats.totalReviews > 0 && (
                <div className="flex flex-col lg:flex-row gap-8 mb-8 p-6 bg-gradient-to-br from-[#FDFBF7] to-[#F4E4C1]/20 rounded-xl border border-[#D4AF37]/20">
                    {/* Average Rating */}
                    <div className="text-center lg:text-left lg:pr-8 lg:border-r border-[#D4AF37]/20">
                        <div className="text-5xl font-bold text-[#8B1538]">{stats.averageRating}</div>
                        <div className="flex justify-center lg:justify-start mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-5 h-5 ${star <= Math.round(stats.averageRating) ? 'text-[#D4AF37]' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{stats.totalReviews} reviews</p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = stats.ratingDistribution[rating] || 0
                            const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0
                            return (
                                <div key={rating} className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-600 w-8">{rating}★</span>
                                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-500 w-8">{count}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Review Form */}
            {showForm && (
                <div className="mb-8">
                    <ReviewForm
                        onSubmit={handleSubmitReview}
                        onCancel={() => setShowForm(false)}
                        isSubmitting={isSubmitting}
                    />
                </div>
            )}

            {/* Login/Purchase Prompt */}
            {!token && (
                <div className="mb-8 p-4 bg-[#F4E4C1]/20 rounded-xl border border-[#D4AF37]/20 text-center">
                    <p className="text-gray-600">
                        <a href="/login" className="text-[#8B1538] font-semibold hover:underline">Sign in</a> to write a review
                    </p>
                </div>
            )}

            {token && !canReview && reviewReason === 'already_reviewed' && (
                <div className="mb-8 p-4 bg-green-50 rounded-xl border border-green-200 text-center">
                    <p className="text-green-700 font-medium flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        You've already reviewed this product
                    </p>
                </div>
            )}

            {/* Reviews List */}
            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 bg-[#F4E4C1]/30 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                    <p className="text-gray-500">Be the first to share your experience with this product!</p>
                </div>
            )}
        </div>
    )
}

export default ReviewSection
