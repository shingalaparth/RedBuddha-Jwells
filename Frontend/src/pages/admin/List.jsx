
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { currency } from '../../components/admin/AdminLayout';

const List = () => {
    const { token } = useOutletContext();
    const { backendURL } = useContext(ShopContext);

    const [list, setlist] = useState([]);
    const [quantity, setquantity] = useState({ S: 0, M: 0, L: 0, XL: 0 })
    const [update, setupdate] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchlist = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(backendURL + '/api/product/list')
            if (response.data.success) {
                setlist(response.data.products);
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    const removeprod = async (id) => {
        if (!window.confirm('Are you sure you want to remove this product?')) return;

        try {
            const response = await axios.post(`${backendURL}/api/product/remove`, { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchlist();
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error('Failed to remove product');
        }
    }

    const updateprod = async (id) => {
        try {
            setupdate(-1)
            const response = await axios.post(`${backendURL}/api/product/update`, { id, quantity }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchlist();
            }
            else {
                toast.error(response.data.message)
            }
            setquantity({ S: 0, M: 0, L: 0, XL: 0 })
        } catch (error) {
            console.log(error)
            toast.error('Failed to update product');
        }
    }

    useEffect(() => {
        fetchlist()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Product List</h1>
                        <p className="text-gray-500 mt-2">Manage your inventory and stock levels</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        <span className="text-gray-500 text-sm">Total Products: </span>
                        <span className="font-bold text-gray-900 ml-1">{list.length}</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-center text-gray-500 uppercase tracking-wider">Inventory (S-M-L-XL)</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-right text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {list.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                                                    <img className="w-full h-full object-cover" src={item.images?.[0] || 'uploadarea.png'} alt="" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                                                    {item.bestseller && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Bestseller</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {item.category}
                                            </span>
                                            <div className="text-xs text-gray-400 mt-1">{item.subCategory}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900">{currency}{item.price}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {update === index ? (
                                                <div className="flex justify-center items-center gap-2">
                                                    {['S', 'M', 'L', 'XL'].map(size => (
                                                        <input
                                                            key={size}
                                                            type="number"
                                                            min="0"
                                                            className="w-10 text-center border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm py-1"
                                                            value={quantity[size]}
                                                            onChange={(e) => setquantity(prev => ({ ...prev, [size]: Number(e.target.value) }))}
                                                        />
                                                    ))}
                                                    <button onClick={() => updateprod(item._id)} className="ml-2 text-green-600 hover:text-green-800">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                    </button>
                                                    <button onClick={() => setupdate(-1)} className="text-gray-400 hover:text-gray-600">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center items-center gap-2 group cursor-pointer" onClick={() => {
                                                    setupdate(index)
                                                    setquantity({ S: Number(item.quant.S) || 0, M: Number(item.quant.M) || 0, L: Number(item.quant.L) || 0, XL: Number(item.quant.XL) || 0 })
                                                }}>
                                                    {['S', 'M', 'L', 'XL'].map(size => (
                                                        <span key={size} className={`w-8 text-center text-xs py-1 rounded ${item.quant[size] > 0 ? 'bg-gray-100 text-gray-700' : 'bg-gray-50 text-gray-300'}`}>
                                                            {item.quant[size] || 0}
                                                        </span>
                                                    ))}
                                                    <svg className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => removeprod(item._id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden p-4 space-y-4">
                        {list.map((item, index) => (
                            <div key={index} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0">
                                        <img className="w-full h-full object-cover rounded-lg" src={item.images?.[0] || 'uploadarea.png'} alt="" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <div className="text-xs text-gray-500 mt-0.5">{item.category} • {item.subCategory}</div>
                                            </div>
                                            <span className="font-bold text-gray-900">{currency}{item.price}</span>
                                        </div>

                                        {/* Inventory Mobile */}
                                        <div className="mt-4 pt-3 border-t border-gray-50">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Inventory</span>
                                                <button onClick={() => {
                                                    if (update === index) setupdate(-1);
                                                    else {
                                                        setupdate(index);
                                                        setquantity({ S: Number(item.quant.S) || 0, M: Number(item.quant.M) || 0, L: Number(item.quant.L) || 0, XL: Number(item.quant.XL) || 0 })
                                                    }
                                                }} className="text-xs text-blue-600 font-medium">
                                                    {update === index ? 'Cancel' : 'Edit'}
                                                </button>
                                            </div>

                                            {update === index ? (
                                                <div className="grid grid-cols-4 gap-2">
                                                    {['S', 'M', 'L', 'XL'].map(size => (
                                                        <div key={size} className="text-center">
                                                            <label className="text-[10px] text-gray-400 block mb-1">{size}</label>
                                                            <input
                                                                type="number"
                                                                className="w-full text-center border border-blue-200 rounded py-1 text-sm focus:ring-1 focus:ring-blue-500"
                                                                value={quantity[size]}
                                                                onChange={(e) => setquantity(prev => ({ ...prev, [size]: Number(e.target.value) }))}
                                                            />
                                                        </div>
                                                    ))}
                                                    <button onClick={() => updateprod(item._id)} className="col-span-4 mt-2 bg-blue-600 text-white text-sm py-1.5 rounded-lg">Save Changes</button>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-4 gap-2">
                                                    {['S', 'M', 'L', 'XL'].map(size => (
                                                        <div key={size} className="text-center p-1 bg-gray-50 rounded">
                                                            <span className="text-[10px] text-gray-400 block">{size}</span>
                                                            <span className="text-sm font-medium text-gray-700">{item.quant[size]}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-3 flex justify-end">
                                            <button onClick={() => removeprod(item._id)} className="text-red-500 text-xs font-medium flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                Remove Product
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {list.length === 0 && !isLoading && (
                        <div className="p-10 text-center text-gray-400">
                            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                            <p className="text-lg font-medium">No Products Found</p>
                            <p className="text-sm">Start by adding a new product via the "Add Items" page.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default List
