import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 16,
          }}
        >
          {items.map((item) => (
            <div key={item.id}>
              <div
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #e2e4ea, #cfd2da)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => startEditing(item)}
                  aria-label="Edit label"
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255,255,255,0.9)',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  ✎
                </button>
                {editingId !== item.id && (
                  <div
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#111',
                      background: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    {item.label}
                  </div>
                )}
              </div>
              {editingId === item.id && (
                <input
                  autoFocus
                  value={draftLabel}
                  onChange={(e) => setDraftLabel(e.target.value)}
                  onBlur={() => commitEdit(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitEdit(item.id)
                  }}
                  style={{
                    marginTop: 6,
                    width: '100%',
                    padding: '8px 10px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: 'inherit',
                  }}
                />
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
