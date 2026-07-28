import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, XMark } from '../../components/WildfireIcons'
import { useFlow, CHECKLIST_ITEMS, computeRiskScore } from '../../context/FlowContext'

// Insurance Report — the shareable summary. Required sections are always
// "Included"; Photos and Receipts can be toggled out before sharing. The report
// is auto-saved the moment this screen is reached.
export default function YourReport() {
  const navigate = useNavigate()
  const { checklistProgress, reportInclusions, toggleReportInclusion, setReportStatus } = useFlow()

  useEffect(() => {
    setReportStatus({ saved: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const completedCount = CHECKLIST_ITEMS.filter((item) => checklistProgress[item.id]?.done).length
  const score = computeRiskScore(checklistProgress).toFixed(1)
  const today = new Date().toLocaleDateString('en-US')

  const toggleRows = [
    { key: 'photos', label: 'Photos (6)', sub: 'Before & after proof' },
    { key: 'receipts', label: 'Receipts (2)', sub: 'Contractor Invoices' },
  ]

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-flow-top">
        <div className="wf-flow-nav">
          <button type="button" className="wf-iconbtn wf-flow-back" onClick={() => navigate('/checklist/items')} aria-label="Back">
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="wf-iconbtn wf-plan-close" onClick={() => navigate('/')} aria-label="Close report">
            <XMark size={20} />
          </button>
        </div>
        <div className="wf-flow-heading">
          <h1 className="wf-flow-title">Your Insurance Report</h1>
          <div className="wf-report-meta">
            <span>12 Maple Court, Kelowna, BC</span>
            <span>·</span>
            <span>{today}</span>
          </div>
        </div>
      </div>

      <div className="wf-flow-content">
        <div className="wf-card wf-report-score">
          <span className="wf-report-score-label">Wildfire Risk Score</span>
          <span className="wf-plan-score-value">
            <span className="wf-score-number wf-score-number-md">{score}</span>
            <span className="wf-score-outof">/10</span>
          </span>
        </div>

        <div className="wf-report-sections">
          <div className="wf-report-row">
            <div className="wf-report-main">
              <span className="wf-report-label">Risk score &amp; summary</span>
              <span className="wf-report-sub">AI assessment with disclaimer</span>
            </div>
            <span className="wf-incl-pill">Included</span>
          </div>

          <div className="wf-report-divider" />

          <div className="wf-report-row">
            <div className="wf-report-main">
              <span className="wf-report-label">Completed fixes ({completedCount})</span>
              <span className="wf-report-sub">with completion dates</span>
            </div>
            <span className="wf-incl-pill">Included</span>
          </div>

          {toggleRows.map((row) => {
            const included = reportInclusions[row.key]
            return (
              <div key={row.key}>
                <div className="wf-report-divider" />
                <div className={`wf-report-row${included ? '' : ' is-excluded'}`}>
                  <div className="wf-report-main">
                    <span className="wf-report-label">{row.label}</span>
                    <span className="wf-report-sub">{row.sub}</span>
                  </div>
                  <button
                    type="button"
                    className={`wf-toggle-btn${included ? '' : ' is-excluded'}`}
                    onClick={() => toggleReportInclusion(row.key)}
                  >
                    {included ? 'Exclude' : 'Include'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="wf-flow-footer wf-report-footer">
        <p className="wf-report-caption">
          Choose what to include before sharing your report with an insurer.
        </p>
        <button
          type="button"
          className="wf-nextbtn wf-nextbtn-full"
          onClick={() => navigate('/checklist/share')}
        >
          Share Report
        </button>
        <button
          type="button"
          className="wf-textbtn"
          onClick={() => alert('This is a mockup — PDF export is not implemented.')}
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}
