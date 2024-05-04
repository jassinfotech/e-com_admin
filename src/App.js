import React from 'react'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Products from './components/Products';
import Addproduct from './components/Addproduct';
import Editproduct from './components/Editproduct';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AddCategory from './components/AddCategory';
import AddSize from './components/AddSize';
import Category from './components/Category';
import Orders from './components/Orders';
import Userslist from './components/Userslist';
import Invoice from './components/Invoice';
import OrdersDetails from './components/OrdersDetails';
import Addbanner from './components/Addbanner';



export default function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="addproduct" element={<Addproduct />} />
        <Route path="editproduct" element={<Editproduct />} />
        <Route path="addcategory" element={<AddCategory />} />
        <Route path="categorys" element={<Category />} />
        <Route path="add-size" element={<AddSize />} />
        <Route path="orders" element={<Orders />} />
        <Route path="userslist" element={<Userslist />} />
        <Route path="invoice" element={<Invoice />} />
        <Route path="orders-details" element={<OrdersDetails />} />
        <Route path="add-banner" element={<Addbanner />} />
      </Routes>
    </BrowserRouter>

  );
}


