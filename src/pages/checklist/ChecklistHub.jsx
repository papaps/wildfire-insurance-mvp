import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { useFlow, CHECKLIST_ITEMS, HAZARD_RISK_SCORE } from '../../context/FlowContext'

export default function ChecklistHub() {
  const navigate = useNavigate()
  const { checklistProgress } = useFlow()

  const doneCount = CHECKLIST_ITEMS.filter((item) => checklistProgress[item.id]?.done).length

  return (
    <PhoneFrame title="Your checklist" onBack={() => navigate('/checklist')}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--teal)' }}>{HAZARD_RISK_SCORE} / 10</div>
        <div className="section-subtitle" style={{ margin: 0 }}>High wildfire risk</div>
      </div>

      <div className="section-subtitle" style={{ marginBottom: 6 }}>
        {doneCount} of {CHECKLIST_ITEMS.length} complete
      </div>
      <div className="progress-track" style={{ marginBottom: 18 }}>
        <div
          className="progress-fill"
          style={{ width: `${(doneCount / CHECKLIST_ITEMS.length) * 100}%` }}
        />
      </div>

      {CHECKLIST_ITEMS.map((item) => {
        const done = checklistProgress[item.id]?.done
        return (
          <button
            key={item.id}
            type="button"
            className="list-row"
            onClick={() => navigate(`/checklist/items/${item.id}`)}
          >
            <div className="list-row-main">
              <span
                className="list-row-label"
                style={done ? { textDecoration: 'line-through' } : undefined}
              >
                {item.label}
              </span>
              <span className="list-row-sub">{item.cost}</span>
            </div>
            <span className={`status-icon ${done ? 'done' : ''}`}>{done ? '✓' : ''}</span>
          </button>
        )
      })}

      <p className="section-subtitle" style={{ marginTop: 14 }}>
        Check-in reminder — we'll remind you every 6 months to re-check your home before fire
        season.
      </p>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', flex: 'none' }}
        onClick={() => navigate('/checklist/report')}
      >
        Generate report
      </button>
      <p className="section-subtitle" style={{ textAlign: 'center' }}>
        You can generate a report anytime — even before every item is done.
      </p>
    </PhoneFrame>
  )
}
