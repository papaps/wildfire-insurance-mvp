import { useNavigate } from 'react-router-dom'
import { CheckCircleLarge } from '../../components/WildfireIcons'
import { useFlow, INSURERS } from '../../context/FlowContext'

// Completion state — two variants driven by report status:
//  · sent  → "Report sent" (shared with a named insurer), single Back to Home.
//  · saved → "Report saved" (shopping branch), Download PDF + Back to home.
export default function AllDone() {
  const navigate = useNavigate()
  const { reportStatus } = useFlow()

  const sent = Boolean(reportStatus.sent)
  const insurerName =
    INSURERS.find((i) => i.id === reportStatus.sentToId)?.label ?? 'your insurer'

  function handleDownload() {
    alert('This is a mockup — PDF export is not implemented.')
  }

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-done">
        <CheckCircleLarge size={70} />
        {sent ? (
          <>
            <h1 className="wf-flow-title wf-done-title">Report sent</h1>
            <p className="wf-done-sub">
              Your report has been sent to {insurerName}. We&rsquo;ll notify you if we receive
              any updates.
            </p>
          </>
        ) : (
          <>
            <h1 className="wf-flow-title wf-done-title">Report saved</h1>
            <p className="wf-done-sub">
              Your insurance report has been saved. Download a copy or return anytime to share
              it with an insurer.
            </p>
          </>
        )}
      </div>

      <div className="wf-flow-footer wf-done-footer">
        {sent ? (
          <button
            type="button"
            className="wf-nextbtn wf-nextbtn-full"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        ) : (
          <>
            <button
              type="button"
              className="wf-nextbtn wf-nextbtn-full"
              onClick={handleDownload}
            >
              Download PDF
            </button>
            <button type="button" className="wf-textbtn" onClick={() => navigate('/')}>
              Back to home
            </button>
          </>
        )}
      </div>
    </div>
  )
}
