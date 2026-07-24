import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import { CirclePlusIcon, EditIcon, LogOutIcon, MenuIcon, MoreIcon, TrashIcon } from '../components/Icons'
import { useAuth } from '../context/AuthContext'
import { useFlow } from '../context/FlowContext'

export default function Home() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { properties, removeProperty } = useFlow()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openPropertyMenuId, setOpenPropertyMenuId] = useState(null)

  async function handleSignOut() {
    await signOut()
  }

  async function handleDelete(id) {
    setOpenPropertyMenuId(null)
    try {
      await removeProperty(id)
    } catch (error) {
      alert('Failed to delete property. Please try again.')
    }
  }

  return (
    <PhoneFrame showBack={false} tabBar>
      <div className="home-header">
        <h1 className="home-title">Home</h1>
        <div className="home-menu">
          <button
            type="button"
            className="icon-btn"
            aria-label="Menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon />
          </button>
          {menuOpen && (
            <>
              <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
              <div className="menu-popover">
                <button type="button" className="menu-item" onClick={handleSignOut}>
                  <LogOutIcon />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {properties.length > 0 && (
        <>
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <span className="property-card-label">{property.address}</span>
              <div className="property-card-menu">
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Property options"
                  onClick={() =>
                    setOpenPropertyMenuId((id) => (id === property.id ? null : property.id))
                  }
                >
                  <MoreIcon />
                </button>
                {openPropertyMenuId === property.id && (
                  <>
                    <div className="menu-backdrop" onClick={() => setOpenPropertyMenuId(null)} />
                    <div className="menu-popover">
                      <button type="button" className="menu-item" disabled title="Not available yet">
                        <EditIcon />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="menu-item menu-item-danger"
                        onClick={() => handleDelete(property.id)}
                      >
                        <TrashIcon />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      <button type="button" className="add-property-box" onClick={() => navigate('/property-details')}>
        <CirclePlusIcon />
        Add your property
      </button>
    </PhoneFrame>
  )
}
