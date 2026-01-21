import express, { Router } from 'express';
import { loginuser, registeruser, adminlogin, addaddress, getuser, deluser, deleteuser } from '../controller/usercontroller.js'

const userrouter = express.Router();

userrouter.post('/register', registeruser)
userrouter.post('/login', loginuser)
userrouter.post('/admin', adminlogin)
userrouter.post('/address', addaddress)
userrouter.post('/del', deluser)
userrouter.post('/delusr', deleteuser)
userrouter.get('/getuser', getuser)

export default userrouter; 