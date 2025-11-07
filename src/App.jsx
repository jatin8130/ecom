import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import AdminGaurd from './components/Admin/adminGaurd'
import Dashboard from './components/Admin/Dashboard'
import AdminHome from './components/Admin/AdminHome'
import Products from './components/Admin/Products'
import Categories from './components/Admin/Categories'
import Orders from './components/Admin/Orders'
import Admins from './components/Admin/Admins'
import Cart from './components/Cart'
import Profile from './components/Profile'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Ordermain from './components/Order'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home swip title= 'Products for you' />} />
          <Route path='/products' element={<Home swip={false} title= 'All products for you' />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Ordermain />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/admin' element={<AdminGaurd />}>
            <Route index element={<AdminHome />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='products' element={<Products />} />
            <Route path='categories' element={<Categories />} />
            <Route path='orders' element={<Orders />} />
            <Route path='admins' element={<Admins />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

