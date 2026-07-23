import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import { useAuth } from '../context/AuthContext'
import { useFlow } from '../context/FlowContext'

export default function Home() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { properties, removeProperty } = useFlow()

  async function handleSignOut() {
    await signOut()
  }

  function handleDownload(filename) {
    alert(`This is a mockup — "${filename}" isn't a real file yet.`)
  }

  return (
    <PhoneFrame
      title="Home"
      showBack={false}
      tabBar
      right={
        <span className="help-link" style={{ marginBottom: 0 }} onClick={handleSignOut}>
          Sign out
        </span>
      }
    >
      {properties.length > 0 && (
        <>
          <div className="section-title" style={{ fontSize: 15 }}>
            Your properties
          </div>
          {properties.map((property) => (
            <div key={property.id} className="list-row" style={{ cursor: 'default' }}>
              <div className="list-row-main">
                <span className="list-row-label">{property.filename}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  type="button"
                  className="btn-outline"
                  aria-label="Download"
                  onClick={() => handleDownload(property.filename)}
                >
                  ⬇
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  aria-label="Delete"
                  onClick={() => removeProperty(property.id)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="center-screen">
        <button className="btn-outline" onClick={() => navigate('/property-details')}>
          + Add your property
        </button>
      </div>
    </PhoneFrame>
  )
}
