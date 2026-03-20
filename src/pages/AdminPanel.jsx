import { useEffect, useState } from 'react'
import React from 'react'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import ProductHandleAdmin from '../components/ProductHandleAdmin'
import UsersHandleAdmin from '../components/UsersHandleAdmin'
import { FaShieldAlt, FaUsersCog, FaBoxes } from "react-icons/fa";

const AdminPanel = () => {
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        api.get('/admin/users')
            .then(res => { setUsers(res.data)})
            .catch(e => console.log("error when get users: ", e))

        api.get('/admin/products')
            .then(res => setProducts(res.data))
            .catch(e => console.log("error when get products: ", e))

    }, [refresh])

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-12 w-full max-w-[1400px] mx-auto">

                {/* Header with Admin Identity */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-100">
                            <FaShieldAlt className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900">
                                Admin <span className="text-red-600">Panel</span>
                            </h1>
                            <p className="text-sm text-slate-400 font-medium italic">System Overview & Management</p>
                        </div>
                    </div>

                    {/* Quick Stats Summary */}
                    <div className="flex gap-4">
                        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase">Total Users</p>
                            <p className="text-xl font-black text-slate-900">{users.length}</p>
                        </div>
                        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase">Active Products</p>
                            <p className="text-xl font-black text-slate-900">{products.length}</p>
                        </div>
                    </div>
                </div>

                {/* Management Grid */}
                <div className="grid lg:grid-cols-2 gap-10">

                    {/* 1. USER MANAGEMENT SECTION */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                            <div className="flex items-center gap-2">
                                <FaUsersCog className="text-blue-600" />
                                <h4 className="text-lg font-bold text-slate-800 tracking-tight">User Directory</h4>
                            </div>
                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                {users.length} Registered
                            </span>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                            {users.map(user => (
                                <UsersHandleAdmin
                                    key={user.id}
                                    id={user.id}
                                    name={user.name}
                                    role={user.role}
                                    active={user.active}
                                />
                            ))}
                        </div>
                    </section>

                    {/* 2. PRODUCT MANAGEMENT SECTION */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                            <div className="flex items-center gap-2">
                                <FaBoxes className="text-indigo-600" />
                                <h4 className="text-lg font-bold text-slate-800 tracking-tight">Global Inventory</h4>
                            </div>
                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                Live Catalog
                            </span>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                            {products.map(product => (
                                <ProductHandleAdmin
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    image={product.image}
                                    price={product.price}
                                    stock={product.stock}
                                    sold={product.sold}
                                    setRefresh={setRefresh}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>

        </div>
    );
}

export default AdminPanel