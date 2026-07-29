import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, XMark, PenEdit, Plus } from '../../components/WildfireIcons'
import { useFlow, PHOTO_CATEGORIES } from '../../context/FlowContext'
import grass from '../../assets/grass.png'

export default function ItemsReviewDetail() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const { identifiedItems, renameIdentifiedItem, removeIdentifiedItem, addIdentifiedItem } = useFlow()
  const [editingId, setEditingId] = useState(null)
  const [draftLabel, setDraftLabel] = useState('')

  const category = PHOTO_CATEGORIES.find((c) => c.id === categoryId)
  const items = identifiedItems[categoryId] ?? []

  function startEditing(item) {
    setEditingId(item.id)
    setDraftLabel(item.label)
  }

  function commitEdit(itemId) {
    if (draftLabel.trim()) renameIdentifiedItem(categoryId, itemId, draftLabel.trim())
    setEditingId(null)
  }

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-topbar">
        <button
          type="button"
          className="wf-iconbtn"
          onClick={() => navigate('/items/review')}
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="wf-topbar-title">{category?.label ?? 'Items'}</span>
      </div>

      <div className="wf-flow-content">
        {items.length === 0 ? (
          <p className="wf-flow-subtitle">No items detected in this category yet.</p>
        ) : (
          <div className="wf-detail-grid">
            {items.map((item) => (
              <div key={item.id} className="wf-detail-card">
                <div className="wf-detail-thumb">
                  <img src={grass} alt="" />
                  <button
                    type="button"
                    className="wf-detail-remove"
                    onClick={() => removeIdentifiedItem(categoryId, item.id)}
                    aria-label={`Remove ${item.label}`}
                  >
                    <XMark size={20} />
                  </button>
                </div>
                <div className="wf-detail-labelrow">
                  {editingId === item.id ? (
                    <input
                      autoFocus
                      className="wf-detail-input"
                      value={draftLabel}
                      onChange={(e) => setDraftLabel(e.target.value)}
                      onBlur={() => commitEdit(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitEdit(item.id)
                        else if (e.key === 'Escape') setEditingId(null)
                      }}
                    />
                  ) : (
                    <span className="wf-detail-label">{item.label}</span>
                  )}
                  <button
                    type="button"
                    className="wf-detail-edit"
                    onClick={() => startEditing(item)}
                    aria-label={`Rename ${item.label}`}
                  >
                    <PenEdit size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          className="wf-detail-addmore"
          onClick={() => addIdentifiedItem(categoryId)}
        >
          <Plus size={24} />
          Add more photos
        </button>
      </div>
    </div>
  )
}
