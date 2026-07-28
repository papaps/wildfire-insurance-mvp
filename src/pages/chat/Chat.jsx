import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFlow } from '../../context/FlowContext'
import { ChevronLeft, Camera, Mic, ImageIcon } from '../../components/WildfireIcons'

export default function Chat() {
  const navigate = useNavigate()
  const { chatMessages, addChatMessage } = useFlow()
  const [draft, setDraft] = useState('')
  const bottomRef = useRef(null)

  // Keep the latest message in view as the conversation grows.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [chatMessages])

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
    <div className="wf-screen">
      <header className="wf-topbar">
        <button
          type="button"
          className="wf-iconbtn"
          aria-label="Back"
          onClick={() => navigate('/')}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="wf-topbar-title">Chat</span>
      </header>

      <div className="wf-chat-messages">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`wf-bubble ${
              msg.from === 'user' ? 'wf-bubble-user' : 'wf-bubble-assistant'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="wf-chat-inputbar">
        <button type="button" className="wf-cam-btn" aria-label="Camera">
          <Camera size={20} />
        </button>
        <input
          className="wf-chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend()
          }}
          placeholder="Message..."
          aria-label="Message"
        />
        <div className="wf-chat-actions">
          <button type="button" className="wf-iconbtn" aria-label="Voice message">
            <Mic size={20} />
          </button>
          <button type="button" className="wf-iconbtn" aria-label="Add image">
            <ImageIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
