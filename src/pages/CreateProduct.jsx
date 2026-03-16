import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
    FaBox,
    FaParagraph,
    FaDollarSign,
    FaLayerGroup,
    FaImage,
    FaArrowLeft,
} from "react-icons/fa";

const CreateProduct = () => {
    const navigate = useNavigate();

    const [productDtls, setProductDtls] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
    });

    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !productDtls.name ||
            !productDtls.description ||
            !productDtls.price ||
            !productDtls.stock ||
            !imageFile
        ) {
            alert("Please fill all fields and select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", productDtls.name);
        formData.append("description", productDtls.description);
        formData.append("price", productDtls.price);
        formData.append("stock", productDtls.stock);
        formData.append("image", imageFile);

        try {
            const response = await api.post(
                "/seller/create-product",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);
            alert("Product created successfully!");
            navigate("/productmanage");

        } catch (error) {
            console.error(error);
            alert("Failed to create product.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-32 px-4 flex justify-center items-start font-sans">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-start">

                {/* FORM */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 sm:p-10 border border-slate-100">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-6 text-sm font-bold"
                    >
                        <FaArrowLeft /> Back
                    </button>

                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Product <span className="text-blue-600">Studio</span>
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 font-medium">
                            List a new item in your digital storefront.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Product Name */}
                        <div className="space-y-2">
                            <Label label="Product Name" />
                            <div className="relative">
                                <FaBox className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                <Input
                                    type="text"
                                    placeholder="Premium Wireless Headphones"
                                    value={productDtls.name}
                                    onChange={(e) =>
                                        setProductDtls({ ...productDtls, name: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label label="Description" />
                            <div className="relative">
                                <FaParagraph className="absolute left-4 top-4 text-slate-300" />
                                <textarea
                                    rows="3"
                                    placeholder="Describe product..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all outline-none text-slate-700 font-medium resize-none"
                                    value={productDtls.description}
                                    onChange={(e) =>
                                        setProductDtls({
                                            ...productDtls,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {/* Price + Stock */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="space-y-2">
                                <Label label="Price" />
                                <div className="relative">
                                    <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={productDtls.price}
                                        onChange={(e) =>
                                            setProductDtls({
                                                ...productDtls,
                                                price: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label label="Stock" />
                                <div className="relative">
                                    <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <Input
                                        type="number"
                                        placeholder="Quantity"
                                        value={productDtls.stock}
                                        onChange={(e) =>
                                            setProductDtls({
                                                ...productDtls,
                                                stock: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label label="Product Image" />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 mt-4"
                        >
                            Publish Product
                        </button>

                    </form>
                </div>

                {/* LIVE PREVIEW */}
                <div className="hidden lg:sticky lg:top-32 lg:flex flex-col items-center">

                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
                        Storefront Preview
                    </p>

                    <div className="w-full max-w-sm bg-white rounded-[2rem] border border-slate-100 shadow-2xl overflow-hidden scale-110">

                        <div className="h-64 bg-slate-50 flex items-center justify-center overflow-hidden">

                            {imageFile ? (
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    className="w-full h-full object-cover"
                                    alt="Preview"
                                />
                            ) : (
                                <FaImage className="text-5xl text-slate-200" />
                            )}

                        </div>

                        <div className="p-6">

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-black text-xl text-slate-800 truncate">
                                    {productDtls.name || "Product Name"}
                                </h3>
                                <span className="bg-blue-50 text-blue-600 text-xs font-black px-2 py-1 rounded-lg">
                                    NEW
                                </span>
                            </div>

                            <p className="text-slate-400 text-sm line-clamp-2 h-10 mb-4">
                                {productDtls.description || "No description yet."}
                            </p>

                            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                <span className="text-2xl font-black text-slate-900">
                                    ₹{productDtls.price || "0"}
                                </span>

                                <span className="text-xs font-bold text-slate-400">
                                    Stock: {productDtls.stock || "0"}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

/* Helper Components */

const Label = ({ label }) => (
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
    </label>
);

const Input = (props) => (
    <input
        {...props}
        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all outline-none text-slate-700 font-medium"
    />
);

export default CreateProduct;

