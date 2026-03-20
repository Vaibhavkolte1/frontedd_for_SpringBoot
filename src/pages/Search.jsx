import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IoSearch } from "react-icons/io5";

const Search = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const searchProducts = async () => {
            try {
                const res = await api.get('/product/search', {
                    params: {
                        keyword: searchTerm
                    }
                });
                setProducts(res.data);
            } catch (e) {
                console.log("error in product fetch: ", e);
            }

        };

        searchProducts();
    }, [searchTerm]);


    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">

            {/* Navbar */}
            <Navbar />

            {/* Content Area */}
            <main className="flex-1 flex flex-col pt-24 pb-32 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto w-full">

                {/* Header & Search Bar Container */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6">
                        What are you <span className="text-blue-600">looking for?</span>
                    </h1>

                    <div className="relative w-full max-w-xl group">
                        <input
                            type="text"
                            placeholder="Search for products, brands, or categories..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 
                                   shadow-sm transition-all duration-300
                                   focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 
                                   outline-none text-slate-700 placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl 
                                       group-focus-within:text-blue-600 transition-colors" />
                    </div>
                </div>

                {/* Results Status */}
                <div className="mb-6 flex justify-between items-center border-b border-slate-200 pb-4">
                    <p className="text-sm font-medium text-slate-500 italic">
                        {products.length > 0
                            ? `Found ${products.length} beautiful items`
                            : "No results yet..."}
                    </p>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {products.map((p) => (
                                <Product
                                    key={p.id}
                                    product={p}
                                />
                            ))}
                        </div>
                    ) : (
                        /* Empty State - Looks much better than a blank screen */
                        <div className="flex flex-col items-center justify-center py-20 opacity-40">
                            <IoSearch className="text-8xl mb-4" />
                            <p className="text-xl font-medium">Try searching for something else</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Search