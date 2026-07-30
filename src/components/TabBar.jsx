import { useNavigate } from 'react-router-dom'
import { Home, MessageSquare, UserRound } from './WildfireIcons'

// Floating pill bottom navigation used by the Home, Chat and Profile screens.
// `active` is one of 'home' | 'chat' | 'profile'.
export default function TabBar({ active = 'home' }) {
  const navigate = useNavigate()

  const tabs = [
    { key: 'home', to: '/', label: 'Home' },
    { key: 'chat', to: '/chat', label: 'Chat' },
    { key: 'profile', to: '/profile', label: 'Profile' },
  ]

  return (
    <nav className="wf-tabbar" aria-label="Primary">
      {tabs.map((tab) => {
        const isActive = tab.key === active
        return (
          <button
            key={tab.key}
            type="button"
            className={`wf-tab${isActive ? ' wf-tab-active' : ''}`}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => navigate(tab.to)}
          >
            {tab.key === 'home' && <Home size={24} filled={isActive} />}
            {tab.key === 'chat' && <MessageSquare size={24} filled={isActive} />}
            {tab.key === 'profile' && <UserRound size={24} filled={isActive} />}
          </button>
        )
      })}
    </nav>
  )
}
