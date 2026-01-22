import express from 'express'
import { addReview, getProductReviews, getAllReviews, deleteReview, getReviewStats, canReview, getUserReviewedProducts, getAllProductRatings } from '../controller/reviewcontroller.js'
import authuser from '../middleware/auth.js'
import adminAuth from '../middleware/adminauth.js'

const reviewRouter = express.Router()

// User routes
reviewRouter.post('/add', authuser, addReview)
reviewRouter.post('/can-review', authuser, canReview)
reviewRouter.post('/user-reviewed', authuser, getUserReviewedProducts)

// Public routes
reviewRouter.get('/product/:productId', getProductReviews)
reviewRouter.get('/ratings', getAllProductRatings)

// Admin routes
reviewRouter.get('/all', adminAuth, getAllReviews)
reviewRouter.delete('/delete/:reviewId', adminAuth, deleteReview)
reviewRouter.get('/stats', adminAuth, getReviewStats)

export default reviewRouter
