import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaStar } from "react-icons/fa";
import React from "react";

const Product = React.memo(function Product({ product }) {
	const { id, name, price, image, stock, ratings = 4.5 } = product;

	const navigate = useNavigate();

	const handleClick = () => {
		if (stock > 0) {
			navigate(`/productpage/${id}`);
		}
	};

	return (
		<div
			onClick={handleClick}
			className={`bg-white rounded-xl overflow-hidden border border-gray-100
      shadow-sm cursor-pointer
      ${stock === 0 ? "opacity-70 cursor-not-allowed" : ""}
      will-change-transform`}
		>
			{/* Image */}
			<div className="aspect-square bg-gray-100 overflow-hidden">
				{image ? (
					<img
						src={image}
						alt={name}
						loading="lazy"
						decoding="async"
						className="h-full w-full object-cover"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center">
						<FaBoxOpen className="text-3xl text-gray-300" />
					</div>
				)}
			</div>

			{/* Info */}
			<div className="p-3 flex flex-col">
				<h2 className="text-sm font-medium text-gray-800 line-clamp-2">
					{name}
				</h2>

				{/* Price */}
				<span className="text-sm font-semibold text-blue-600 mt-1">
					₹{price}
				</span>

				{/* Footer */}
				<div className="mt-2 flex items-center justify-between">
					<span
						className={`text-[10px] font-semibold px-2 py-1 rounded-full
              ${stock > 0
								? "text-green-700 bg-green-50"
								: "text-red-700 bg-red-50"
							}`}
					>
						{stock > 0 ? "IN STOCK" : "OUT"}
					</span>

					<div className="flex items-center gap-1 text-yellow-400 text-xs">
						<FaStar />
						<span className="text-gray-600">{ratings}</span>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Product;