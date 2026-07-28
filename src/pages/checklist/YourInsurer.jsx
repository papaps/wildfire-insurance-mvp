import { useNavigate } from 'react-router-dom'
import { ChevronLeft, XMark } from '../../components/WildfireIcons'
import { useFlow, INSURERS } from '../../context/FlowContext'

// Insurance Details — reached from the "Yes, I have an insurer" branch. Insurer
// is required (CTA stays disabled until one is picked); policy number is
// optional. Selections persist in FlowContext across back navigation.
export default function YourInsurer() {
  const navigate = useNavigate()
  const { insurer, setInsurer, setReportStatus } = useFlow()

  const canSend = Boolean(insurer.insurerId)

  function handleSend() {
    if (!canSend) return
    setReportStatus({ saved: true, sent: true, sentToId: insurer.insurerId })
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
          <h1 className="wf-flow-title">Insurance Details</h1>
          <p className="wf-flow-subtitle">Enter your insurance details to send your wildfire report</p>
        </div>
      </div>

      <div className="wf-flow-content">
        <div className="wf-form">
          <div className="wf-field">
            <label htmlFor="insurer-select">Insurer</label>
            <div className="wf-select-wrap">
              <select
                id="insurer-select"
                className="wf-select"
                data-empty={insurer.insurerId ? undefined : true}
                value={insurer.insurerId}
                onChange={(e) => setInsurer({ insurerId: e.target.value })}
              >
                <option value="" disabled>Select Insurer</option>
                {INSURERS.map((i) => (
                  <option key={i.id} value={i.id}>{i.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="wf-field">
            <div className="wf-field-labelrow">
              <label htmlFor="policy-input">Policy No.</label>
              <span className="wf-field-optional">(Optional)</span>
            </div>
            <input
              id="policy-input"
              className="wf-input"
              type="text"
              placeholder="AB -1234-5678"
              value={insurer.policyNumber}
              onChange={(e) => setInsurer({ policyNumber: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="wf-flow-footer wf-flow-footer-single">
        <button
          type="button"
          className="wf-nextbtn wf-nextbtn-full"
          disabled={!canSend}
          onClick={handleSend}
        >
          Send Report
        </button>
      </div>
    </div>
  )
}
