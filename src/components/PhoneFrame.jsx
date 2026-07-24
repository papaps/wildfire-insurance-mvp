import { useLocation, useNavigate } from 'react-router-dom'
import { ChatIcon, HomeIcon, ProfileIcon } from './Icons'

const TABS = [
  { label: 'Home', path: '/', Icon: HomeIcon },
  { label: 'Chat', path: '/chat', Icon: ChatIcon },
  { label: 'Profile', path: '/profile', Icon: ProfileIcon },
]

// Shared page shell used by every screen: header row (optional back button /
// title / step badge) and scrollable content area. Pass `tabBar` to show the
// Home/Files/Profile bottom nav (only the Home screen uses it).
export default function PhoneFrame({
  title,
  step,
  onBack,
  showBack = true,
  right,
  tabBar = false,
  children,
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function handleBack() {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <div className="phone-shell">
      {(title || showBack) && (
        <div className="phone-header">
          <div className="phone-header-left">
            {showBack && (
              <button className="phone-back" onClick={handleBack} aria-label="Back">
                ‹
              </button>
            )}
          </div>
          {title && <h1 className="phone-title">{title}</h1>}
          <div className="phone-header-right">
            {step && <span className="phone-step">{step}</span>}
            {right}
          </div>
        </div>
      )}

      <div className={tabBar ? 'phone-content phone-content-tabbar-pad' : 'phone-content'}>
        {children}
      </div>

      {tabBar ? (
        <div className="phone-tabbar">
          {TABS.map(({ label, path, Icon }) => {
            const active = pathname === path
            return (
              <button
                key={path}
                className={`phone-tab phone-tab-button${active ? ' phone-tab-active' : ''}`}
                type="button"
                onClick={() => navigate(path)}
                aria-current={active ? 'page' : undefined}
              >
                <span className="phone-tab-icon">
                  <Icon />
                </span>
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
