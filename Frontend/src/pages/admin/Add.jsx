import React, { useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const Add = () => {
    const { token } = useOutletContext();
    const { backendURL, getproductdata } = useContext(ShopContext);

    const [loading, setLoading] = useState(false);
    const [dragIndex, setDragIndex] = useState(null);

    // Multi-image state - array of files
    const [images, setImages] = useState([]);
    const MAX_IMAGES = 7;

    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [category, setcategory] = useState("Rings");
    const [subCategory, setsubCategory] = useState("Antitarnish");
    const [bestseller, setbestseller] = useState(false);
    const [sizes, setsizes] = useState(['S', 'M', 'L', 'XL']); // All sizes enabled by default
    const [quant, setquant] = useState({ S: 10, M: 10, L: 10, XL: 10 }); // Default stock of 10

    // Handle multiple image selection
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > MAX_IMAGES) {
            toast.warning(`Maximum ${MAX_IMAGES} images allowed`);
            const allowedFiles = files.slice(0, MAX_IMAGES - images.length);
            setImages(prev => [...prev, ...allowedFiles]);
        } else {
            setImages(prev => [...prev, ...files]);
        }
    };

    // Remove specific image
    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    // Drag and drop to reorder
    const handleDragStart = (index) => {
        setDragIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (dragIndex === null || dragIndex === index) return;

        // Swap images
        const newImages = [...images];
        const draggedImage = newImages[dragIndex];
        newImages.splice(dragIndex, 1);
        newImages.splice(index, 0, draggedImage);
        setImages(newImages);
        setDragIndex(index);
    };

    const handleDragEnd = () => {
        setDragIndex(null);
    };

    const onsubmithandler = async (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            toast.error("Please fill in Name and Description");
            return;
        }

        if (images.length === 0) {
            toast.error("Please add at least one product image");
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

            // Append images with correct keys
            images.forEach((img, idx) => {
                formdata.append(`image${idx + 1}`, img);
            });

            const response = await axios.post(backendURL + "/api/product/add", formdata, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                await getproductdata();

                // Reset form
                setImages([]);
                setname("");
                setdescription("");
                setprice("");
                setbestseller(false);
                setsizes(['S', 'M', 'L', 'XL']);
                setquant({ S: 10, M: 10, L: 10, XL: 10 });
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

    // Quick stock presets
    const setAllStock = (value) => {
        setquant({ S: value, M: value, L: value, XL: value });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                </div>

                <form onSubmit={onsubmithandler} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Product Information */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Image Upload Card - Multi-Select */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Product Images</h3>
                                <span className="text-sm text-gray-500">{images.length}/{MAX_IMAGES} images</span>
                            </div>

                            {/* Drop Zone */}
                            <label
                                htmlFor="imageUpload"
                                className="block border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer transition-all bg-gray-50 hover:bg-blue-50/30"
                            >
                                <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <p className="text-gray-600 font-medium mb-1">Click to upload multiple images</p>
                                <p className="text-sm text-gray-500">Drag images to reorder (max {MAX_IMAGES} images)</p>
                            </label>
                            <input
                                type="file"
                                id="imageUpload"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                hidden
                            />

                            {/* Image Previews */}
                            {images.length > 0 && (
                                <div className="mt-6">
                                    <p className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                        Drag images to reorder. First image is primary.
                                    </p>
                                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                                        {images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                draggable
                                                onDragStart={() => handleDragStart(idx)}
                                                onDragOver={(e) => handleDragOver(e, idx)}
                                                onDragEnd={handleDragEnd}
                                                className={`relative group aspect-square rounded-lg overflow-hidden border-2 cursor-grab active:cursor-grabbing transition-all ${dragIndex === idx ? 'border-blue-500 scale-105 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <img
                                                    src={URL.createObjectURL(img)}
                                                    alt={`Product ${idx + 1}`}
                                                    className="w-full h-full object-cover pointer-events-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                                {idx === 0 && (
                                                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-blue-500 text-white text-[10px] font-medium rounded">Primary</span>
                                                )}
                                                <span className="absolute top-1 left-1 w-5 h-5 bg-black/50 text-white text-xs font-bold rounded flex items-center justify-center">{idx + 1}</span>
                                            </div>
                                        ))}

                                        {/* Add More Images Placeholder */}
                                        {images.length < MAX_IMAGES && (
                                            <label
                                                htmlFor="imageUpload"
                                                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50"
                                            >
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                </svg>
                                                <span className="text-[10px] text-gray-500 mt-1">Add</span>
                                            </label>
                                        )}
                                    </div>
                                </div>
                            )}
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

                        {/* Inventory Card - Simplified */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Stock & Sizes</h3>
                                {/* Quick Stock Presets */}
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => setAllStock(0)} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">Set All 0</button>
                                    <button type="button" onClick={() => setAllStock(10)} className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">Set All 10</button>
                                    <button type="button" onClick={() => setAllStock(50)} className="px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">Set All 50</button>
                                </div>
                            </div>

                            {/* All Sizes Always Visible */}
                            <div className="grid grid-cols-4 gap-4">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <div
                                        key={size}
                                        className={`p-4 rounded-xl border-2 transition-all ${sizes.includes(size)
                                            ? 'border-blue-500 bg-blue-50/50'
                                            : 'border-gray-200 bg-gray-50 opacity-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`font-bold text-xl ${sizes.includes(size) ? 'text-blue-700' : 'text-gray-400'}`}>
                                                {size}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => toggleSize(size)}
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${sizes.includes(size) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-blue-300'
                                                    }`}
                                            >
                                                {sizes.includes(size) && (
                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>

                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={quant[size]}
                                            onChange={(e) => setquant(prev => ({ ...prev, [size]: parseInt(e.target.value) || 0 }))}
                                            disabled={!sizes.includes(size)}
                                            className={`w-full px-3 py-2 border rounded-lg text-center font-bold text-lg transition-all ${sizes.includes(size)
                                                ? 'border-blue-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                                                : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        />
                                        <p className="text-xs text-center text-gray-500 mt-1">units</p>
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
