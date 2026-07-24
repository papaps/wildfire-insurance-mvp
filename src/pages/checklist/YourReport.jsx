import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { useFlow, CHECKLIST_ITEMS } from '../../context/FlowContext'

export default function YourReport() {
  const navigate = useNavigate()
  const { checklistProgress, reportInclusions, toggleReportInclusion } = useFlow()

  const completedCount = CHECKLIST_ITEMS.filter((item) => checklistProgress[item.id]?.done).length
  const today = new Date().toLocaleDateString()

  return (
    <PhoneFrame title="Your report" onBack={() => navigate('/checklist/items')}>
      <div className="section-title">Wildfire Mitigation Report</div>
      <p className="section-subtitle">12 Maple Court, Kelowna BC · {today}</p>

      <div className="section-title" style={{ fontSize: 15, marginTop: 8 }}>
        What's included
      </div>

      <div className="list-row" style={{ cursor: 'default' }}>
        <div className="list-row-main">
          <span className="list-row-label">Risk score &amp; summary</span>
          <span className="list-row-sub">AI assessment with disclaimer</span>
        </div>
        <span className="status-pill">Included</span>
      </div>

      <div className="list-row" style={{ cursor: 'default' }}>
        <div className="list-row-main">
          <span className="list-row-label">Completed fixes ({completedCount})</span>
          <span className="list-row-sub">With completion dates</span>
        </div>
        <span className="status-pill">Included</span>
      </div>

      <div className="list-row" style={{ cursor: 'default' }}>
        <div className="list-row-main">
          <span className="list-row-label">Photos (6)</span>
          <span className="list-row-sub">Before &amp; after proof</span>
        </div>
        <button
          type="button"
          className="btn-outline"
          onClick={() => toggleReportInclusion('photos')}
        >
          {reportInclusions.photos ? 'Remove' : 'Include'}
        </button>
      </div>

      <div className="list-row" style={{ cursor: 'default' }}>
        <div className="list-row-main">
          <span className="list-row-label">Receipts (2)</span>
          <span className="list-row-sub">Contractor invoices</span>
        </div>
        <button
          type="button"
          className="btn-outline"
          onClick={() => toggleReportInclusion('receipts')}
        >
          {reportInclusions.receipts ? 'Remove' : 'Include'}
        </button>
      </div>

      <p className="section-subtitle" style={{ marginTop: 14 }}>
        You control what's shared — anything you remove stays private on your device. Nothing
        goes to your insurer unless you choose to send it.
      </p>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', flex: 'none' }}
        onClick={() => navigate('/checklist/share')}
      >
        Continue
      </button>
      <div
        className="help-link"
        style={{ textAlign: 'center', width: '100%' }}
        onClick={() => navigate('/checklist/done')}
      >
        Skip for now — just save my record
      </div>
    </PhoneFrame>
  )
}
