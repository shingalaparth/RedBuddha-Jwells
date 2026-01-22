import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import ShopLayout from './components/ShopLayout';
import AdminLayout from './components/admin/AdminLayout';

// Shop Pages
import Home from './pages/shop/Home';
import About from './pages/shop/About';
import Contact from './pages/shop/Contact';
import Collection from './pages/shop/Collection';
import Cart from './pages/shop/Cart';
import Login from './pages/shop/Login';
import Order from './pages/shop/Order';
import PlaceOrder from './pages/shop/PlaceOrder';
import Product from './pages/shop/Product';
import Profile from './pages/shop/Profile';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Add from './pages/admin/Add';
import List from './pages/admin/List';
import Orders from './pages/admin/Orders';
import Reviews from './pages/admin/Reviews';

function App() {
  return (
    <Routes>
      {/* Shop Routes wrapped in ShopLayout */}
      <Route element={<ShopLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productid" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
      </Route>

      {/* Admin Routes wrapped in AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="login" element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add" element={<Add />} />
        <Route path="list" element={<List />} />
        <Route path="orders" element={<Orders />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
}

export default App;
