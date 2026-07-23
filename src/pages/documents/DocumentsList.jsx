import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { useFlow, DOCUMENT_TYPES } from '../../context/FlowContext'

export default function DocumentsList() {
  const navigate = useNavigate()
  const { documents } = useFlow()

  return (
    <PhoneFrame title="Upload Documents" step="Step 2 of 3" onBack={() => navigate('/property-details')}>
      <div className="section-title">Upload your documents</div>
      <p className="section-subtitle">
        We use these documents to help assess your property's wildfire risk.
      </p>

      {DOCUMENT_TYPES.map((doc) => (
        <button
          key={doc.id}
          className="list-row"
          onClick={() => navigate(`/documents/${doc.id}`)}
        >
          <div className="list-row-main">
            <span className="list-row-label">{doc.label}</span>
          </div>
          <span className={`status-icon${documents[doc.id]?.answered ? ' done' : ''}`}>
            {documents[doc.id]?.answered ? '✓' : ''}
          </span>
        </button>
      ))}

      <FooterNav
        onBack={() => navigate('/property-details')}
        onNext={() => navigate('/documents/thank-you')}
      />
    </PhoneFrame>
  )
}
