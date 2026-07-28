import { useNavigate } from 'react-router-dom'
import { ChevronLeft, XMark, InsurerLogo } from '../../components/WildfireIcons'
import { useFlow, INSURERS } from '../../context/FlowContext'

// View Insurers — reached from the "No, I'm shopping" branch. Lists
// FireSmart-compatible insurers with a per-insurer quote link. "Done" saves the
// report and returns home via the saved-confirmation screen.
export default function FireSmartInsurers() {
  const navigate = useNavigate()
  const { setReportStatus } = useFlow()

  function handleQuote(ins) {
    if (ins.url) {
      window.open(ins.url, '_blank', 'noopener,noreferrer')
    } else {
      alert(`This is a mockup — the ${ins.label} quote page is not connected.`)
    }
  }

  function handleDone() {
    // Shopping branch — the report is saved but not sent to anyone. Clear any
    // prior "sent" state so the completion screen shows the saved variant.
    setReportStatus({ saved: true, sent: false, sentToId: null })
    navigate('/checklist/done')
  }

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-flow-top">
        <div className="wf-flow-nav">
          <button type="button" className="wf-iconbtn wf-flow-back" onClick={() => navigate('/checklist/share')} aria-label="Back">
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="wf-iconbtn wf-plan-close" onClick={() => navigate('/')} aria-label="Close">
            <XMark size={20} />
          </button>
        </div>
        <div className="wf-flow-heading">
          <h1 className="wf-flow-title">FireSmart Compatible Insurers</h1>
          <p className="wf-flow-subtitle">
            Explore insurers that may consider verified wildfire mitigation when reviewing your
            policy or providing a quote.
          </p>
        </div>
      </div>

      <div className="wf-flow-content">
        <div className="wf-insurer-list">
          {INSURERS.map((ins) => (
            <div key={ins.id} className="wf-insurer-card">
              <span className="wf-insurer-logo">
                <InsurerLogo id={ins.logo} />
              </span>
              <div className="wf-insurer-main">
                <span className="wf-insurer-name">{ins.label}</span>
                <span className="wf-insurer-note">{ins.firesmartNote}</span>
              </div>
              <button type="button" className="wf-toggle-btn" onClick={() => handleQuote(ins)}>
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="wf-flow-footer wf-flow-footer-single">
        <button type="button" className="wf-nextbtn wf-nextbtn-full" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  )
}
