import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DERMA-AI</h1>
        <p>Skin Care Analysis & Doctor Consultation Platform</p>
      </header>
      
      <main className="app-main">
        <section className="features">
          <div className="feature-card">
            <h2>🔍 Skin Analysis</h2>
            <p>Upload an image and get personalized skin care recommendations based on your skin type.</p>
          </div>
          
          <div className="feature-card">
            <h2>💊 Product Suggestions</h2>
            <p>Discover products tailored to your specific skin concerns and type.</p>
          </div>
          
          <div className="feature-card">
            <h2>💬 Online Doctor Consultation</h2>
            <p>Chat with licensed dermatologists for professional advice.</p>
          </div>
          
          <div className="feature-card">
            <h2>🏥 Nearby Clinics</h2>
            <p>Find and locate dermatology clinics in your area.</p>
          </div>
          
          <div className="feature-card">
            <h2>📅 Offline Booking</h2>
            <p>Book in-person consultations with dermatologists.</p>
          </div>
        </section>

        <section className="demo-section">
          <h2>Welcome to DERMA-AI</h2>
          <p>Your intelligent skin care companion</p>
          <button onClick={() => setCount(count + 1)} className="demo-button">
            Click me: {count}
          </button>
        </section>
      </main>
    </div>
  )
}

export default App
