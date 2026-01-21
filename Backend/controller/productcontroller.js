import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productmodel.js'

// function to add products
const addproduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, quant, bestseller } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item) => { return item !== undefined })


    console.log(name, description, price, category, subCategory, sizes, quant, bestseller)
    console.log(images)

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url
      }))

    const productdata = {
      name, description, price: Number(price), category, subCategory, sizes: JSON.parse(sizes), quant: JSON.parse(quant), bestseller: bestseller === "true" ? true : false, images: imagesUrl, date: Date.now()
    }

    const product = new productModel(productdata);
    await product.save()

    res.json({ success: true, message: "Product added successfully" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// function to list products
const listproduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products })
  }
  catch (error) {
    res.json({ success: false, message: error.message })
  }
}
// function to remove products
const removeproduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  }
  catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//function to update quantity of product
const updatequantity = async (req, res) => {
  try {
    await productModel.findByIdAndUpdate(req.body.id, { quant: req.body.quantity }, { new: true });
    res.json({ success: true, message: "updated successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// function to single product info
const singleproductinfo = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findById(id);
    res.json({ success: true, product });
  }
  catch (error) {
    res.json({ success: false, message: error.message })
  }
}


//to generate content using gemini



export { singleproductinfo, addproduct, removeproduct, updatequantity, listproduct }  