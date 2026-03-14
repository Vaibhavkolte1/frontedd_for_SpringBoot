import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Home from '../pages/Home.jsx'
import Cart from '../pages/Cart.jsx'
import ProductPage from '../pages/ProductPage.jsx'
import Profile from '../pages/Profile.jsx'
import OrderPage from '../pages/OrderPage.jsx'
import OrderDetails from '../pages/OrderDetails.jsx'
import Search from '../pages/Search.jsx'
import RegisterSeller from '../pages/RegisterSeller.jsx'
import CreateProduct from '../pages/CreateProduct.jsx'
import AdminPanel from '../pages/AdminPanel.jsx'
import ProductManage from '../pages/ProductManage.jsx'
import ForgotPassword from '../pages/ForgotPassword.jsx'
import CustomerCare from '../pages/CustomerCare.jsx'
import Notification from '../pages/Notification.jsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerseller" element={<RegisterSeller />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productpage/:productId" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/getmyorders" element={<OrderPage />} />
        <Route path="/orderdetails/:orderId" element={<OrderDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/productmanage" element={<ProductManage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/customercare" element={<CustomerCare />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes