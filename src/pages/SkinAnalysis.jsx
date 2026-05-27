import { useState } from 'react'
import axios from 'axios'
import './SkinAnalysis.css'

function SkinAnalysis() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!image) {
      setError('Please select an image')
      return
    }

    const formData = new FormData()
    formData.append('image', image)

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/api/analyze-skin', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setAnalysis(response.data)
      setError(null)
    } catch (err) {
      setError('Error analyzing image. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="analysis-container">
      <h1>🔍 Skin Analysis</h1>
      <p className="subtitle">Upload your skin image to get personalized recommendations</p>

      <div className="analysis-content">
        <div className="upload-section">
          <div className="upload-box">
            {preview ? (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
                <button className="change-btn" onClick={() => document.getElementById('imageInput').click()}>
                  Change Image
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <p className="upload-icon">📸</p>
                <p>Click to upload or drag and drop</p>
                <p className="file-info">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
          <button
            className="analyze-button"
            onClick={() => document.getElementById('imageInput').click()}
            disabled={!image}
          >
            Select Image
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          className="analyze-button primary"
          onClick={handleAnalyze}
          disabled={!image || loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Skin'}
        </button>

        {analysis && (
          <div className="analysis-result">
            <h2>Analysis Results</h2>
            <div className="result-grid">
              <div className="result-card">
                <h3>Skin Type</h3>
                <p className="result-value">{analysis.skinType || 'Not detected'}</p>
              </div>
              <div className="result-card">
                <h3>Skin Concerns</h3>
                <p className="result-value">{analysis.concerns || 'None detected'}</p>
              </div>
              <div className="result-card">
                <h3>Confidence</h3>
                <p className="result-value">{analysis.confidence || '0'}%</p>
              </div>
              <div className="result-card">
                <h3>Health Score</h3>
                <p className="result-value">{analysis.healthScore || 'N/A'}/10</p>
              </div>
            </div>

            {analysis.recommendations && (
              <div className="recommendations">
                <h3>Recommendations</h3>
                <ul>
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.products && (
              <div className="products">
                <h3>Suggested Products</h3>
                <div className="product-grid">
                  {analysis.products.map((product, idx) => (
                    <div key={idx} className="product-card">
                      <p className="product-name">{product.name}</p>
                      <p className="product-category">{product.category}</p>
                      <p className="product-match">Match: {product.match}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SkinAnalysis
