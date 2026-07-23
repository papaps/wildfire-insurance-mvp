import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { useFlow, CHECKLIST_ITEMS } from '../../context/FlowContext'

export default function MarkItemComplete() {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const { updateChecklistItem } = useFlow()
  const item = CHECKLIST_ITEMS.find((i) => i.id === itemId)

  const [photo, setPhoto] = useState(null)
  const [receipt, setReceipt] = useState(null)
  const [markedDone, setMarkedDone] = useState(false)

  function attachPhoto() {
    setPhoto(`IMG_${Math.floor(Math.random() * 9999999)}.jpg`)
  }

  function attachReceipt() {
    setReceipt(`IMG_${Math.floor(Math.random() * 9999999)}.jpg`)
  }

  function handleSubmit() {
    if (markedDone) {
      updateChecklistItem(itemId, { done: true })
      navigate('/checklist/items')
      return
    }
    updateChecklistItem(itemId, { photo: photo ?? null, receipt: receipt ?? null })
    navigate(`/checklist/items/${itemId}/review`)
  }

  return (
    <PhoneFrame title="Mark item complete" onBack={() => navigate('/checklist/items')}>
      <div className="section-title">{item?.label ?? 'Checklist item'}</div>
      <div className="section-subtitle">
        {item ? `Estimated cost ${item.cost}` : ''}
      </div>

      {photo ? (
        <div className="list-row">
          <div className="list-row-main">
            <span className="list-row-label">{photo}</span>
            <span className="list-row-sub">Photo attached</span>
          </div>
          <button
            type="button"
            className="btn-outline"
            onClick={() => setPhoto(null)}
            aria-label="Remove photo"
          >
            ✕
          </button>
        </div>
      ) : (
        <button type="button" className="upload-box" onClick={attachPhoto}>
          <span>+ Add photo as proof</span>
        </button>
      )}

      {receipt ? (
        <div className="list-row">
          <div className="list-row-main">
            <span className="list-row-label">{receipt}</span>
            <span className="list-row-sub">Receipt attached</span>
          </div>
          <button
            type="button"
            className="btn-outline"
            onClick={() => setReceipt(null)}
            aria-label="Remove receipt"
          >
            ✕
          </button>
        </div>
      ) : (
        <button type="button" className="upload-box" onClick={attachReceipt}>
          <span>+ Attach receipt (optional)</span>
        </button>
      )}

      <label className="radio-option" style={{ marginBottom: 16 }}>
        <input
          type="checkbox"
          checked={markedDone}
          onChange={(e) => setMarkedDone(e.target.checked)}
        />
        Mark as done in my checklist
      </label>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', flex: 'none' }}
        onClick={handleSubmit}
      >
        Submit for AI review
      </button>
      <div className="section-subtitle" style={{ textAlign: 'center' }}>
        AI checks your photo before this item is marked complete.
      </div>
    </PhoneFrame>
  )
}
