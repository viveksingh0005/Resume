import {useContext} from "react";
import {AuthContext} from "../auth.context";
import {loginapi,register,logout} from "../services/auth.api";

export const useAuth=()=>{
    const context =useContext(AuthContext)
    const {user,setUser,login, isAuthenticated, 
        loading, }=context

    const handleLogin=async({email,password})=>{
        try{
            const data=await loginapi({
                email,password
            })
              console.log("full API response:", data);      // ← what does backend return?
        console.log("token:", data.token);             // ← is token here?
        console.log("user:", data.user); 
            
            login(data.user,data.token)
                    console.log("token in localStorage after login:", localStorage.getItem('token'));
            return{success:true}
        }
        catch(err){
            console.log("error:",err)
            return {succes:false,message:err.response?.data?.message||"Login failed"}
        }

    }

    const handleRegister = async({username,email,password})=>{
        try{
            const data= await register({username,email,password})
             login(data.user,data.token)
        }
        catch(err){
            console.log("Error:",err)
        }
    }
    const handleLogout = async () => {
        try {
            await logout();
             // ← calls backend API
        } catch (err) {
            console.log("error:", err);
        } 
    };
  

    return {
      user,  isAuthenticated,
        loading,  handleLogin,handleLogout,handleRegister
    }
}