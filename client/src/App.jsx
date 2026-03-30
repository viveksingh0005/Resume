import React from 'react'
import { Home } from "./Home.jsx";
import { Routes,Route } from 'react-router-dom';
import  Login  from "./features/auth/pages/Login.jsx";
import Register from './features/auth/pages/Registration.jsx';
import ATSResumeEditor from './features/resumecreator/pages/ATSResumeEditor.jsx';
const App = () => {
  return (
   <>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/resume" element={<ATSResumeEditor/>}/>
   </Routes>
   </>
  )
}

export default App