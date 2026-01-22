import React, { useState } from 'react'

const ReviewForm = ({ onSubmit, onCancel, isSubmitting }) => {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [title, setTitle] = useState('')
    const [comment, setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (rating === 0) {
            alert('Please select a rating')
            return
        }
        if (!title.trim() || !comment.trim()) {
            alert('Please fill in all fields')
            return
        }
        onSubmit({ rating, title, comment })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#FDFBF7] to-[#F4E4C1]/20 rounded-2xl p-6 border border-[#D4AF37]/20 shadow-lg">
            <h3 className="text-xl font-bold text-[#8B1538] mb-6 flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Write Your Review
            </h3>

            {/* Star Rating */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Your Rating *</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="transition-transform hover:scale-110 focus:outline-none"
                        >
                            <svg
                                className={`w-10 h-10 transition-colors ${star <= (hoverRating || rating)
                                        ? 'text-[#D4AF37] drop-shadow-md'
                                        : 'text-gray-300'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </button>
                    ))}
                </div>
                {rating > 0 && (
                    <p className="mt-2 text-sm text-[#8B1538] font-medium">
                        {rating === 1 && 'Poor'}
                        {rating === 2 && 'Fair'}
                        {rating === 3 && 'Good'}
                        {rating === 4 && 'Very Good'}
                        {rating === 5 && 'Excellent'}
                    </p>
                )}
            </div>

            {/* Title */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Review Title *</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summarize your experience..."
                    maxLength={100}
                    className="w-full px-4 py-3 border-2 border-[#D4AF37]/30 rounded-xl focus:border-[#8B1538] focus:ring-2 focus:ring-[#8B1538]/20 outline-none transition-all bg-white"
                />
            </div>

            {/* Comment */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review *</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    maxLength={1000}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-[#D4AF37]/30 rounded-xl focus:border-[#8B1538] focus:ring-2 focus:ring-[#8B1538]/20 outline-none transition-all bg-white resize-none"
                />
                <p className="text-xs text-gray-500 mt-1 text-right">{comment.length}/1000</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-[#8B1538] to-[#6B0F2A] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Submit Review
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default ReviewForm
