import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import Orders from '../components/Orders'
import { FaBoxOpen, FaTruck } from 'react-icons/fa'

const OrderPage = () => {
    const [productList, setProductList] = useState([])
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getCart = async () => {
            await api.get('/order/get-all')
                .then(res => setProductList(res.data.orderList || []) )
                .catch(e => console.log("error to fetch cart:", e))
        }

        getCart();
    }, [refresh])

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-12 max-w-[900px] mx-auto w-full">

                {/* Header with Icon */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
                        <FaBoxOpen className="text-2xl text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            Your <span className="text-blue-600">Orders</span>
                        </h1>
                        <p className="text-sm text-slate-400 font-medium">
                            Track and manage your recent purchases
                        </p>
                    </div>
                </div>

                {productList.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {productList.map((item) => (
                            <Orders
                                key={item.id}
                                qty={item.quantity}
                                orderId={item.id}
                                setRefresh={setRefresh}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty Orders State */
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <FaTruck className="text-3xl text-slate-200" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">No orders yet</h3>
                        <p className="text-slate-400 text-sm mb-6">Your shopping journey starts here!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-10 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                        >
                            Explore Products
                        </button>
                    </div>
                )}
            </main>

        </div>
    );
}

export default OrderPage