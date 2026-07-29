import { useNavigate } from 'react-router-dom'
import { XMark, Fire, ExternalLink } from '../../components/WildfireIcons'
import { HAZARD_RISK_SCORE, REPORT_RECOMMENDATIONS } from '../../context/FlowContext'

// Wildfire Risk Report — shown right after the score finishes calculating.
// Fixed header + sticky "Create Action Plan" footer, cards scroll between them.
export default function HazardReport() {
  const navigate = useNavigate()

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-flow-top">
        <div className="wf-plan-topbar">
          <h1 className="wf-flow-title">Wildfire Risk Report</h1>
          <button
            type="button"
            className="wf-iconbtn wf-plan-close"
            onClick={() => navigate('/')}
            aria-label="Close report"
          >
            <XMark size={20} />
          </button>
        </div>
      </div>

      <div className="wf-flow-content wf-plan-content">
        <div className="wf-card wf-score-report">
          <Fire size={24} />
          <div className="wf-score-big">
            <span className="wf-score-number">{HAZARD_RISK_SCORE}</span>
            <span className="wf-score-outof">/10</span>
          </div>
          <div className="wf-score-level">High wildfire risk</div>
          <p className="wf-score-note">
            This score is an estimate. A free FireSmart home assessment provides a more accurate
            evaluation.
          </p>
        </div>

        <div className="wf-card wf-reco-card">
          <div className="wf-card-title">Actions Summary</div>
          <div className="wf-card-divider" />
          <ol className="wf-reco-list">
            {REPORT_RECOMMENDATIONS.map((rec, i) => (
              <li key={rec.title} className="wf-reco-row">
                <span className="wf-reco-num">{i + 1}</span>
                <div className="wf-reco-body">
                  <span className="wf-reco-title">{rec.title}</span>
                  <span className="wf-reco-detail">{rec.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="wf-card wf-resource-card">
          <div className="wf-resource-row">
            <span>FireSmart BC — Book a free home assessment</span>
            <ExternalLink size={16} />
          </div>
          <div className="wf-resource-row">
            <span>Check FireSmart rebate eligibility</span>
            <ExternalLink size={16} />
          </div>
        </div>
      </div>

      <div className="wf-flow-footer wf-flow-footer-single">
        <button
          type="button"
          className="wf-nextbtn wf-nextbtn-full"
          onClick={() => navigate('/checklist/items')}
        >
          Create Action Plan
        </button>
      </div>
    </div>
  )
}
