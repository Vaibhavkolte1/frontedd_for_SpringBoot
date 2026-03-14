import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaClock } from 'react-icons/fa'

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const [cardNumber, setCardNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState();
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();

    const userGet = useSelector((state) => state.user.user);

    useEffect(() => {
        const getOrderDetails = () => {
            api.get(`/order/get/${orderId}`)
                .then(res => { console.log(res.data); setOrder(res.data) })
                .catch(e => console.log("error to fetch product details:", e))
        }

        getOrderDetails();
    }, [refresh])

    const handlePayment = () => {
        if (!paymentMethod || paymentMethod.trim() === "" &&  cardNumber.trim() === "") {
            alert("No payment method selected or card details provided.");
            return;
        }

        api.post("/order/payment", { orderId: order?.id, paymentMethod: paymentMethod })
            .then(res => {
                console.log("Payment processed:", res.data);
                alert("Payment successful!");
                setTimeout(() => {
                    setRefresh(!refresh);
                }, 2000);
            })
            .catch(e => {
                console.error("Error processing payment:", e);
            });
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 pt-24 pb-32 px-4 flex justify-center items-start">
                <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

                    {/* Header Section */}
                    <div className="bg-slate-900 p-8 text-center">
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Order Confirmed</p>
                        <h2 className="text-2xl font-black text-white leading-tight">
                            {order?.name}
                        </h2>
                    </div>

                    {/* QR Code Section - The "Ticket" look */}
                    <div className="px-8 -mt-6">
                        <div className="bg-white p-4 rounded-3xl shadow-lg flex flex-col items-center border border-slate-50">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${order?.id}`}
                                alt="Order QR"
                                className="w-40 h-40 rounded-xl"
                            />
                            <p className="text-[10px] font-mono text-slate-400 mt-3">ID: {order?.id}</p>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Main Price Display */}
                        <div className="text-center mb-8">
                            <p className="text-4xl font-black text-slate-900">₹{order?.totalAmount}</p>
                            <p className="text-sm font-bold text-blue-600 mt-1">Quantity: {order?.quantity}</p>
                        </div>

                        {/* Decorative Perforated Divider */}
                        <div className="relative flex items-center mb-8">
                            <div className="flex-1 border-t-2 border-dashed border-slate-100"></div>
                            <div className="absolute -left-10 w-4 h-4 bg-[#F8FAFC] rounded-full border border-slate-100"></div>
                            <div className="absolute -right-10 w-4 h-4 bg-[#F8FAFC] rounded-full border border-slate-100"></div>
                        </div>

                        {/* Details List */}
                        <div className="space-y-6">
                            {/* Details List */}
                            <div className="space-y-6">
                                <DetailRow
                                    icon={<FaUser className="text-blue-500" />}
                                    label="Receiver"
                                    value={userGet?.name}
                                />
                                <DetailRow
                                    icon={<FaMapMarkerAlt className="text-red-500" />}
                                    label="Shipping to"
                                    value={userGet?.address}
                                />
                                <DetailRow
                                    icon={<FaCreditCard className="text-green-500" />}
                                    label="Payment"
                                    value={order?.paymentStatus}
                                    isStatus
                                    statusType={order?.paymentStatus === "Paid" ? "success" : "danger"}
                                />
                                <DetailRow
                                    icon={<FaClock className="text-orange-500" />}
                                    label="Status"
                                    value={order?.orderstatus}
                                    isStatus
                                    statusType="info"
                                />
                            </div>

                            {/* Payment & Back Actions */}
                            <div className="mt-10 space-y-3">
                                {order?.paymentStatus !== "DONE" && (
                                    <div className="mt-8 space-y-4">
                                        {/* Payment Method Selector */}
                                        <div className="relative group">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1 block">
                                                Payment Method
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="paymentMethod"
                                                    id="paymentMethod"
                                                    value={paymentMethod}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-100 text-slate-700 text-sm rounded-2xl p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer font-bold"
                                                >
                                                    <option value="creditCard">💳 Credit Card</option>
                                                    <option value="paypal">🅿️ PayPal</option>
                                                    <option value="stripe">🏁 Stripe</option>
                                                    <option value="cod" disabled={true}>💵 Cash on Delivery</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Input Section */}
                                        <div className="relative group">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1 block">
                                                Card Details
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                    <FaCreditCard className="w-4 h-4" />
                                                </span>
                                                <input
                                                    type="text"
                                                    placeholder='0000 0000 0000 0000'
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300 font-mono tracking-wider"
                                                />
                                            </div>
                                        </div>

                                        {/* Pay Button */}
                                        <button
                                            onClick={() => {
                                                console.log("Proceeding to payment for order:", order?.id);
                                                handlePayment();
                                            }}
                                            className="w-full mt-4 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                                        >
                                            <span>Pay Now</span>
                                            <span className="h-4 w-[1px] bg-blue-400/50"></span>
                                            <span>₹{order?.totalAmount}</span>
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={() => navigate(-1)}
                                    className="w-full py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
                                >
                                    Back to My Orders
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );

    // Small helper for the detail rows to keep code clean
    function DetailRow({ icon, label, value, isStatus, statusType }) {
        return (
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs">
                        {icon}
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                </div>
                <span className={`text-sm font-bold text-right max-w-[50%] ${isStatus && statusType === "success" ? "text-green-600" :
                    isStatus && statusType === "info" ? "text-blue-600" :
                        "text-slate-800"
                    }`}>
                    {value}
                </span>
            </div>
        );
    }
}

export default OrderDetails