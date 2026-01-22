import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ override: true })

import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
import userrouter from './routes/userrouter.js'
import productrouter from './routes/productroute.js'
import cartrouter from './routes/cartroute.js'
import orderRouter from './routes/orderroute.js'
import reviewRouter from './routes/reviewroute.js'

// App Config
const app = express()
connectDB();
connectcloudinary();

// middlewares
app.use(express.json())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://ecommerce-jwellery-website-miwq.vercel.app',
    'https://ecommerce-jwellery-website.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));


app.use('/api/user', userrouter);
app.use('/api/product', productrouter);
app.use('/api/cart', cartrouter)
app.use('/api/order', orderRouter)
app.use('/api/review', reviewRouter)



app.get('/', (req, res) => {
  res.send("API Working")
})


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on PORT : ${port}`))
export default app;  