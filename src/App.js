// src/App.js
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MarketSelector from './MarketSelector'
import StoreProfile from './StoreProfile'
import MarketProducts from './MarketProducts'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import FileUpload from './FileUpload'
import { Box } from '@mui/material'
import Contact from "./contact"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <Router>
      <Box sx={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
        <Header />
        <Box sx={{ flexGrow:1 }}>
          <Routes>
            <Route path="/" element={<MarketSelector />} />
            <Route path="/:storeSlug" element={<StoreProfile />} />
            <Route path="/cenovnik/:market/:location" element={<MarketProducts />} />
            <Route path="/admin/login" element={<AdminLogin onLogin={()=>setIsLoggedIn(true)} />} />
            <Route path="/admin/dashboard" element={ isLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={()=>setIsLoggedIn(true)} /> } />
            <Route path="/admin/upload/:market/:location" element={ isLoggedIn ? <FileUpload /> : <AdminLogin onLogin={()=>setIsLoggedIn(true)} /> } />
            <Route path="/kontakt" element={<Contact />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  )
}

export default App
