import { useState, useEffect } from 'react'
import axios from 'axios'
import './ClinicFinder.css'

function ClinicFinder() {
  const [clinics, setClinics] = useState([])
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchClinics()
  }, [])

  const fetchClinics = async (query = '') => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3001/api/clinics', {
        params: { location: query }
      })
      setClinics(response.data.clinics || [])
      setError(null)
    } catch (err) {
      setError('Error fetching clinics. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchClinics(location)
  }

  return (
    <div className="clinic-container">
      <h1>🏥 Find Clinics Near You</h1>
      <p className="subtitle">Locate and book dermatology clinics in your area</p>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or location"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="clinics-grid">
        {clinics.length > 0 ? (
          clinics.map((clinic, idx) => (
            <div key={idx} className="clinic-card">
              <div className="clinic-header">
                <h3>{clinic.name}</h3>
                <span className="rating">⭐ {clinic.rating}</span>
              </div>
              <p className="clinic-address">📍 {clinic.address}</p>
              <p className="clinic-phone">📞 {clinic.phone}</p>
              <p className="clinic-hours">🕐 {clinic.hours}</p>
              <div className="clinic-specialties">
                {clinic.specialties && clinic.specialties.map((spec, i) => (
                  <span key={i} className="specialty-tag">{spec}</span>
                ))}
              </div>
              <button className="book-button">Book Appointment</button>
            </div>
          ))
        ) : (
          !loading && <p className="no-results">No clinics found. Try searching in a different location.</p>
        )}
      </div>
    </div>
  )
}

export default ClinicFinder
