import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SkinAnalysis from './pages/SkinAnalysis'
import DoctorConsultation from './pages/DoctorConsultation'
import ClinicFinder from './pages/ClinicFinder'
import Booking from './pages/Booking'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skin-analysis" element={<SkinAnalysis />} />
          <Route path="/doctor-consultation" element={<DoctorConsultation />} />
          <Route path="/clinic-finder" element={<ClinicFinder />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
