import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { useFlow, PHOTO_CATEGORIES } from '../../context/FlowContext'

export default function PhotoCategoryDetail() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const { photos, addPhoto } = useFlow()

  const category = PHOTO_CATEGORIES.find((c) => c.id === categoryId)
  const count = photos[categoryId]?.count ?? 0

  function handleUploadFiles() {
    addPhoto(categoryId)
    navigate('/photos')
  }

  if (!category) {
    return (
      <PhoneFrame title="Upload Photos" onBack={() => navigate('/photos')}>
        <div className="section-subtitle">Category not found.</div>
        <FooterNav onBack={() => navigate('/photos')} onNext={() => navigate('/photos')} />
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame title="Upload Photos" onBack={() => navigate('/photos')}>
      {PHOTO_CATEGORIES.map((cat) => {
        const isActive = cat.id === category.id
        const catCount = photos[cat.id]?.count ?? 0
        return (
          <div key={cat.id} className="list-row" style={{ cursor: 'default' }}>
            <div className="list-row-main">
              <span
                className="list-row-label"
                style={isActive ? { color: '#111', fontWeight: 700 } : { color: '#999', fontWeight: 500 }}
              >
                {cat.label}
              </span>
              {isActive && (
                <span className="list-row-sub">{cat.description}</span>
              )}
            </div>
            <span className={`status-icon${catCount > 0 ? ' done' : ''}`}>
              {catCount > 0 ? '✓' : ''}
            </span>
          </div>
        )
      })}

      <div className="upload-box">
        <span>{count > 0 ? `${count} photo(s) uploaded` : 'No photos uploaded yet'}</span>
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button className="btn-outline" type="button" onClick={handleUploadFiles} style={{ flex: 1, justifyContent: 'center' }}>
            Upload Files
          </button>
          <button
            className="btn-outline"
            type="button"
            onClick={() => navigate(`/photos/${categoryId}/camera`)}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            Take Photo
          </button>
        </div>
      </div>

      <FooterNav onBack={() => navigate('/photos')} onNext={() => navigate('/photos')} />
    </PhoneFrame>
  )
}
