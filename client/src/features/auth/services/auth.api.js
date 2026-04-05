import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`,
    withCredentials: true
})
export default api
export async function register({
    username,email,password
}){
    try{
        const response = await api.post('/api/auth/register',{
            username,email,password
        })
        return response.data
    }
    catch(err){
        console.log("Register error:", err.response?.data);
        console.log(err)
    }
}

export async function loginapi({email,password}){
    try{
        const response = await api.post("/api/auth/login",{
            email,password
            
        })
         
        return response.data
        

    }
    catch(err){
        console.log(err)
    }
}

// auth.api.js
export async function logout() {
    try {
        const response = await api.post("/api/auth/logout", {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        console.log(err)
    }

}