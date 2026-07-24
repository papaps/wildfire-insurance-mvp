import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { ChevronDownIcon, UploadIcon } from '../../components/Icons'
import { useFlow, DOCUMENT_TYPES } from '../../context/FlowContext'

function isDocComplete(docState) {
  if (!docState?.answered) return false
  return docState.hasIt === false || docState.uploaded
}

export default function DocumentsList() {
  const navigate = useNavigate()
  const { documents, updateDocument } = useFlow()
  const [expandedId, setExpandedId] = useState(null)

  const completeCount = DOCUMENT_TYPES.filter((doc) => isDocComplete(documents[doc.id])).length
  const allComplete = completeCount === DOCUMENT_TYPES.length

  function toggle(id) {
    setExpandedId((current) => (current === id ? null : id))
  }

  function handleHasIt(docId, val) {
    updateDocument(docId, { hasIt: val, answered: true })
  }

  return (
    <PhoneFrame step="Step 2 of 2" onBack={() => navigate('/property-details')}>
      <div className="section-title doc-list-title">Upload Documents</div>

      {DOCUMENT_TYPES.map((doc) => {
        const docState = documents[doc.id] || {}
        const isExpanded = expandedId === doc.id
        const statusLabel = !docState.answered
          ? null
          : docState.hasIt === false
          ? 'No Uploaded Document'
          : docState.uploaded
          ? 'Uploaded Document'
          : 'No Uploaded Document'

        return (
          <div key={doc.id} className="doc-item">
            <button type="button" className="doc-item-header" onClick={() => toggle(doc.id)}>
              <div className="doc-item-title">
                <span className="list-row-label">{doc.label}</span>
                {statusLabel && <span className="doc-item-status">{statusLabel}</span>}
              </div>
              <span className={`doc-item-chevron${isExpanded ? ' doc-item-chevron-up' : ''}`}>
                <ChevronDownIcon />
              </span>
            </button>

            {isExpanded && (
              <div className="doc-item-body">
                <p className="doc-item-question">{doc.question}</p>
                <div className="radio-row">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name={`hasIt-${doc.id}`}
                      checked={docState.hasIt === true}
                      onChange={() => handleHasIt(doc.id, true)}
                    />
                    Yes
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name={`hasIt-${doc.id}`}
                      checked={docState.hasIt === false}
                      onChange={() => handleHasIt(doc.id, false)}
                    />
                    No
                  </label>
                </div>

                {docState.hasIt === true && (
                  <>
                    {doc.description && <p className="section-subtitle">{doc.description}</p>}
                    <button
                      type="button"
                      className="doc-upload-btn"
                      onClick={() => updateDocument(doc.id, { uploaded: true })}
                    >
                      <UploadIcon />
                      {docState.uploaded ? 'Uploaded' : 'Upload files'}
                    </button>
                    <p className="doc-upload-caption">jpg, png, pdf, docx accepted</p>
                  </>
                )}

                {docState.hasIt === false && doc.helpText && (
                  <span
                    className="help-link help-link-disabled"
                    title="Not available yet"
                  >
                    {doc.helpText}
                  </span>
                )}
              </div>
            )}
          </div>
        )
      })}

      <FooterNav
        onBack={() => navigate('/property-details')}
        onNext={() => navigate('/documents/thank-you')}
        nextDisabled={!allComplete}
        progress={0.5 + (completeCount / DOCUMENT_TYPES.length) * 0.5}
      />
    </PhoneFrame>
  )
}
