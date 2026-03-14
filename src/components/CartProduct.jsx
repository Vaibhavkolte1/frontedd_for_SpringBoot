import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Swal from 'sweetalert2';
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const CartProduct = ({ productId, qty = 1, setRefresh }) => {
    const [pDetail, setPDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                setLoading(true)

                const cartRes = await api.get(`/cart/get-item/${productId}`)

                const productRes = await api.get(
                    `/product/get-by-name/${cartRes.data.name}`
                )

                setPDetail({
                    ...cartRes.data,
                    image: productRes.data.image,
                    price: productRes.data.price
                })

            } catch (error) {
                console.error("Error fetching cart product:", error)
                alert("Failed to load product details")
            } finally {
                setLoading(false)
            }
        }

        if (productId) {
            getProductDetails()
        }
    }, [productId])

    const handleRemoveFromCart = async () => {
        try {
            setProcessing(true)

            await api.delete(`/cart/delet-item/${productId}`)
            setPopup("removed")
            setRefresh(prev => !prev)

        } catch (error) {
            console.error("Error removing product:", error)
            alert("Failed to remove product")
        } finally {
            setProcessing(false)
        }
    }

    const handleOrder = async () => {
        try {
            setProcessing(true)

            await api.post('/order/order-product', {
                cartProductId: productId
            })

            setPopup("ordered")
            setRefresh(prev => !prev)

        } catch (error) {
            console.error("Error placing order:", error)
            alert("Order failed. Please try again.")
        } finally {
            setProcessing(false)
        }
    }

    const setPopup = (type) => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: type === "ordered" ? "success" : "info",
            title: type === "ordered" ? "Order Placed Successfully 🎉" : "Item Removed from Cart 🚫",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: "#1f2937",
            color: "#fff",
            customClass: {
                popup: "rounded-xl shadow-lg"
            }
        });
    }

    if (loading) {
        return (
            <div className='p-4 m-4 rounded max-w-sm text-white'>
                Loading...
            </div>
        )
    }

    if (!pDetail) return null

    return (
        <div className="group relative flex items-center gap-4 bg-white p-4 rounded-2xl 
                  border border-slate-100 shadow-sm transition-all duration-300 
                  hover:shadow-md hover:border-blue-100 w-full overflow-hidden">

            {/* Left: Product Image */}
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                <img
                    src={pDetail.image || "/placeholder.png"}
                    alt={pDetail.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Middle: Details & Info */}
            <div className="flex flex-1 flex-col min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base truncate pr-2">
                            {pDetail.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tight">
                            Qty: <span className="text-slate-900">{qty}</span>
                        </p>
                    </div>

                    {/* Right Inside: Price */}
                    <div className="text-right">
                        <p className="text-lg font-black text-blue-600">
                            ₹{(pDetail.price * qty).toFixed(2)}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                            ₹{pDetail.price}/ea
                        </p>
                    </div>
                </div>

                {/* Bottom: Inline Actions */}
                <div className="mt-3 flex items-center gap-4">
                    {/* Order Button styled as a text-link with icon */}
                    <button
                        className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest disabled:opacity-50"
                        onClick={handleOrder}
                        disabled={processing}
                    >
                        <FaCheckCircle className="text-sm" />
                        {processing ? 'Processing...' : 'Buy Now'}
                    </button>

                    <div className="h-3 w-[1px] bg-slate-200" /> {/* Divider */}

                    {/* Remove Button as a subtle icon link */}
                    <button
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest disabled:opacity-50"
                        onClick={handleRemoveFromCart}
                        disabled={processing}
                    >
                        <FaTrashAlt className="text-xs" />
                        Remove
                    </button>
                </div>
            </div>

            {/* Subtle Accent Bar on Hover */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform" />
        </div>
    );
}

export default CartProduct