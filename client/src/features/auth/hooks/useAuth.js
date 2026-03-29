import {useContext,useEffect} from "react";
import {AuthContext} from "../auth.context";
import {login,register,logout,getMe} from "../services/auth.api";

export const useAuth=()=>{
    const context =useContext(AuthContext)
    const {user,setUser}=context

    const handleLogin=async({email,password})=>{
        try{
            const data=await login({
                email,password
            })
            console.log("data from API",data)
            setUser(data.user)
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
            setUser(data.user)
        }
        catch(err){
            console.log("Error:",err)
        }
    }
    const handleLogout=async()=>{
       try {
        const data =await logout()
        setUser(null)
       }
       catch(err){
        console.log("error:",err)
       }
    }
    useEffect(()=>{
        const getAndSetUser = async()=>{
            try{
                const data = await getMe()
                setUser(data.user)
            }
            catch(err){
                console.log(err)
            }
        }
        getAndSetUser()
    },[])

    return {
      user,  handleLogin,handleLogout,handleRegister
    }
}