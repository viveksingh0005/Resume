import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";        // ← Your existing hook

const Register = () => {
    
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const { handleRegister } = useAuth();   // ← Your existing hook

    // Normal form submit (unchanged)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ username, email, password });
        navigate("/");
    };

    // ←←← NEW: What happens when user clicks "Sign up with Google" button
    const handleGoogleSignUp = async (credentialResponse) => {
        try {
            // 1. Send Google ID token to your backend
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/google`, 
                { token: credentialResponse.credential },
                { withCredentials: true }          // ← Very important for cookies
            );

            // 2. If backend says success → redirect
            if (res.data.success) {
                navigate("/");                     // or "/dashboard"
            }
        } catch (err) {
            console.error(err);
            setError("Google sign up failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Register
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Your existing form fields - NO CHANGE */}
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Enter username"
                            className="px-3 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email"
                            placeholder="Enter email"
                            className="px-3 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter password"
                            className="px-3 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
                    >
                        Register
                    </button>
                </form>

                {/* OR Divider */}
                <div className="my-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-600"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-600"></div>
                </div>

                {/* Google Button - This is the only new part */}
                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSignUp}
                        onError={() => setError("Google sign up failed")}
                        text="signup_with"
                        theme="filled_blue"
                        size="large"
                        width="320"
                    />
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            </div>
        </div>
    );
};

export default Register;