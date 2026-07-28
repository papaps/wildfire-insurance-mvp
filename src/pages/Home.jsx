import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFlow } from '../context/FlowContext'
import TabBar from '../components/TabBar'
import { EllipsisVertical, Plus, Trash2 } from '../components/WildfireIcons'
import houseImg from '../assets/house.png'

export default function Home() {
  const navigate = useNavigate()
  const { properties, removeProperty } = useFlow()
  const [openMenuId, setOpenMenuId] = useState(null)

  async function handleDelete(id) {
    setOpenMenuId(null)
    try {
      await removeProperty(id)
    } catch {
      alert('Failed to delete property. Please try again.')
    }
  }

  return (
    <div className="wf-screen">
      <header className="wf-page-header">
        <h1 className="wf-welcome">Welcome, [user]</h1>
      </header>

      <div className="wf-content">
        {properties.map((property) => (
          <div
            key={property.id}
            className="wf-property-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/documents')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate('/documents')
            }}
          >
            <img className="wf-property-thumb" src={houseImg} alt="" />
            <span className="wf-property-label">{property.address}</span>
            <button
              type="button"
              className="wf-iconbtn"
              aria-label="Property options"
              aria-haspopup="menu"
              aria-expanded={openMenuId === property.id}
              onClick={(e) => {
                e.stopPropagation()
                setOpenMenuId((cur) => (cur === property.id ? null : property.id))
              }}
            >
              <EllipsisVertical size={20} />
            </button>

            {openMenuId === property.id && (
              <div
                className="wf-menu-popover"
                role="menu"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="wf-menu-delete"
                  role="menuitem"
                  onClick={() => handleDelete(property.id)}
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          className="wf-add-property"
          onClick={() => navigate('/property-details')}
        >
          <Plus size={24} />
          Add your property
        </button>
      </div>

      {openMenuId !== null && (
        <div
          onClick={() => setOpenMenuId(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 5 }}
          aria-hidden="true"
        />
      )}

      <TabBar active="home" />
    </div>
  )
}
