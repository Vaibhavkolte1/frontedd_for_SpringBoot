import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../components/Product";
import api from "../api/axios";

const Home = () => {

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(0);

	useEffect(() => {

		const fetchProducts = async () => {

			setLoading(true);

			try {
				const res = await api.get(`/product/get-all?page=${page}&size=10`);
				setProducts(res.data.content);

			} catch (err) {
				setError("Failed to load products");
			} finally {
				setLoading(false);
			}

		};

		fetchProducts();

	}, [page]);

	return (
		<div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">

			{/* Navbar */}
			<Navbar className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100" />

			{/* Main */}
			<main className="flex-grow pt-24 pb-32 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto w-full">

				{/* Header */}
				<div className="mb-10 text-center sm:text-left">
					<h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
						Discover <span className="text-blue-600">New Arrivals</span>
					</h1>

					<p className="mt-2 text-gray-500 max-w-xl">
						High-quality products curated just for you. Free shipping on orders over $50.
					</p>
				</div>

				{/* Loading */}
				{loading && (
					<div className="text-center text-gray-500 text-lg">
						Loading products...
					</div>
				)}

				{/* Error */}
				{error && (
					<div className="text-center text-red-500 text-lg">
						{error}
					</div>
				)}

				{/* Products */}
				{!loading && !error && (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
						{products.map((p) => (
							<Product
								key={p.id}
								product={p}
							/>
						))}
					</div>
				)}
				<div className="flex justify-center items-center gap-4 mt-10">

					<button
						onClick={() => setPage((p) => Math.max(p - 1, 0))}
						className="px-4 py-2 bg-gray-200 rounded"
					>
						Prev
					</button>

					<span className="font-semibold">
						Page {page + 1}
					</span>

					<button
						onClick={() => setPage((p) => p + 1)}
						className="px-4 py-2 bg-blue-600 text-white rounded"
					>
						Next
					</button>

				</div>

			</main>

			{/* Footer */}
			<footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200">
				<Footer />
			</footer>

		</div>
	);
};

export default Home;