import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Register = () => {
    
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {handleRegister} =useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
         await handleRegister({
           username, email, password
        })
       navigate("/")
    }
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl ">
                    <h1 className="text-3xl font-bold text-white text-center mb-6">
                        Register
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                          <div className="flex flex-col">
                            <label className="text-gray-300 mb-1">Username</label>
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text"
                                placeholder="Enter username"
                                className="px-3 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-300">Email</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="email"
                                placeholder="Enter email"
                                className="px-3 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500">

                            </input>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-300 mb-1">Password</label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
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
                </div>
            </div>
        )
    }





export default Register