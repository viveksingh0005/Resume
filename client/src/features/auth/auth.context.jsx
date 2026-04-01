// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import api from "../auth/services/auth.api"
export const AuthContext = createContext();

// Custom Hook - This is what FeedbackModal imports
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Auto check if user is logged in when page refreshes
   useEffect(() => {
    const checkUser = async () => {
        const token = localStorage.getItem("token");
        console.log("1. token on refresh:", token); // ← is it here before API call?

        if (token) {
            try {
                const res = await api.get("/api/auth/get-me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("2. API response:", res.data); // ← what does backend return?
                setUser(res.data.user || res.data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("3. Auth check failed:", error.response?.status, error.response?.data);
                console.error("Full error:", error); // ← change this to see full error
    console.error("Error message:", error.message);
                // localStorage.removeItem("token"); 
                setUser(null);
                setIsAuthenticated(false);
            }
        }
        setLoading(false);
    };
    checkUser();
}, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        setUser(userData);
        setIsAuthenticated(true);
    };

   

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                loading,
                login,
             
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};