import React from 'react'
import { Home } from "./Home.jsx";
import { Routes,Route } from 'react-router-dom';
import  Login  from "./features/auth/pages/Login.jsx";
import Register from './features/auth/pages/Registration.jsx';
const App = () => {
  return (
   <>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
   </Routes>
   </>
  )
}

export default App