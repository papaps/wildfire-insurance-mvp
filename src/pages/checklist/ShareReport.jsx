import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'

export default function ShareReport() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Share your report" onBack={() => navigate('/checklist/report')}>
      <div className="section-title">Do you have home insurance?</div>

      <button
        type="button"
        className="list-row"
        onClick={() => navigate('/checklist/report/insurer')}
      >
        <div className="list-row-main">
          <span className="list-row-label">Yes, I have an insurer</span>
          <span className="list-row-sub">Send your report for your next renewal or reassessment</span>
        </div>
        <span className="chevron-icon">›</span>
      </button>

      <button
        type="button"
        className="list-row"
        onClick={() => navigate('/checklist/share/browse')}
      >
        <div className="list-row-main">
          <span className="list-row-label">No, or shopping around</span>
          <span className="list-row-sub">See insurers that recognize FireSmart work</span>
        </div>
        <span className="chevron-icon">›</span>
      </button>
    </PhoneFrame>
  )
}
