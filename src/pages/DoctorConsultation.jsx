import { useState } from 'react'
import axios from 'axios'
import './DoctorConsultation.css'

function DoctorConsultation() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I\'m your virtual dermatologist assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', text: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        message: input,
        history: newMessages
      })

      setMessages([...newMessages, { role: 'assistant', text: response.data.reply }])
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="consultation-container">
      <h1>💬 Doctor Consultation</h1>
      <p className="subtitle">Chat with our AI-powered dermatology assistant</p>

      <div className="consultation-content">
        <div className="consultation-info">
          <h2>How it works</h2>
          <ul>
            <li>Describe your skin concern</li>
            <li>Get instant AI-powered recommendations</li>
            <li>Schedule live consultation if needed</li>
            <li>Access prescription recommendations</li>
          </ul>
        </div>

        <div className="chat-box">
          <div className="messages-container">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="message assistant">
                <div className="message-content typing">Typing...</div>
              </div>
            )}
          </div>

          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question..."
              disabled={loading}
            />
            <button onClick={handleSendMessage} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorConsultation
