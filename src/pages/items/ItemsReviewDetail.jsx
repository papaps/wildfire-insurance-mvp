import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { EditIcon } from '../../components/Icons'
import { useFlow, PHOTO_CATEGORIES } from '../../context/FlowContext'

export default function ItemsReviewDetail() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const { identifiedItems, renameIdentifiedItem } = useFlow()
  const [editingId, setEditingId] = useState(null)
  const [draftLabel, setDraftLabel] = useState('')

  const category = PHOTO_CATEGORIES.find((c) => c.id === categoryId)
  const items = identifiedItems[categoryId] ?? []

  function startEditing(item) {
    setEditingId(item.id)
    setDraftLabel(item.label)
  }

  function commitEdit(itemId) {
    if (draftLabel.trim()) {
      renameIdentifiedItem(categoryId, itemId, draftLabel.trim())
    }
    setEditingId(null)
  }

  return (
    <PhoneFrame title={category?.label ?? 'Items'} onBack={() => navigate('/items/review')}>
      {items.length === 0 ? (
        <div className="section-subtitle">No items detected in this category.</div>
      ) : (
        <div className="item-photo-grid">
          {items.map((item) => (
            <div key={item.id} className="item-photo-card">
              <div className="item-photo-thumb">
                <button
                  type="button"
                  className="item-edit-btn"
                  onClick={() => startEditing(item)}
                  aria-label={`Rename ${item.label}`}
                  title="Rename item"
                >
                  <EditIcon />
                </button>
              </div>
              {editingId === item.id ? (
                <input
                  autoFocus
                  className="item-photo-input"
                  value={draftLabel}
                  onChange={(e) => setDraftLabel(e.target.value)}
                  onBlur={() => commitEdit(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitEdit(item.id)
                  }}
                />
              ) : (
                <div className="item-photo-label">{item.label}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <FooterNav
        backLabel="Back"
        onBack={() => navigate('/items/review')}
        nextLabel="Done"
        onNext={() => navigate('/items/review')}
      />
    </PhoneFrame>
  )
}
