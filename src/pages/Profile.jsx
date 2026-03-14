import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { FaStore } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaBullhorn } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/userSlice";
import { FaTools, FaSignOutAlt, FaChevronRight } from "react-icons/fa";

const Profile = () => {
    const dispatch = useDispatch();
    const userGet = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const handleLogOut = (e) => {
        api.get('/auth/logout')
            .then(responce => { dispatch(clearUser()), navigate('/login') })
            .catch(error => { console.error("There was an error", error); });
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 pt-24 pb-32 px-4 flex flex-col items-center gap-8 max-w-2xl mx-auto w-full">

                {/* 1. PROFILE HEADER CARD */}
                <div className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 border border-slate-100 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-lg mb-4">
                        {userGet?.name?.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">{userGet?.name}</h2>
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-1">{userGet?.role}</p>

                    <div className="grid grid-cols-1 w-full mt-8 gap-4 pt-6 border-t border-slate-50">
                        <ProfileInfo label="Email Address" value={userGet?.email} />
                        <ProfileInfo label="Shipping Address" value={userGet?.address} />
                    </div>

                    {/* LOGOUT BUTTON */}
                    <button
                        className="mt-8 flex items-center justify-center gap-2 px-8 py-3 rounded-2xl border-2 border-slate-100 text-slate-400 font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all active:scale-95 group"
                        onClick={handleLogOut}
                    >
                        <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
                        Log Out
                    </button>
                </div>

                {/* 2. ACTIONS SECTION (Role Based) */}
                {(userGet?.role === "SELLER" || userGet?.role === "ADMIN") && (
                    <div className="w-full space-y-3">
                        <h3 className="px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Management</h3>

                        {userGet?.role === "SELLER" && (
                            <>
                                <ActionButton
                                    icon={<FaBox className="text-blue-500" />}
                                    label="Add New Product"
                                    onClick={() => navigate('/createproduct')}
                                />
                                <ActionButton
                                    icon={<FaTools className="text-indigo-500" />}
                                    label="Manage Inventory"
                                    onClick={() => navigate('/productmanage')}
                                />
                            </>
                        )}

                        {userGet?.role === "ADMIN" && (
                            <ActionButton
                                icon={<FaTools className="text-red-500" />}
                                label="Admin Control Panel"
                                onClick={() => navigate('/adminpanel')}
                                variant="danger"
                            />
                        )}
                    </div>
                )}

                {/* 3. MORE SECTION */}
                <div className="w-full space-y-3">
                    <h3 className="px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Account Settings</h3>
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                        <MenuLink icon={<FaStore className="text-blue-500" />} label="Become a Seller" onClick={() => navigate('/registerseller')} />
                        <MenuLink icon={<IoNotifications className="text-orange-500" />} label="Notifications" onClick={() => navigate('/notification')} />
                        <MenuLink icon={<MdSupportAgent className="text-green-500" />} label="24x7 Customer Care" onClick={() => navigate('/customercare')} />
                        <MenuLink icon={<FaBullhorn className="text-purple-500" />} label="Advertise with Us" last />
                    </div>
                </div>

            </main>

        </div>
    );

    // --- Sub-Components for Cleanliness ---

    function ProfileInfo({ label, value }) {
        return (
            <div className="flex flex-col items-center sm:items-start">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</span>
                <span className="text-slate-700 font-bold text-center sm:text-left">{value || "Not provided"}</span>
            </div>
        );
    }

    function ActionButton({ icon, label, onClick, variant }) {
        return (
            <button
                className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group"
                onClick={onClick}
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg">{icon}</div>
                    <span className="font-bold text-slate-800">{label}</span>
                </div>
                <FaChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </button>
        );
    }

    function MenuLink({ icon, label, onClick, last }) {
        return (
            <button
                className={`w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors ${!last && 'border-b border-slate-50'}`}
                onClick={onClick}
            >
                <div className="flex items-center gap-4">
                    <div className="text-xl">{icon}</div>
                    <span className="font-bold text-slate-700 text-sm">{label}</span>
                </div>
                <FaChevronRight className="text-slate-200 text-xs" />
            </button>
        );
    }
}

export default Profile