import { useNavigate } from 'react-router-dom'
import { ChevronLeft, XMark } from '../../components/WildfireIcons'

// Insurance Question — branches the flow. "Yes" goes to Insurance Details,
// "No" goes to the FireSmart-compatible insurer list. Each card is fully
// clickable.
export default function ShareReport() {
  const navigate = useNavigate()

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-flow-top">
        <div className="wf-flow-nav">
          <button type="button" className="wf-iconbtn wf-flow-back" onClick={() => navigate('/checklist/report')} aria-label="Back">
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="wf-iconbtn wf-plan-close" onClick={() => navigate('/')} aria-label="Close">
            <XMark size={20} />
          </button>
        </div>
        <div className="wf-flow-heading">
          <h1 className="wf-flow-title">Do you already have home insurance?</h1>
        </div>
      </div>

      <div className="wf-flow-content">
        <div className="wf-choice-list">
          <button
            type="button"
            className="wf-choice-card"
            onClick={() => navigate('/checklist/report/insurer')}
          >
            <span className="wf-choice-main">
              <span className="wf-choice-label">Yes, I have an insurer</span>
              <span className="wf-choice-sub">
                Share your report with your insurer at your next renewal or reassessment.
              </span>
            </span>
            <span className="wf-choice-chevron">
              <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            </span>
          </button>

          <button
            type="button"
            className="wf-choice-card"
            onClick={() => navigate('/checklist/share/browse')}
          >
            <span className="wf-choice-main">
              <span className="wf-choice-label">No, I&rsquo;m shopping for insurance</span>
              <span className="wf-choice-sub">See insurers that recognize FireSmart work.</span>
            </span>
            <span className="wf-choice-chevron">
              <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
