import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { useFlow } from '../../context/FlowContext'

export default function Chat() {
  const navigate = useNavigate()
  const { chatMessages, addChatMessage } = useFlow()
  const [draft, setDraft] = useState('')

  function handleSend() {
    const text = draft.trim()
    if (!text) return
    addChatMessage('user', text)
    setDraft('')
    setTimeout(() => {
      addChatMessage(
        'assistant',
        "Thanks for the message! This is a mockup, so I can't respond intelligently yet, but in the full app I'd help with that."
      )
    }, 900)
  }

  return (
    <PhoneFrame title="Chat" onBack={() => navigate('/')}>
      <div className="chat-messages">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${
              msg.from === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend()
          }}
          placeholder="Type a message..."
        />
        <button className="btn btn-primary" type="button" onClick={handleSend}>
          Send
        </button>
      </div>
    </PhoneFrame>
  )
}
