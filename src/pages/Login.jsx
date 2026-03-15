import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/userSlice";

import {
	FaEnvelope,
	FaLock,
	FaSignInAlt,
	FaExclamationCircle,
	FaGoogle,
	FaGithub
} from 'react-icons/fa';

const Login = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setErrorMsg('Email and password are required');
			return;
		}

		try {

			const res = await api.post(
				'/auth/login',
				{ email, password },
				{ withCredentials: true }
			);

			console.log('Login success:', res.data);

			dispatch(setUser({ user: res.data, token: "fakeToken" }));

			setEmail('');
			setPassword('');
			setErrorMsg('');

			navigate('/');

		} catch (err) {

			console.error('Login error:', err);

			if (err.response) {
				setErrorMsg(err.response.data || 'Login failed');
			} else {
				setErrorMsg('Network or server error');
			}

		}
	};

	return (

		<div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 font-sans">

			{/* Background decoration */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
				<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
			</div>

			<div className="relative w-full max-w-md bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-10 sm:p-12">

				{/* Header */}
				<div className="text-center mb-10">

					<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-6">
						<FaSignInAlt className="text-white text-2xl" />
					</div>

					<h1 className="text-3xl font-black text-slate-900 tracking-tight">
						Welcome <span className="text-blue-600">Back</span>
					</h1>

					<p className="text-slate-400 text-sm mt-2 font-medium">
						Please enter your details to sign in.
					</p>

				</div>

				{/* Error message */}
				{errorMsg && (

					<div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-bold">

						<FaExclamationCircle />
						{errorMsg}

					</div>

				)}

				{/* Login Form */}
				<form onSubmit={handleSubmit} className="space-y-5">

					{/* Email */}
					<div className="space-y-2">

						<label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
							Email Address
						</label>

						<div className="relative group">

							<FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />

							<input
								type="email"
								placeholder="name@company.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all outline-none text-slate-700 font-medium"
								required
							/>

						</div>

					</div>

					{/* Password */}
					<div className="space-y-2">

						<div className="flex justify-between items-end px-1">

							<label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
								Password
							</label>

							<Link
								to="/forgotpassword"
								className="text-[10px] font-bold text-blue-600 hover:underline"
							>
								Forgot?
							</Link>

						</div>

						<div className="relative group">

							<FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />

							<input
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all outline-none text-slate-700 font-medium"
								required
							/>

						</div>

					</div>

					{/* Sign in button */}
					<button
						type="submit"
						className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 mt-4"
					>
						Sign In
					</button>

				</form>

				{/* Divider */}
				<div className="flex items-center gap-3 my-8">

					<div className="flex-1 h-px bg-slate-200"></div>

					<span className="text-xs text-slate-400 font-semibold">
						OR CONTINUE WITH
					</span>

					<div className="flex-1 h-px bg-slate-200"></div>

				</div>

				{/* Social login */}
				<div className="grid grid-cols-2 gap-4">

					<button
						type="button"
						onClick={() => window.location.href = "http://localhost:5000/auth/google"}
						className="flex items-center justify-center gap-3 border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition font-semibold"
					>
						<FaGoogle className="text-red-500" />
						Google
					</button>

					<button
						type="button"
						onClick={() => window.location.href = "http://localhost:5000/auth/github"}
						className="flex items-center justify-center gap-3 border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition font-semibold"
					>
						<FaGithub />
						GitHub
					</button>

				</div>

				{/* Register */}
				<div className="mt-10 text-center">

					<p className="text-slate-400 text-sm font-medium">

						New to the platform?{' '}

						<Link
							to="/register"
							className="text-blue-600 font-black hover:underline underline-offset-4"
						>
							Create account
						</Link>

					</p>

				</div>

			</div>

		</div>

	);
};

export default Login;