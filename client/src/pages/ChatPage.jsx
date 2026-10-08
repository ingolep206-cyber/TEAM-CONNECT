import { useState } from 'react'
import { demoMessages } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function ChatPage() {
  const [messages, setMessages] = useState(demoMessages)
  const [newMessage, setNewMessage] = useState('')
  const { user } = useAuth()

  const handleSendMessage = () => {
    const content = newMessage.trim()

    if (!content) return

    const message = {
      id: Date.now(),
      user_name: user?.user_metadata?.full_name || 'You',
      message: content,
      created_at: new Date().toISOString(),
    }

    setMessages((currentMessages) => [...currentMessages, message])
    setNewMessage('')
  }

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>Team Chats</h2>
      </div>

      <div className="chat-card panel-card">
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className="chat-message">
              <div className="chat-user">{message.user_name}</div>
              <div className="chat-bubble">{message.message}</div>
              <small>{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Type your message..."
          />
          <button type="button" className="primary-btn" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
