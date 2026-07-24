import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { useFlow, INSURERS } from '../../context/FlowContext'

export default function SendToInsurer() {
  const navigate = useNavigate()
  const { insurer, reportInclusions } = useFlow()

  const selectedInsurer = INSURERS.find((i) => i.id === insurer.insurerId)

  return (
    <PhoneFrame title="Send to your insurer" onBack={() => navigate('/checklist/report/insurer')}>
      <div className="section-title">Sending to</div>
      <p className="section-subtitle" style={{ marginTop: -8 }}>
        {selectedInsurer?.label ?? 'Your insurer'}
      </p>
      <p className="section-subtitle" style={{ marginTop: -12 }}>
        Policy #{insurer.policyNumber} · Renewal Jan 2027
      </p>

      <div className="section-title" style={{ fontSize: 15 }}>They will receive</div>

      <div className="list-row" style={{ cursor: 'default' }}>
        <div className="list-row-main">
          <span className="list-row-label">Risk score &amp; summary</span>
        </div>
        <span className="status-pill">Sending</span>
      </div>

      <div className="list-row" style={{ cursor: 'default' }}>
        <div className="list-row-main">
          <span className="list-row-label">Completed fixes</span>
        </div>
        <span className="status-pill">Sending</span>
      </div>

      <div className="list-row" style={{ cursor: 'default' }}>
        <div className="list-row-main">
          <span className="list-row-label">Photos</span>
        </div>
        <span className={`status-pill${reportInclusions.photos ? '' : ' status-pill-off'}`}>
          {reportInclusions.photos ? 'Sending' : 'Removed'}
        </span>
      </div>

      <div className="list-row" style={{ cursor: 'default' }}>
        <div className="list-row-main">
          <span className="list-row-label">Receipts</span>
        </div>
        <span className={`status-pill${reportInclusions.receipts ? '' : ' status-pill-off'}`}>
          {reportInclusions.receipts ? 'Sending' : 'Removed'}
        </span>
      </div>

      <p className="section-subtitle" style={{ marginTop: 14 }}>
        One-time share — only what's listed above is shared, once. A report can't be unsent,
        and your ongoing data stays on your device.
      </p>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', flex: 'none' }}
        onClick={() => navigate('/checklist/done', { state: { sent: true } })}
      >
        Send report
      </button>
      <div
        className="help-link"
        style={{ textAlign: 'center', width: '100%' }}
        onClick={() => navigate('/checklist/report')}
      >
        Go back &amp; edit what's included
      </div>
    </PhoneFrame>
  )
}
