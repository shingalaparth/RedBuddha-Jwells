import orderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import sendmail from "../utils/sendmail.js";
import send from "../utils/send.js";
import productmodel from "../models/productmodel.js";

const currency = 'inr'
const deliverycharge = 10

// Place order (COD)
const placeorder = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    // Decode token to get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;
    const usr = await userModel.findById(userid).select('email')
    const mail = usr.email;

    const { items, amount, address } = req.body;

    send('client', mail, amount, address);
    send('admin', mail, amount, address);


    const orderdata = {
      userid,       // from token
      items,
      amount,
      address,
      paymentmethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    };

    const neworder = new orderModel(orderdata);
    await neworder.save();
    // sendmail()
    await userModel.findByIdAndUpdate(userid, { cartdata: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




//placing order using razorpay method
const placeorderrazorpay = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;
    const usr = await userModel.findById(userid).select('email')
    const mail = usr.email;

    const { items, amount, address } = req.body;

    send('client', mail, amount, address);
    send('admin', mail, amount, address);

    // SAVE FIRST
    const newOrder = await orderModel.create({
      userid,
      items,
      amount,
      address,
      paymentmethod: "razorpay",
      payment: false,
      date: Date.now(),
    });

    // CREATE DUMMY ORDER
    const razorpayOrder = {
      id: "dummy_order_" + newOrder._id,
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    res.json({ success: true, order: razorpayOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const varifyrazorpay = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;

    const { razorpay_order_id, razorpay_payment_id } = req.body;

    // DUMMY VERIFICATION: Just check if payment_id exists
    if (razorpay_payment_id) {
      // Find the temporary order (created in placeorderrazorpay) and update it
      // In placeorderrazorpay we created an order with _id. The receipt was the _id.
      // The dummy_order_id was "dummy_order_" + _id.
      // So we need to extract the original _id.

      // However, looking at placeorderrazorpay logic:
      // const razorpayOrder = { id: "dummy_order_" + newOrder._id, receipt: newOrder._id.toString() ... }
      // Frontend sends: razorpay_order_id: order.id (which is "dummy_order_" + _id)

      // Correct logic to find the order from the dummy ID:
      const orderId = razorpay_order_id.replace("dummy_order_", "");

      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Order Placed"
      });
      const usr = await userModel.findById(userid).select('email');
      const mail = usr.email;

      const order = await orderModel.findById(orderId);

      send('client', mail, order.amount, order.address);
      send('admin', mail, order.amount, order.address);

      await userModel.findByIdAndUpdate(userid, { cartdata: {} });

      return res.json({ success: true, message: "Payment successful" });
    }

    // PAYMENT CANCELLED
    const orderId = razorpay_order_id.replace("dummy_order_", "");
    await orderModel.findByIdAndDelete(orderId);

    return res.json({ success: false, message: "Payment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//all ordders data for admin panel
const allorders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, orders })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//all ordders data for front end
const userorders = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;

    // Fetch orders, ensure items is always an array
    const orders = await orderModel.find({ userid }).lean();
    const safeOrders = orders.map(order => ({
      ...order,
      items: Array.isArray(order.items) ? order.items : []
    }));

    res.json({ success: true, orders: safeOrders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



//update order status
const updatestatus = async (req, res) => {
  try {
    const { orderid, status } = req.body

    // Find the order first
    const order = await orderModel.findById(orderid);

    // Prepare update object
    let updateData = { status };

    // If status is 'Delivered' and payment type is 'COD', mark as paid
    if (status === 'Delivered' && order.paymentmethod === 'COD') {
      updateData.payment = true;
    }

    await orderModel.findByIdAndUpdate(orderid, updateData);
    res.json({ success: true, message: "Status updated" + (updateData.payment ? " & Payment marked as Paid" : "") })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//checking if the products in the cart are available to be sold

const checkcart = async (req, res) => {
  try {
    const { id, size, qua } = req.body;
    const prod = await productmodel.findById(id);
    if (!prod) {
      return res.json({ success: false, message: 'product not available' })
    }
    const available = prod.quant[size];
    if (available < qua) {
      return res.json({ success: false, message: `only ${available} ${prod.name} in ${size} size are available` })
    }
    return res.json({ success: true, message: 'available' })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

//update all producs buyed 

const updatestock = async (req, res) => {
  try {
    const { id, size, qua } = req.body;
    const prod = await productmodel.findById(id);
    const available = prod.quant[size] - qua;
    prod.quant[size] = available;
    await prod.save();
    return res.json({ success: true, message: "stock updated" })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}


export { varifyrazorpay, placeorder, placeorderrazorpay, allorders, userorders, updatestatus, checkcart, updatestock }