import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("currently not in service");

        try {
            if (!name || !email || !password || !address) {
                alert("Please fill in all required fields.");
                return;
            }

            api.post("/auth/register-xxx", {
                name,
                email,
                password,
                address,
                role: "USER"
            }).then((res) => {
                setname("");
                setemail("");
                setpassword("");
                setAddress("");
            });

            api.get('/auth/logout')
                    .then(responce => console.log("logout successfull", responce.data))
                    .catch(error => { console.error("There was an error", error); });
                navigate('/')


        } catch (error) {
            console.error("Error during registration:", error);
        }
    }

    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <div className="main-bg text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Register Page</h1>
                <form>
                    <input
                        type="text"
                        placeholder="Name"
                        id='name'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        id='email'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        id='password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
                    />

                    <input
                        type="string"
                        placeholder="Address"
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
                    />



                    <div className='w-full flex justify-around'>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-1/3 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
                        >
                            Register
                        </button>

                        <button
                            onClick={goToLogin}
                            className="w-1/3 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register