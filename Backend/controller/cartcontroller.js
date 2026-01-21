import productmodel from "../models/productmodel.js";
import userModel from "../models/usermodel.js";

const addtocart = async (req, res) => {
  try {
    const { userId, itemid, size } = req.body

    const userData = await userModel.findById(userId)
    if (!userData) {
      return res.json({ success: false, message: "User not found" })
    }
    let cartData = userData.cartData;

    if (cartData[itemid]) {
      if (cartData[itemid][size]) {
        cartData[itemid][size] += 1
      }
      else {
        cartData[itemid][size] = 1
      }
    } else {
      cartData[itemid] = {};
      cartData[itemid][size] = 1
    }
    await userModel.findByIdAndUpdate(userId, { cartData })
    res.json({ success: true, message: 'item added to cart' })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}


const updatecart = async (req, res) => {
  try {
    const { userId, itemid, size, quantity, clearAll } = req.body

    const userData = await userModel.findById(userId)
    if (!userData) {
      return res.json({ success: false, message: "User not found" })
    }
    let cartData = userData.cartData || {}

    if (clearAll) {
      cartData = {} // clear entire cart
    } else {
      if (!cartData[itemid]) cartData[itemid] = {}
      cartData[itemid][size] = quantity
    }

    await userModel.findByIdAndUpdate(userId, { cartData })
    res.json({ success: true, cartData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const getusercart = async (req, res) => {
  try {
    const { userId } = req.body

    const userData = await userModel.findById(userId)
    if (!userData) {
      return res.json({ success: false, message: "User not found" })
    }
    let cartData = userData.cartData || {};

    res.json({ success: true, cartData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}




export default { addtocart, updatecart, getusercart }