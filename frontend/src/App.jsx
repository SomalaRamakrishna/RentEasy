import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Homepage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import DashboardPage from './pages/DashboardPage'
import ViewHousePage from './pages/ViewHousePage'
import OwnerDashboard from './Components/ownerComponents/OwnerDashboard'
import PrivacyPage from './Components/additionalComponents/PrivacyPage'
import AboutPage from './Components/additionalComponents/AboutPage'
import TermsPage from './Components/additionalComponents/TermsPage'
import ContactPage from './Components/additionalComponents/ContactPage'
import NotFoundPage from './Components/additionalComponents/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './Components/additionalComponents/SearchPage'
import AdminDashboard from './Components/adminComponents/AdminDashboard'

import AdminLogin from './AdminLogin'
import Navbar from './pages/NavBar'




function App() {
  return (
    <>
   
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />


        <Route path="/dashboard/tenant" element={<DashboardPage />} />
        <Route path="/dashboard/owner" element={<OwnerDashboard />} />
        
        
        <Route path="/view-house/:id" element={<ViewHousePage />} />
        <Route path="/profile" element={<ProfilePage />} />
       {/*  <Route path="/search" element={<SearchPage />} /> */}


   {/* <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/contact" element={<ContactPage />} />

 */}


        <Route path="/admin" element={<AdminDashboard />} />
       {/*<Route path="/admin/login" element={<AdminLogin />} /> */}
   
    

    <Route path="/not-found" element={<NotFoundPage />} />
    <Route path="*" element={<NotFoundPage />} />

    
    </Routes>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App
