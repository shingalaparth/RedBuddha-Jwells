import reviewModel from '../models/reviewmodel.js'
import orderModel from '../models/ordermodel.js'
import userModel from '../models/usermodel.js'
import productModel from '../models/productmodel.js'

// Add a review (logged-in users only)
const addReview = async (req, res) => {
    try {
        const { userId, productId, rating, title, comment, images } = req.body

        // Check if user exists
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        // Check if user already reviewed this product
        const existingReview = await reviewModel.findOne({ productId, userId })
        if (existingReview) {
            return res.json({ success: false, message: 'You have already reviewed this product' })
        }

        // Check if user purchased this product (verified review)
        const orders = await orderModel.find({ userid: userId, status: 'Delivered' })
        let verified = false
        for (const order of orders) {
            const purchasedItem = order.items.find(item => item._id === productId)
            if (purchasedItem) {
                verified = true
                break
            }
        }

        // Create review
        const review = new reviewModel({
            productId,
            userId,
            userName: user.name || user.email.split('@')[0],
            rating: Number(rating),
            title,
            comment,
            images: images || [],
            verified
        })

        await review.save()
        res.json({ success: true, message: 'Review submitted successfully', review })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get reviews for a product (public)
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params
        const reviews = await reviewModel.find({ productId }).sort({ createdAt: -1 })

        // Calculate stats
        const totalReviews = reviews.length
        let averageRating = 0
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

        if (totalReviews > 0) {
            let sum = 0
            reviews.forEach(r => {
                sum += r.rating
                ratingDistribution[r.rating]++
            })
            averageRating = (sum / totalReviews).toFixed(1)
        }

        res.json({
            success: true,
            reviews,
            stats: {
                totalReviews,
                averageRating: Number(averageRating),
                ratingDistribution
            }
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get all reviews (Admin)
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({}).sort({ createdAt: -1 })

        // Get product details for each review
        const reviewsWithProduct = await Promise.all(
            reviews.map(async (review) => {
                const product = await productModel.findById(review.productId)
                return {
                    ...review.toObject(),
                    productName: product?.name || 'Unknown Product',
                    productImage: product?.images?.[0] || ''
                }
            })
        )

        res.json({ success: true, reviews: reviewsWithProduct })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Delete a review (Admin)
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params
        await reviewModel.findByIdAndDelete(reviewId)
        res.json({ success: true, message: 'Review deleted successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get review statistics (Admin)
const getReviewStats = async (req, res) => {
    try {
        const reviews = await reviewModel.find({})
        const totalReviews = reviews.length

        // Average rating
        let averageRating = 0
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        if (totalReviews > 0) {
            let sum = 0
            reviews.forEach(r => {
                sum += r.rating
                ratingDistribution[r.rating]++
            })
            averageRating = (sum / totalReviews).toFixed(1)
        }

        // Monthly trend (last 6 months)
        const monthlyTrend = []
        const now = new Date()
        for (let i = 5; i >= 0; i--) {
            const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59)
            const monthReviews = reviews.filter(r => {
                const date = new Date(r.createdAt)
                return date >= monthStart && date <= monthEnd
            })
            monthlyTrend.push({
                month: monthStart.toLocaleString('default', { month: 'short' }),
                count: monthReviews.length,
                avgRating: monthReviews.length > 0
                    ? (monthReviews.reduce((s, r) => s + r.rating, 0) / monthReviews.length).toFixed(1)
                    : 0
            })
        }

        // Top rated products
        const productRatings = {}
        reviews.forEach(r => {
            const pid = r.productId.toString()
            if (!productRatings[pid]) {
                productRatings[pid] = { total: 0, count: 0 }
            }
            productRatings[pid].total += r.rating
            productRatings[pid].count++
        })

        const topProducts = await Promise.all(
            Object.entries(productRatings)
                .map(([pid, data]) => ({
                    productId: pid,
                    avgRating: (data.total / data.count).toFixed(1),
                    reviewCount: data.count
                }))
                .sort((a, b) => b.avgRating - a.avgRating || b.reviewCount - a.reviewCount)
                .slice(0, 5)
                .map(async (item) => {
                    const product = await productModel.findById(item.productId)
                    return {
                        ...item,
                        productName: product?.name || 'Unknown',
                        productImage: product?.images?.[0] || ''
                    }
                })
        )

        // This month stats
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const thisMonthReviews = reviews.filter(r => new Date(r.createdAt) >= thisMonthStart)

        res.json({
            success: true,
            stats: {
                totalReviews,
                averageRating: Number(averageRating),
                ratingDistribution,
                monthlyTrend,
                topProducts,
                thisMonth: {
                    count: thisMonthReviews.length,
                    avgRating: thisMonthReviews.length > 0
                        ? (thisMonthReviews.reduce((s, r) => s + r.rating, 0) / thisMonthReviews.length).toFixed(1)
                        : 0
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Check if user can review a product
const canReview = async (req, res) => {
    try {
        const { userId, productId } = req.body

        // Check if already reviewed
        const existingReview = await reviewModel.findOne({ productId, userId })
        if (existingReview) {
            return res.json({ success: true, canReview: false, reason: 'already_reviewed' })
        }

        // Check if purchased
        const orders = await orderModel.find({ userid: userId, status: 'Delivered' })
        let purchased = false
        for (const order of orders) {
            const purchasedItem = order.items.find(item => item._id === productId)
            if (purchasedItem) {
                purchased = true
                break
            }
        }

        res.json({ success: true, canReview: true, purchased })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addReview, getProductReviews, getAllReviews, deleteReview, getReviewStats, canReview, getUserReviewedProducts, getAllProductRatings }

// Get all product IDs that a user has reviewed
const getUserReviewedProducts = async (req, res) => {
    try {
        const { userId } = req.body
        const reviews = await reviewModel.find({ userId }).select('productId')
        const reviewedProductIds = reviews.map(r => r.productId.toString())
        res.json({ success: true, reviewedProductIds })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get average ratings for all products (public - for product cards)
const getAllProductRatings = async (req, res) => {
    try {
        const reviews = await reviewModel.find({}).select('productId rating')

        // Group reviews by product and calculate averages
        const productRatings = {}
        reviews.forEach(r => {
            const pid = r.productId.toString()
            if (!productRatings[pid]) {
                productRatings[pid] = { total: 0, count: 0 }
            }
            productRatings[pid].total += r.rating
            productRatings[pid].count++
        })

        // Convert to final format
        const ratings = {}
        Object.entries(productRatings).forEach(([pid, data]) => {
            ratings[pid] = {
                averageRating: Number((data.total / data.count).toFixed(1)),
                reviewCount: data.count
            }
        })

        res.json({ success: true, ratings })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

