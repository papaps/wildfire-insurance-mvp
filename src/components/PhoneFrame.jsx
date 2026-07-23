import { useNavigate } from 'react-router-dom'

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

      <div className="phone-content">{children}</div>

      {tabBar ? (
        <div className="phone-tabbar">
          <div className="phone-tab phone-tab-active">
            <span className="phone-tab-icon">⌂</span>
            <span>Home</span>
          </div>
          <div className="phone-tab">
            <span className="phone-tab-icon">▤</span>
            <span>Files</span>
          </div>
          <div className="phone-tab">
            <span className="phone-tab-icon">◐</span>
            <span>Profile</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
