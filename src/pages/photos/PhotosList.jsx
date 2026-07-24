import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { useFlow, PHOTO_CATEGORIES } from '../../context/FlowContext'

export default function PhotosList() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const { photos, addPhoto } = useFlow()
  const [expandedId, setExpandedId] = useState(categoryId ?? null)

  // Coming back from the camera/preview flow lands on /photos/:categoryId —
  // keep that category expanded instead of collapsing back to the bare list.
  useEffect(() => {
    if (categoryId) setExpandedId(categoryId)
  }, [categoryId])

  function toggle(id) {
    setExpandedId((current) => (current === id ? null : id))
  }

  function handleUploadFiles(id) {
    addPhoto(id)
  }

  return (
    <PhoneFrame title="Upload Photos" onBack={() => navigate('/documents/thank-you')}>
      <div className="section-title">Upload Photos</div>
      <div className="section-subtitle">
        Add photos for each category below to help us assess your property's wildfire risk.
      </div>

      {PHOTO_CATEGORIES.map((cat) => {
        const count = photos[cat.id]?.count ?? 0
        const isExpanded = expandedId === cat.id

        return (
          <div key={cat.id} className="doc-item">
            <button type="button" className="doc-item-header" onClick={() => toggle(cat.id)}>
              <div className="doc-item-title">
                <span className="list-row-label">{cat.label}</span>
                {!isExpanded && (
                  <span className="doc-item-status">
                    {count > 0 ? `${count} photo(s) uploaded` : cat.description}
                  </span>
                )}
              </div>
              <span className={`status-icon${count > 0 ? ' done' : ''}`}>
                {count > 0 ? '✓' : ''}
              </span>
            </button>

            {isExpanded && (
              <div className="doc-item-body">
                <p className="section-subtitle" style={{ margin: '0 0 12px' }}>
                  {cat.description}
                </p>
                <div className="upload-box">
                  <span>{count > 0 ? `${count} photo(s) uploaded` : 'No photos uploaded yet'}</span>
                  <div className="upload-actions">
                    <button
                      className="btn-outline"
                      type="button"
                      onClick={() => handleUploadFiles(cat.id)}
                    >
                      Upload Files
                    </button>
                    <button
                      className="btn-outline"
                      type="button"
                      onClick={() => navigate(`/photos/${cat.id}/camera`)}
                    >
                      Take Photo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      <FooterNav
        onBack={() => navigate('/documents/thank-you')}
        onNext={() => navigate('/photos/validating')}
      />
    </PhoneFrame>
  )
}
