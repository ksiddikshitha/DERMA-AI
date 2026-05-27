import { useState } from 'react'
import axios from 'axios'
import './Booking.css'

function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    appointmentDate: '',
    appointmentTime: '',
    concern: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:3001/api/bookings', formData)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        clinicName: '',
        appointmentDate: '',
        appointmentTime: '',
        concern: ''
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Error booking appointment. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="booking-container">
      <h1>📅 Book an Appointment</h1>
      <p className="subtitle">Schedule your dermatology consultation</p>

      <div className="booking-content">
        <div className="booking-form-wrapper">
          {success && (
            <div className="success-message">
              ✅ Appointment booked successfully! We'll contact you soon.
            </div>
          )}
          {error && <div className="error-message">{error}</div>}

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Your Information</h2>
              
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Appointment Details</h2>
              
              <div className="form-group">
                <label>Clinic Name *</label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  placeholder="e.g., Skin Care Clinic"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time *</label>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Skin Concern</label>
                <textarea
                  name="concern"
                  value={formData.concern}
                  onChange={handleChange}
                  placeholder="Describe your skin concern..."
                  rows="4"
                />
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        </div>

        <div className="booking-info">
          <h2>Booking Information</h2>
          <div className="info-card">
            <h3>What to Expect</h3>
            <ul>
              <li>Initial skin assessment</li>
              <li>Discussion of concerns</li>
              <li>Personalized treatment plan</li>
              <li>Product recommendations</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>Preparation</h3>
            <ul>
              <li>Arrive 15 minutes early</li>
              <li>Bring valid ID</li>
              <li>Clean face without makeup</li>
              <li>List any medications</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>After Consultation</h3>
            <ul>
              <li>Receive prescription if needed</li>
              <li>Get product recommendations</li>
              <li>Schedule follow-up</li>
              <li>Access digital reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
