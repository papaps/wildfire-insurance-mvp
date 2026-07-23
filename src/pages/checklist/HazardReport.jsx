import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { CHECKLIST_ITEMS, HAZARD_RISK_SCORE } from '../../context/FlowContext'

export default function HazardReport() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Your hazard report" onBack={() => navigate('/')}>
      <div className="center-screen" style={{ padding: '8px 0 20px' }}>
        <div style={{ fontSize: 40, fontWeight: 700 }}>{HAZARD_RISK_SCORE} / 10</div>
        <div className="section-subtitle" style={{ margin: 0 }}>High wildfire risk</div>
        <p className="section-subtitle" style={{ margin: 0 }}>
          AI estimate — not 100% accurate. Verify with a free FireSmart home assessment.
        </p>
      </div>

      <div className="section-title" style={{ fontSize: 15 }}>Ranked fixes</div>

      {CHECKLIST_ITEMS.map((item) => (
        <div key={item.id} className="list-row" style={{ cursor: 'default' }}>
          <div className="list-row-main">
            <span className="list-row-label">{item.label}</span>
            <span className="list-row-sub">{item.cost}</span>
          </div>
          <span className="status-icon" />
        </div>
      ))}

      <div className="help-link" onClick={() => {}}>
        FireSmart BC — book a free home assessment ↗
      </div>
      <div className="help-link" onClick={() => {}}>
        Check FireSmart rebate eligibility ↗
      </div>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', flex: 'none' }}
        onClick={() => navigate('/checklist/items')}
      >
        Start my checklist
      </button>
    </PhoneFrame>
  )
}
