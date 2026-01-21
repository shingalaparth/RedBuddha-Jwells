import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String},
  googleId: { type: String},
  avatar: { type: String},
  cartData: { type: Object, default: {} },
  address: {type:[Object],default:[],}
}, { minimize: false })
//this means dont remove empty objects when saving daata

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel