import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronDown, Upload, CameraOutline, CheckCircle, XMark } from '../../components/WildfireIcons'
import { useFlow, PHOTO_CATEGORIES } from '../../context/FlowContext'
import grass from '../../assets/grass.png'

function PhotoCard({ cat, previews, isExpanded, onToggle, onUpload, onTakePhoto, onRemove }) {
  const hasPhotos = previews.length > 0

  return (
    <div className={`wf-doc-card${isExpanded ? ' wf-doc-card-open' : ''}`}>
      <button type="button" className="wf-doc-header" onClick={onToggle} aria-expanded={isExpanded}>
        <span className="wf-doc-title">{cat.label}</span>
        <span className="wf-doc-header-right">
          {hasPhotos && <CheckCircle size={20} />}
          <span className={`wf-doc-chevron${isExpanded ? ' wf-doc-chevron-open' : ''}`}>
            <ChevronDown size={16} />
          </span>
        </span>
      </button>

      <div className="wf-doc-collapse">
        <div className="wf-doc-collapse-inner">
          <div className="wf-doc-divider" />
          <div className="wf-doc-body">
            <p className="wf-doc-question">{cat.description}</p>

            {hasPhotos && (
              <div className="wf-photo-strip">
                {previews.map((id) => (
                  <div key={id} className="wf-photo-thumb">
                    <img src={grass} alt="" />
                    <button
                      type="button"
                      className="wf-photo-thumb-remove"
                      onClick={() => onRemove(id)}
                      aria-label="Remove photo"
                    >
                      <XMark size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="wf-photo-actions">
              <button type="button" className="wf-photo-upload" onClick={onUpload}>
                <Upload size={20} />
                Upload Files
              </button>
              <button type="button" className="wf-photo-take" onClick={onTakePhoto}>
                <CameraOutline size={20} />
                Take Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PhotosList() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const { photos, addPhotos, removePhoto } = useFlow()
  const [expandedId, setExpandedId] = useState(categoryId ?? null)
  const contentRef = useRef(null)

  // Returning from a detected-item tap lands on /photos/:categoryId — expand
  // that card and scroll it into view instead of collapsing to the bare list.
  useEffect(() => {
    if (!categoryId) return
    setExpandedId(categoryId)
    const el = contentRef.current?.querySelector(`[data-card="${categoryId}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [categoryId])

  function toggle(id) {
    setExpandedId((current) => (current === id ? null : id))
  }

  const requiredComplete = PHOTO_CATEGORIES.filter((c) => !c.optional).every(
    (c) => (photos[c.id]?.previews?.length ?? 0) > 0
  )

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-flow-content" ref={contentRef}>
        <div className="wf-flow-heading">
          <h1 className="wf-flow-title">Property Photos</h1>
          <p className="wf-flow-subtitle">
            Add photos of each area to help assess your property's wildfire risk.
          </p>
        </div>

        <div className="wf-doc-list">
          {PHOTO_CATEGORIES.map((cat) => (
            <div key={cat.id} data-card={cat.id}>
              <PhotoCard
                cat={cat}
                previews={photos[cat.id]?.previews ?? []}
                isExpanded={expandedId === cat.id}
                onToggle={() => toggle(cat.id)}
                onUpload={() => addPhotos(cat.id, 5)}
                onTakePhoto={() => addPhotos(cat.id, 1)}
                onRemove={(id) => removePhoto(cat.id, id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="wf-flow-footer">
        <button type="button" className="wf-textbtn" onClick={() => navigate('/documents/thank-you')}>
          Cancel
        </button>
        <button
          type="button"
          className="wf-nextbtn"
          disabled={!requiredComplete}
          onClick={() => navigate('/items/identifying')}
        >
          Next
        </button>
      </div>
    </div>
  )
}
