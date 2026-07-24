import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { useFlow, CHECKLIST_ITEMS, HAZARD_RISK_SCORE } from '../../context/FlowContext'

export default function HazardReport() {
  const navigate = useNavigate()
  const { checklistProgress } = useFlow()

  return (
    <PhoneFrame title="Your hazard report" onBack={() => navigate('/')}>
      <div className="hazard-score-card">
        <div className="hazard-score-value">
          {HAZARD_RISK_SCORE} <span>/ 10</span>
        </div>
        <div className="hazard-score-label">High wildfire risk</div>
        <p className="hazard-score-note">
          AI estimate — not 100% accurate. Verify with a free FireSmart home assessment.
        </p>
      </div>

      <div className="section-title" style={{ fontSize: 15 }}>Ranked fixes</div>

      {CHECKLIST_ITEMS.map((item) => {
        const done = checklistProgress[item.id]?.done
        return (
          <div key={item.id} className="todo-item">
            <span className={`todo-checkbox${done ? ' todo-checkbox-done' : ''}`}>
              {done ? '✓' : ''}
            </span>
            <div className="list-row-main">
              <span
                className="list-row-label"
                style={done ? { textDecoration: 'line-through', color: 'var(--teal-muted-light)' } : undefined}
              >
                {item.label}
              </span>
              <span className="list-row-sub">{item.cost}</span>
            </div>
          </div>
        )
      })}

      <div className="help-link help-link-disabled" title="Not available yet">
        FireSmart BC — book a free home assessment ↗
      </div>
      <div className="help-link help-link-disabled" title="Not available yet">
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
