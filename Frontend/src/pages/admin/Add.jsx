
import React, { useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const Add = () => {
    const { token } = useOutletContext();
    const { backendURL, getproductdata } = useContext(ShopContext);

    const [loading, setLoading] = useState(false);

    const [image1, setimage1] = useState(false);
    const [image2, setimage2] = useState(false);
    const [image3, setimage3] = useState(false);
    const [image4, setimage4] = useState(false);

    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [category, setcategory] = useState("Rings");
    const [subCategory, setsubCategory] = useState("Antitarnish");
    const [bestseller, setbestseller] = useState(false);
    const [sizes, setsizes] = useState([]);
    const [quant, setquant] = useState({ S: 0, M: 0, L: 0, XL: 0 });

    const onsubmithandler = async (e) => {
        e.preventDefault();
        console.log("Submit handler triggered");
        console.log("Form values:", { name, description, price, category, subCategory, bestseller, sizes, quant });

        if (!name.trim() || !description.trim()) {
            console.log("Validation failed: Name or description missing");
            toast.error("Please fill in Name and Description");
            return;
        }
        setLoading(true);

        try {
            const formdata = new FormData()
            formdata.append("name", name);
            formdata.append("description", description);
            formdata.append("price", price);
            formdata.append("category", category);
            formdata.append("subCategory", subCategory);
            formdata.append("bestseller", bestseller);
            formdata.append("sizes", JSON.stringify(sizes));
            formdata.append("quant", JSON.stringify(quant))
            formdata.append("date", Date.now());

            image1 && formdata.append("image1", image1)
            image2 && formdata.append("image2", image2)
            image3 && formdata.append("image3", image3)
            image4 && formdata.append("image4", image4)

            const response = await axios.post(backendURL + "/api/product/add", formdata, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)

                // Refresh the product list immediately
                await getproductdata();

                setimage1(false);
                setimage2(false);
                setimage3(false);
                setimage4(false);
                setname("");
                setdescription("");
                setprice("");
                setbestseller(false)
                setsizes([])
                setquant({ S: 0, M: 0, L: 0, XL: 0 })
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleSize = (size) => {
        setsizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                </div>

                <form onSubmit={onsubmithandler} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Product Information */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Image Upload Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { img: image1, set: setimage1, id: 'image1', label: 'Primary' },
                                    { img: image2, set: setimage2, id: 'image2', label: 'Secondary' },
                                    { img: image3, set: setimage3, id: 'image3', label: 'Angle 3' },
                                    { img: image4, set: setimage4, id: 'image4', label: 'Angle 4' }
                                ].map((item, idx) => (
                                    <div key={idx} className="relative group">
                                        <label htmlFor={item.id} className="cursor-pointer block aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
                                            {item.img ? (
                                                <img className="w-full h-full object-cover" src={URL.createObjectURL(item.img)} alt="Product" />
                                            ) : (
                                                <div className="text-center p-2">
                                                    <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                                                </div>
                                            )}

                                        </label>
                                        <input onChange={(e) => item.set(e.target.files[0])} type="file" id={item.id} hidden />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-4">Upload up to 4 images. Supported formats: JPG, PNG.</p>
                        </div>

                        {/* Basic Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Product Details</h3>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                    <input onChange={(e) => setname(e.target.value)} value={name} id="productName" type="text" placeholder="e.g. Gold Plated Ring" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400" />
                                </div>

                                <div>
                                    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea onChange={(e) => setdescription(e.target.value)} value={description} id="productDescription" placeholder="Detailed product description..." rows="5" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y transition-all placeholder-gray-400"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory & Sizes</h3>
                            <p className="text-sm text-gray-500 mb-6">Select available sizes and enter their stock quantity.</p>

                            <div className="grid grid-cols-2 gap-4">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <div
                                        key={size}
                                        onClick={(e) => {
                                            // Prevent toggling when clicking the input
                                            if (e.target.tagName !== 'INPUT') {
                                                toggleSize(size);
                                            }
                                        }}
                                        className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${sizes.includes(size)
                                            ? 'border-blue-500 bg-blue-50/20 shadow-sm'
                                            : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`font-bold text-lg ${sizes.includes(size) ? 'text-blue-700' : 'text-gray-400'}`}>
                                                {size}
                                            </span>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${sizes.includes(size) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                                }`}>
                                                {sizes.includes(size) && (
                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>

                                        <div className={`transition-all duration-300 overflow-hidden ${sizes.includes(size) ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <label className="text-xs font-semibold text-blue-800 uppercase tracking-wide block mb-1.5">Stock Quantity</label>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                value={quant[size]}
                                                onChange={(e) => setquant(prev => ({ ...prev, [size]: e.target.value }))}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm"
                                            />
                                        </div>
                                        {!sizes.includes(size) && (
                                            <div className="text-xs text-center p-2 text-gray-400 font-medium">Click to enable</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Organization & Publish */}
                    <div className="space-y-8">

                        {/* Organization Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Organization</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select onChange={(e) => setcategory(e.target.value)} value={category} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer">
                                        <option value="Rings">Rings</option>
                                        <option value="Necklace">Necklace</option>
                                        <option value="Bangles">Bangles</option>
                                        <option value="Mangalsutra">Mangalsutra</option>
                                        <option value="Bracelet">Bracelet</option>
                                        <option value="Earrings">Earrings</option>
                                        <option value="Sets">Sets</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                                    <select onChange={(e) => setsubCategory(e.target.value)} value={subCategory} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer">
                                        <option value="Antitarnish">Anti-Tarnish</option>
                                        <option value="Americand">American Diamond</option>
                                        <option value="Rajwadi">Rajwadi</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Price Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Pricing</h3>
                            <div>
                                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">₹</span>
                                    </div>
                                    <input onChange={(e) => setprice(e.target.value)} value={price} id="productPrice" type="number" placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Bestseller Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3">
                                <input onChange={() => setbestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                                <label htmlFor="bestseller" className="text-sm font-medium text-gray-700 cursor-pointer">Add to Bestsellers</label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 pl-8">This product will be featured in the bestsellers section.</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-black text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add
