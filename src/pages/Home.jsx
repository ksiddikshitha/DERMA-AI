import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to DERMA-AI</h1>
          <p>Your intelligent skin care companion powered by advanced AI</p>
          <Link to="/skin-analysis" className="cta-button">Get Started</Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Skin Analysis</h3>
            <p>Upload an image and get personalized skin care recommendations based on your skin type.</p>
            <Link to="/skin-analysis" className="feature-link">Learn More →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💊</div>
            <h3>Product Suggestions</h3>
            <p>Discover products tailored to your specific skin concerns and type.</p>
            <Link to="/skin-analysis" className="feature-link">Explore →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Doctor Consultation</h3>
            <p>Chat with licensed dermatologists for professional advice in real-time.</p>
            <Link to="/doctor-consultation" className="feature-link">Consult Now →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Find Clinics</h3>
            <p>Locate dermatology clinics and services near you with contact information.</p>
            <Link to="/clinic-finder" className="feature-link">Find Clinics →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Book Appointments</h3>
            <p>Schedule appointments with dermatologists at your preferred clinics.</p>
            <Link to="/booking" className="feature-link">Book Now →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Care</h3>
            <p>Get customized skin care routines and product recommendations.</p>
            <a href="#" className="feature-link">Learn More →</a>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"DERMA-AI helped me understand my skin better and find the right products!"</p>
            <p className="testimonial-author">- Sarah M.</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"The doctor consultation feature is amazing. Professional advice right from home."</p>
            <p className="testimonial-author">- John D.</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Finding nearby clinics and booking appointments is so convenient!"</p>
            <p className="testimonial-author">- Emma L.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Transform Your Skin?</h2>
        <p>Start your journey to healthier skin today with DERMA-AI</p>
        <Link to="/skin-analysis" className="cta-button large">Begin Analysis</Link>
      </section>
    </div>
  )
}

export default Home
