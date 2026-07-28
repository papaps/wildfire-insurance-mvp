import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepProgress from '../../components/StepProgress'
import WfRadio from '../../components/WfRadio'
import { ChevronDown, Upload, CheckCircle, FilePdf, Trash2 } from '../../components/WildfireIcons'
import { useFlow, DOCUMENT_TYPES } from '../../context/FlowContext'

function isDocComplete(docState) {
  if (!docState?.answered) return false
  return docState.hasIt === false || docState.uploaded
}

function DocumentCard({ doc, docState, isExpanded, onToggle }) {
  const { updateDocument } = useFlow()
  const fileInputRef = useRef(null)
  const complete = isDocComplete(docState)

  function handleHasIt(val) {
    updateDocument(doc.id, { hasIt: val, answered: true })
  }

  function handleFileChosen(e) {
    const file = e.target.files?.[0]
    if (!file) return
    updateDocument(doc.id, { uploaded: true, fileName: file.name })
    e.target.value = ''
  }

  function removeFile() {
    updateDocument(doc.id, { uploaded: false, fileName: null })
  }

  return (
    <div className={`wf-doc-card${isExpanded ? ' wf-doc-card-open' : ''}`}>
      <button
        type="button"
        className="wf-doc-header"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className="wf-doc-title">{doc.label}</span>
        <span className="wf-doc-header-right">
          {complete && <CheckCircle size={20} />}
          <span className={`wf-doc-chevron${isExpanded ? ' wf-doc-chevron-open' : ''}`}>
            <ChevronDown size={16} />
          </span>
        </span>
      </button>

      <div className="wf-doc-collapse">
        <div className="wf-doc-collapse-inner">
          <div className="wf-doc-divider" />
          <div className="wf-doc-body">
            <p className="wf-doc-question">{doc.question}</p>
            <div className="wf-radio-row">
              <WfRadio
                name={`hasIt-${doc.id}`}
                label="Yes"
                checked={docState.hasIt === true}
                onChange={() => handleHasIt(true)}
              />
              <WfRadio
                name={`hasIt-${doc.id}`}
                label="No"
                checked={docState.hasIt === false}
                onChange={() => handleHasIt(false)}
              />
            </div>

            {docState.hasIt === true && !docState.uploaded && (
              <div className="wf-upload">
                <button
                  type="button"
                  className="wf-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={20} />
                  Upload File
                </button>
                <p className="wf-upload-caption">JPG, PNG, PDF, DOCX up to 10 MB</p>
              </div>
            )}

            {docState.hasIt === true && docState.uploaded && (
              <div className="wf-file-row">
                <FilePdf size={24} />
                <span className="wf-file-name">{docState.fileName || 'Uploaded file'}</span>
                <button
                  type="button"
                  className="wf-file-delete"
                  onClick={removeFile}
                  aria-label="Remove file"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,.docx"
              hidden
              onChange={handleFileChosen}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DocumentsList() {
  const navigate = useNavigate()
  const { documents } = useFlow()
  const [expandedId, setExpandedId] = useState(null)

  const allComplete = DOCUMENT_TYPES.every((doc) => isDocComplete(documents[doc.id]))

  function toggle(id) {
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-flow-top">
        <StepProgress label="Step 2 of 2" value={1} />
      </div>

      <div className="wf-flow-content">
        <h1 className="wf-flow-title">Upload Documents</h1>

        <div className="wf-doc-list">
          {DOCUMENT_TYPES.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              docState={documents[doc.id] || {}}
              isExpanded={expandedId === doc.id}
              onToggle={() => toggle(doc.id)}
            />
          ))}
        </div>
      </div>

      <div className="wf-flow-footer">
        <button
          type="button"
          className="wf-textbtn"
          onClick={() => navigate('/property-details')}
        >
          Back
        </button>
        <button
          type="button"
          className="wf-nextbtn"
          disabled={!allComplete}
          onClick={() => navigate('/documents/thank-you')}
        >
          Next
        </button>
      </div>
    </div>
  )
}
