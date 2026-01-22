import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true, maxlength: 100 },
    comment: { type: String, required: true, maxlength: 1000 },
    images: { type: [String], default: [] },
    verified: { type: Boolean, default: false }, // true if user purchased product
    helpful: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
})

// Index for faster queries
reviewSchema.index({ productId: 1, createdAt: -1 })
reviewSchema.index({ userId: 1 })

const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema)
export default reviewModel
