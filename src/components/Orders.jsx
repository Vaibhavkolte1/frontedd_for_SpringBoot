import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const Orders = ({ productId, qty = 1, orderId, setRefresh }) => {
	const [pDetail, setpDetail] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const getProductDetails = async () => {
			try {
				setLoading(true)
				const orderRes = await api.get(`/order/get/${orderId}`)

				const productRes = await api.get(
					`/product/get-by-name/${orderRes.data.name}`
				)

				setpDetail({
					...orderRes.data,
					image: productRes.data.image,
					price: productRes.data.price
				})

			} catch (e) {
				console.log("Error fetching order/product:", e)
			} finally {
				setLoading(false)
			}
		}

		if (orderId) {
			getProductDetails()
		}
	}, [orderId])

	const handleCancelOrder = async () => {
		try {
			await api.delete(`/order/cancel/${orderId}`)
			setRefresh(prev => !prev)
		} catch (e) {
			console.log("Error cancelling order:", e)
		}
	}

	const handleClick = () => {
		navigate(`/orderdetails/${orderId}`)
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
		<div className="group relative flex items-center justify-between gap-4 p-4 m-4 max-w-2xl 
                    bg-white rounded-2xl border border-slate-100 shadow-sm 
                    hover:shadow-md hover:border-blue-100 transition-all duration-300">

			{/* Left Section: Image + Name */}
			<div
				className="flex items-center gap-4 cursor-pointer flex-1 min-w-0"
				onClick={handleClick}
			>
				<div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-50">
					<img
						src={pDetail.image || "/placeholder.png"}
						alt={pDetail.name}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
				</div>
				<div className="flex flex-col min-w-0">
					<span className="font-bold text-slate-800 truncate leading-tight">
						{pDetail.name}
					</span>
					<div className="flex items-center gap-2 mt-1">
						<span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
						<span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
							Processing
						</span>
					</div>
				</div>
			</div>

			{/* Middle Section: Qty + Price */}
			<div
				className="hidden sm:flex flex-col items-end text-right mr-4 cursor-pointer"
				onClick={handleClick}
			>
				<span className="text-[10px] font-bold text-slate-400 uppercase">Qty: {qty}</span>
				<span className="text-base font-black text-slate-900">
					₹{pDetail.price ? (pDetail.price * qty).toLocaleString() : 0}
				</span>
			</div>

			{/* Right Section: Action Button */}
			<button
				className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest
                       bg-slate-50 text-slate-500 border border-slate-100
                       hover:bg-red-50 hover:text-red-600 hover:border-red-100 
                       transition-all duration-200 active:scale-95 shrink-0"
				onClick={handleCancelOrder}
			>
				Cancel
			</button>

			{/* Hover Accent Line */}
			<div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-600 rounded-r-full 
                        scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
		</div>
	);
}

export default Orders