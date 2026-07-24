import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import { HelpIcon, InfoIcon, LogOutIcon, ProfileIcon, SettingsIcon } from '../components/Icons'
import { useAuth } from '../context/AuthContext'

// Items that are shown for parity with the full app but aren't wired up yet.
const MENU_ITEMS = [
  { label: 'My Profile', Icon: ProfileIcon },
  { label: 'Settings', Icon: SettingsIcon },
  { label: 'FAQ', Icon: HelpIcon },
  { label: 'About App', Icon: InfoIcon },
]

function getInitials(name, email) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (email.slice(0, 2) || '?').toUpperCase()
}

export default function Profile() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const meta = user?.user_metadata ?? {}
  const email = user?.email ?? ''
  const fullName = [meta.first_name, meta.last_name].filter(Boolean).join(' ')
  const displayName = fullName || (email ? email.split('@')[0] : 'Your Account')
  const initials = getInitials(fullName || displayName, email)

  // Signing out clears the session; RequireAuth then redirects to /login.
  async function handleLogout() {
    await signOut()
  }

  return (
    <PhoneFrame title="Profile" tabBar onBack={() => navigate('/')}>
      <div className="profile-user">
        <div className="letter-avatar" aria-hidden="true">
          {initials}
        </div>
        <div className="profile-user-info">
          <span className="profile-user-name">{displayName}</span>
          {email && <span className="profile-user-email">{email}</span>}
        </div>
      </div>

      <div className="profile-menu">
        {MENU_ITEMS.map(({ label, Icon }) => (
          <div
            key={label}
            className="profile-menu-item"
            title="Not available in this demo"
          >
            <span className="profile-menu-icon">
              <Icon />
            </span>
            {label}
          </div>
        ))}
      </div>

      <button type="button" className="profile-logout" onClick={handleLogout}>
        <span className="profile-menu-icon">
          <LogOutIcon />
        </span>
        Logout
      </button>
    </PhoneFrame>
  )
}
