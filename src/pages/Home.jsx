import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import { CirclePlusIcon, MoreIcon, TrashIcon } from '../components/Icons'
import { useFlow } from '../context/FlowContext'

export default function Home() {
  const navigate = useNavigate()
  const { properties, removeProperty } = useFlow()
  const [openPropertyMenuId, setOpenPropertyMenuId] = useState(null)

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
      </div>

      {properties.length > 0 && (
        <>
          {properties.map((property) => (
            <div
              key={property.id}
              className="property-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate('/documents')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') navigate('/documents')
              }}
            >
              <span className="property-card-label">{property.address}</span>
              <div className="property-card-menu">
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Property options"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenPropertyMenuId((id) => (id === property.id ? null : property.id))
                  }}
                >
                  <MoreIcon />
                </button>
                {openPropertyMenuId === property.id && (
                  <>
                    <div className="menu-backdrop" onClick={() => setOpenPropertyMenuId(null)} />
                    <div className="menu-popover" onClick={(e) => e.stopPropagation()}>
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
