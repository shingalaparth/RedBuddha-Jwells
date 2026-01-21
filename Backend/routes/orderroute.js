import express from 'express'
import { placeorder, placeorderrazorpay, allorders, userorders, updatestatus, varifyrazorpay, checkcart, updatestock } from '../controller/ordercontroller.js'
import adminauth from '../middleware/adminauth.js'
import authuser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminauth, allorders)
orderRouter.post('/status', adminauth, updatestatus)

// Payment Features
orderRouter.post('/place', authuser, placeorder)
orderRouter.post('/razorpay', authuser, placeorderrazorpay)
orderRouter.post('/check', authuser, checkcart)
orderRouter.post('/stock', authuser, updatestock)

// User Feature
orderRouter.post('/userorders', authuser, userorders)

orderRouter.post('/varifyrazorpay', authuser, varifyrazorpay)

export default orderRouter

