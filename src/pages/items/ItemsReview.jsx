import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, CheckCircle, Plus, CheckCircleLarge } from '../../components/WildfireIcons'
import { useFlow, PHOTO_CATEGORIES } from '../../context/FlowContext'
import grass from '../../assets/grass.png'

function ReviewThumb({ count }) {
  if (count === 0) {
    return (
      <span className="wf-review-thumb wf-review-thumb-empty">
        <Plus size={22} />
      </span>
    )
  }
  // A small pile of grass cards; deeper stack reads as "more photos".
  const layers = Math.min(count, 3)
  return (
    <span className={`wf-review-thumb wf-review-stack-${layers}`}>
      {Array.from({ length: layers }, (_, i) => (
        <img
          key={i}
          src={grass}
          alt=""
          style={{ zIndex: layers - i, transform: `translate(${i * 4}px, ${i * 4}px)` }}
        />
      ))}
    </span>
  )
}

export default function ItemsReview() {
  const navigate = useNavigate()
  const { identifiedItems } = useFlow()
  const [sheetMounted, setSheetMounted] = useState(false)
  const [sheetVisible, setSheetVisible] = useState(false)

  function openSheet() {
    setSheetMounted(true)
    requestAnimationFrame(() => setSheetVisible(true))
  }

  function closeSheet() {
    setSheetVisible(false)
    setTimeout(() => setSheetMounted(false), 300)
  }

  function confirm() {
    navigate('/items/generating')
  }

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-flow-content">
        <div className="wf-flow-heading">
          <h1 className="wf-flow-title">Review AI-detected Items</h1>
          <p className="wf-flow-subtitle">
            Please review the items we've identified in your photos and confirm whether they're
            correct before continuing.
          </p>
        </div>

        <div className="wf-doc-list">
          {PHOTO_CATEGORIES.map((cat) => {
            const count = identifiedItems[cat.id]?.length ?? 0
            return (
              <button
                key={cat.id}
                type="button"
                className="wf-review-row"
                onClick={() => navigate(`/items/review/${cat.id}`)}
              >
                <ReviewThumb count={count} />
                <span className="wf-review-main">
                  <span className="wf-review-label">{cat.label}</span>
                  {count > 0 && (
                    <span className="wf-review-sub">
                      {count} {count === 1 ? 'item' : 'items'} detected
                    </span>
                  )}
                </span>
                <span className="wf-review-right">
                  {count > 0 && <CheckCircle size={20} />}
                  <span className="wf-review-chevron">
                    <ChevronDown size={16} />
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="wf-flow-footer">
        <button type="button" className="wf-textbtn" onClick={() => navigate('/photos')}>
          Cancel
        </button>
        <button type="button" className="wf-nextbtn" onClick={openSheet}>
          Done
        </button>
      </div>

      {sheetMounted && (
        <div className="wf-sheet-layer">
          <div
            className={`wf-sheet-backdrop${sheetVisible ? ' show' : ''}`}
            onClick={closeSheet}
          />
          <div className={`wf-sheet${sheetVisible ? ' show' : ''}`} role="dialog" aria-modal="true">
            <div className="wf-sheet-grabber" />
            <div className="wf-sheet-body">
              <CheckCircleLarge size={70} />
              <h2 className="wf-flow-title">Confirm items</h2>
              <p className="wf-loader-subtitle">
                AI can make mistakes. Confirm that you've reviewed the detected items and that
                they're correct.
              </p>
            </div>
            <div className="wf-sheet-actions">
              <button type="button" className="wf-sheet-cancel" onClick={closeSheet}>
                Cancel
              </button>
              <button type="button" className="wf-nextbtn wf-sheet-confirm" onClick={confirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
