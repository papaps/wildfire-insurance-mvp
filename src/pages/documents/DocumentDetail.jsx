import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { useFlow, DOCUMENT_TYPES } from '../../context/FlowContext'

export default function DocumentDetail() {
  const navigate = useNavigate()
  const { docId } = useParams()
  const { documents, updateDocument } = useFlow()

  const doc = DOCUMENT_TYPES.find((d) => d.id === docId)
  const docState = documents[docId] || {}

  if (!doc) {
    return (
      <PhoneFrame title="Upload Documents" step="Step 2 of 3" onBack={() => navigate('/documents')}>
        <p>Document not found.</p>
      </PhoneFrame>
    )
  }

  function handleHasIt(val) {
    updateDocument(docId, { hasIt: val, answered: true })
  }

  return (
    <PhoneFrame title="Upload Documents" step="Step 2 of 3" onBack={() => navigate('/documents')}>
      {DOCUMENT_TYPES.map((d) => {
        const isActive = d.id === docId
        return (
          <div
            key={d.id}
            className="list-row"
            style={{
              cursor: 'default',
              borderLeft: isActive ? '3px solid #111' : '3px solid transparent',
              paddingLeft: isActive ? 9 : 12,
            }}
          >
            <div className="list-row-main">
              <span
                className="list-row-label"
                style={{ fontWeight: isActive ? 700 : 500 }}
              >
                {d.label}
              </span>
            </div>
            <span className={`status-icon${documents[d.id]?.answered ? ' done' : ''}`}>
              {documents[d.id]?.answered ? '✓' : ''}
            </span>
          </div>
        )
      })}

      <div className="section-title" style={{ fontSize: 16, marginTop: 16 }}>
        {doc.question}
      </div>

      <div className="radio-row">
        <label className="radio-option">
          <input
            type="radio"
            name="hasIt"
            checked={docState.hasIt === true}
            onChange={() => handleHasIt(true)}
          />
          Yes
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="hasIt"
            checked={docState.hasIt === false}
            onChange={() => handleHasIt(false)}
          />
          No
        </label>
      </div>

      {docState.hasIt === true && (
        <>
          {doc.description && <p className="section-subtitle">{doc.description}</p>}
          <div className="upload-box">
            <span>jpg, png, pdf, under 25mb</span>
            <button
              className="btn-outline"
              type="button"
              onClick={() => updateDocument(docId, { uploaded: true })}
            >
              {docState.uploaded ? 'Uploaded' : 'Upload Files'}
            </button>
          </div>
        </>
      )}

      {docState.hasIt === false && doc.helpText && (
        <a className="help-link" href="#">
          {doc.helpText}
        </a>
      )}

      <FooterNav onBack={() => navigate('/documents')} onNext={() => navigate('/documents')} />
    </PhoneFrame>
  )
}
