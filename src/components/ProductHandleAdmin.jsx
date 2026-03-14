import React, { useState } from 'react'
import api from '../api/axios';
import { FaBoxOpen, FaChartLine, FaTag, FaTrashAlt } from "react-icons/fa";

const ProductHandleAdmin = ({ id, name, image, price, stock, sold, setRefresh }) => {
    const handleDeletProduct = () => {
        if (id == null) { alert("somehting wennt worng") }

        const result = confirm("Are you want to delet this product!");
        if (!result) return;

        api.delete('/admin/product-delete', {
            params: {
                productId: id,
            }
        }).then(res => setRefresh(prev => !prev))
            .catch(e => console.log("Error occur when deleted product"))



    }

    return (
        <div className="group relative w-full max-w-4xl mx-auto bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">

            <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                {/* 1. PRODUCT PREVIEW & IDENTITY */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                        <img
                            src={image || "/placeholder.png"}
                            alt={name}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-sm sm:text-base font-black text-slate-800 truncate leading-tight">
                            {name}
                        </h2>
                        <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-tighter">
                            REF: {id}
                        </p>
                    </div>
                </div>

                {/* 2. DATA GRID */}
                <div className="grid grid-cols-3 gap-4 sm:gap-8 shrink-0">

                    {/* Stock Status */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                            <FaBoxOpen className="text-[10px] text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock</span>
                        </div>
                        <span className={`text-sm font-bold ${stock < 10 ? 'text-red-500' : 'text-slate-700'}`}>
                            {stock} <span className="text-[10px] font-medium opacity-50">units</span>
                        </span>
                    </div>

                    {/* Sales Performance */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                            <FaChartLine className="text-[10px] text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sold</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">
                            {sold} <span className="text-[10px] font-medium opacity-50">vols</span>
                        </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                            <FaTag className="text-[10px] text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</span>
                        </div>
                        <span className="text-sm font-black text-blue-600">
                            ₹{price.toLocaleString()}
                        </span>
                    </div>

                </div>

                {/* 3. ADMIN ACTIONS */}
                <div className="flex items-center justify-end border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                    <button
                        onClick={handleDeletProduct}
                        className="group/btn flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest
                     text-slate-400 bg-slate-50 border border-slate-100
                     hover:bg-red-50 hover:text-red-600 hover:border-red-200 
                     transition-all duration-200 active:scale-95 w-full lg:w-auto"
                    >
                        <FaTrashAlt className="text-[10px] group-hover/btn:rotate-12 transition-transform" />
                        Delete
                    </button>
                </div>

            </div>

            {/* Subtle Low-Stock Warning Bar */}
            {stock < 10 && (
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-2xl" title="Low Stock Warning" />
            )}
        </div>
    );
}

export default ProductHandleAdmin