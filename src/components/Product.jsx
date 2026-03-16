import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaStar, FaHeart } from "react-icons/fa";
import React from "react";
import { useState } from "react";


const Product = React.memo(function Product({ product }) {

	const { id, name, price, image, stock, ratings = 4.5 } = product;

	const navigate = useNavigate();

	const [imgError, setImgError] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleClick = () => {
		if (stock > 0) {
			navigate(`/productpage/${id}`);
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handleClick}
			className={`group bg-white rounded-2xl overflow-hidden border border-gray-100
      transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
      ${stock === 0 ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
		>

			{/* Image Section (Square) */}
			<div className="relative aspect-square bg-gray-100 overflow-hidden">

				{/* Skeleton Loader */}
				{loading && (
					<div className="absolute inset-0 animate-pulse bg-gray-200" />
				)}

				{!imgError ? (
					<img
						src={image}
						alt={name}
						loading="lazy"
						onLoad={() => setLoading(false)}
						onError={() => {
							setImgError(true);
							setLoading(false);
						}}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center">
						<FaBoxOpen className="text-4xl text-gray-300" />
					</div>
				)}

				{/* Wishlist Icon */}
				<button
					onClick={(e) => e.stopPropagation()}
					className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:text-red-500 transition"
				>
					<FaHeart size={14} />
				</button>

				{/* Price Badge */}
				<div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow">
					<span className="text-sm font-bold text-blue-600">
						₹{price}
					</span>
				</div>

			</div>

			{/* Info Section */}
			<div className="p-4 flex flex-col">

				<span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
					Premium Collection
				</span>

				<h2 className="text-sm font-semibold text-gray-800 line-clamp-2 mt-1 group-hover:text-blue-600 transition-colors">
					{name}
				</h2>

				{/* Footer */}
				<div className="mt-3 flex items-center justify-between">

					{/* Stock */}
					<span
						className={`text-[10px] font-bold px-2 py-1 rounded-full
            ${stock > 0
								? "text-green-700 bg-green-50"
								: "text-red-700 bg-red-50"
							}`}
					>
						{stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
					</span>

					{/* Rating */}
					<div className="flex items-center gap-1 text-yellow-400 text-xs">
						<FaStar />
						<span className="text-gray-600 font-medium">
							{ratings}
						</span>
					</div>

				</div>

			</div>

		</div>
	);
}
)


export default Product;