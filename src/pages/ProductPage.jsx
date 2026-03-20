import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import Toast from '../components/Toast';
import { FaShoppingBag, FaStar, FaBox, FaChartLine, FaRegCommentDots } from "react-icons/fa";

const ProductPage = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [refresh, setRefresh] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/product/get/${productId}`);
        setProduct(res.data);
      } catch (e) {
        console.log("Error fetching product:", e);
      }
    };

    getProduct();
  }, [refresh, productId]);

  const handleClick = async () => {
    if (!product) return;
    try {
      const res = await api.post('/cart/add-item', { productId: product.id, quantity });
      setToast({ type: 'success', message: 'Product added to cart successfully!' });

      setRefresh(!refresh);
    } catch (e) {
      console.log("Error adding to cart:", e);
    }
  };

  const handleReview = async () => {
    if (!product) return;
    console.log("Submitting rating:", { id: product.id, ratings: rating });
    try {
      const res = await api.patch('/rating', { id: product.id, ratings: rating });
      setToast({ type: 'success', message: 'Product rated successfully!' });
      setRefresh(!refresh);
    } catch (e) {
      console.log("Error reviewing product:", e);
    }
  };


  if (!product) return <p className="text-black text-center mt-20">Loading product...</p>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-32 px-4 flex items-center justify-center">
        <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-6 sm:p-10 flex flex-col gap-8 border border-slate-100">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 w-fit hover:text-blue-600 transition-colors mb-2 text-sm font-bold"
          >
            <FaArrowLeft /> Back
          </button>

          {/* 1. PRODUCT IMAGE: Large and Rounded */}
          <div className="relative group overflow-hidden rounded-[2rem] bg-slate-50">
            <img
              src={product.image || "/fallback-image.png"}
              alt={product.name}
              className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Top-Right Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
              <span className="text-xs font-black text-blue-600 tracking-widest uppercase">New Arrival</span>
            </div>
          </div>

          {/* 2. HEADER: Name + Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 text-blue-600">
                <FaStar className="text-yellow-400" />
                <span className="text-sm font-bold">{product.ratings}</span>
                <span className="text-slate-400 text-xs">({product.noOfReview} verified reviews)</span>
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">
              ₹{product.price}
            </p>
          </div>

          {/* 3. CONTROLS: Quantity + CTA */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center bg-slate-100 rounded-2xl p-1 shadow-inner">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-blue-600 transition-all font-bold active:scale-90"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                −
              </button>
              <span className="px-6 font-black text-slate-800">{quantity}</span>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-blue-600 transition-all font-bold active:scale-90"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-blue-600 shadow-lg shadow-slate-200 transition-all active:scale-95"
              onClick={handleClick}
            >
              <FaShoppingBag />
              Add to Cart
            </button>
          </div>

          {/* 4. DESCRIPTION */}
          <div className="bg-slate-50 p-6 rounded-[1.5rem]">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Product Description</h4>
            <p className="text-slate-600 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          {/* 5. PRODUCT STATS: Organized Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100">
            <StatBox icon={<FaBox />} label="Stock" value={product.stock} color="text-green-600" />
            <StatBox icon={<FaChartLine />} label="Sold" value={product.sold} color="text-orange-500" />
            <StatBox icon={<FaRegCommentDots />} label="Reviews" value={product.noOfReview} color="text-blue-500" />
            <StatBox icon={<FaStar />} label="Rating" value={`${product.ratings}/5`} color="text-yellow-500" />
          </div>

          {/* 6. RATING INTERACTION */}
          <div className="flex flex-col gap-4">
            <h4 className="text-center text-xs font-black text-slate-400 uppercase tracking-widest">Rate this product</h4>
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-3xl transition-all duration-300 hover:scale-125 ${star <= rating ? "text-yellow-400 drop-shadow-md" : "text-slate-200"
                    }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              className="w-full py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all active:scale-95"
              onClick={handleReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      </main>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );

  // Helper component for the Stats
  function StatBox({ icon, label, value, color }) {
    return (
      <div className="flex flex-col items-center text-center gap-1">
        <div className={`${color} text-lg mb-1 opacity-80`}>{icon}</div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</p>
        <p className="text-sm font-bold text-slate-800">{value}</p>
      </div>
    );
  };
}

export default ProductPage;