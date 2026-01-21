import { createContext, useDebugValue, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { ToastContainer, toast } from 'react-toastify';
export const ShopContext = createContext();
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [searchTerm, setSearchTerm] = useState('');
    const [showsearch, setshowsearch] = useState(false);
    const [cartitems, setcartitems] = useState({});
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [token, settoken] = useState('')
    const [category, setcategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const [tempcategory, settempcategory] = useState('');

    const togglecategory = (value) => {
        if (category.includes(value)) {
            setcategory(prev => prev.filter(item => item !== value))
        }
        else {
            setcategory(prev => [...prev, value])
        }
    }
    const togglesubCategory = (value) => {
        if (subCategory.includes(value)) {
            setsubCategory(prev => prev.filter(item => item !== value))
        }
        else {
            setsubCategory(prev => [...prev, value])
        }
    }

    const getproductdata = async () => {
        try {
            const response = await axios.get(backendURL + '/api/product/list')
            if (response.data.success) {
                setproducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const addtocart = async (itemid, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartdata = structuredClone(cartitems);

        if (cartdata[itemid]) {
            if (cartdata[itemid][size]) {
                cartdata[itemid][size] += 1
            }
            else {
                cartdata[itemid][size] = 1
            }
        }
        else {
            cartdata[itemid] = {}
            cartdata[itemid][size] = 1;
        }
        setcartitems(cartdata)
        toast.success('item added to cart')

        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/add', { itemid, size }, { headers: { token } })
            }
            catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }

    }
    const getcartcount = () => {
        let totalcount = 0;
        for (const items in cartitems) {
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        totalcount += cartitems[items][item]
                    }
                }
                catch (error) {

                }
            }
        }
        return totalcount;
    }

    const updatequantity = async (itemid, size, quantity) => {
        let cartdata = structuredClone(cartitems);
        cartdata[itemid][size] = quantity;
        setcartitems(cartdata);
        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/update', { itemid, size, quantity }, { headers: { token } })
            }
            catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    }

    const clearcart = async () => {
        setcartitems({}); // clear frontend first
        if (token) {
            try {
                await axios.post(
                    backendURL + '/api/cart/update',
                    { clearAll: true }, // backend should detect this and clear cartData
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            }
        }
    };

    const getcartamount = () => {
        let total = 0;
        for (const items in cartitems) {
            let iteminfo = products.find((product) => product._id == items);
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        total = total + (cartitems[items][item] * iteminfo.price)
                    }
                }
                catch (error) { }
            }
        }
        return total;
    }
    const getusercart = async (token) => {
        try {
            const response = await axios.post(backendURL + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setcartitems(response.data.cartData)
            }
            else {
                console.log(error.message)
                toast.error(error.message)
            }
        }
        catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const navtoplaceorder = () => {
        if (getcartamount() < 1) {
            toast.error('Atleastt one item required')
            return false;
        }
        return true;
    }

    useEffect(() => {
        getproductdata()
    }, [])
    useEffect(() => {
        getcartamount()
    }, [cartitems])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            settoken(localStorage.getItem('token'))
            getusercart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        searchTerm, setSearchTerm, showsearch, setshowsearch,
        cartitems, setcartitems, addtocart, clearcart,
        getcartcount, updatequantity, getcartamount,
        navigate, navtoplaceorder,
        backendURL,
        token, settoken,
        category, setcategory, subCategory, setsubCategory, togglecategory, togglesubCategory, tempcategory, settempcategory,
        getproductdata
    }
    return (
        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
