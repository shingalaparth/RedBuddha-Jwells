import express from 'express'
import cartcontroller from '../controller/cartcontroller.js'
import authuser from '../middleware/auth.js';

const cartrouter = express.Router();
const { addtocart, updatecart, getusercart } = cartcontroller;

cartrouter.post('/get', authuser, getusercart)
cartrouter.post('/add', authuser, addtocart)
cartrouter.post('/update', authuser, updatecart)

export default cartrouter