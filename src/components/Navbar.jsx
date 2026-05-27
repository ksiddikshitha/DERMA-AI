import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💊 DERMA-AI
        </Link>
        
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/skin-analysis" className="nav-link" onClick={() => setMenuOpen(false)}>
              🔍 Skin Analysis
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/doctor-consultation" className="nav-link" onClick={() => setMenuOpen(false)}>
              💬 Doctor Consultation
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/clinic-finder" className="nav-link" onClick={() => setMenuOpen(false)}>
              🏥 Clinics
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/booking" className="nav-link" onClick={() => setMenuOpen(false)}>
              📅 Booking
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
