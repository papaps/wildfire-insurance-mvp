import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { XMark, CheckCircle, ChevronLeft } from '../../components/WildfireIcons'
import { useFlow, CHECKLIST_ITEMS, computeRiskScore } from '../../context/FlowContext'

// Action Plan — the checklist of ranked fixes. Doubles as the "before any
// completions" state (no progress bar) and the "in progress" state (animated
// progress bar + filled checks). Score and counts are derived from live state.
export default function ChecklistHub() {
  const navigate = useNavigate()
  const { checklistProgress, planBaseline, commitPlanBaseline } = useFlow()

  const total = CHECKLIST_ITEMS.length
  const doneIds = CHECKLIST_ITEMS.filter((i) => checklistProgress[i.id]?.done).map((i) => i.id)
  const doneCount = doneIds.length
  const score = computeRiskScore(checklistProgress).toFixed(1)

  // Baseline captured once so the bar animates from the last visit's value and
  // freshly-completed rows pop into their checked state.
  const baselineRef = useRef(planBaseline.doneIds)
  const baseCount = baselineRef.current.length
  const newlyDone = new Set(doneIds.filter((id) => !baselineRef.current.includes(id)))

  const [fillPct, setFillPct] = useState((baseCount / total) * 100)

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setFillPct((doneCount / total) * 100))
    )
    commitPlanBaseline(doneIds)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-flow-top">
        <div className="wf-plan-topbar">
          <h1 className="wf-flow-title">Action Plan</h1>
          <button
            type="button"
            className="wf-iconbtn wf-plan-close"
            onClick={() => navigate('/')}
            aria-label="Close action plan"
          >
            <XMark size={20} />
          </button>
        </div>
      </div>

      <div className="wf-flow-content wf-plan-content">
        <div className="wf-card wf-plan-score">
          <span className="wf-plan-score-label">Wildfire Risk Score</span>
          <span className="wf-plan-score-value">
            <span className="wf-score-number wf-score-number-md">{score}</span>
            <span className="wf-score-outof">/10</span>
          </span>
        </div>

        {doneCount > 0 && (
          <div className="wf-progress wf-plan-progress">
            <span className="wf-progress-label">
              {doneCount} of {total} complete
            </span>
            <div className="wf-progress-track">
              <div className="wf-progress-fill" style={{ width: `${fillPct}%` }} />
            </div>
          </div>
        )}

        <div className="wf-plan-list">
          {CHECKLIST_ITEMS.map((item, i) => {
            const done = checklistProgress[item.id]?.done
            const sub = item.costNote ? `${item.cost} · ${item.costNote}` : item.cost
            return (
              <div key={item.id}>
                {i > 0 && <div className="wf-plan-divider" />}
                <button
                  type="button"
                  className="wf-plan-item"
                  onClick={() => navigate(`/checklist/items/${item.id}`)}
                >
                  <span className="wf-plan-status">
                    {done ? (
                      <span className={newlyDone.has(item.id) ? 'wf-check-pop' : undefined}>
                        <CheckCircle size={20} />
                      </span>
                    ) : (
                      <span className="wf-plan-ring" />
                    )}
                  </span>
                  <span className="wf-plan-main">
                    <span className="wf-plan-label">{item.label}</span>
                    <span className="wf-plan-sub">{sub}</span>
                  </span>
                  <span className="wf-plan-chevron">
                    <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="wf-flow-footer wf-plan-footer">
        <p className="wf-plan-remind">We’ll remind you every 6 months about your Action Plan.</p>
        <button
          type="button"
          className="wf-nextbtn wf-nextbtn-full"
          onClick={() => navigate('/checklist/report')}
        >
          Generate Insurance Report
        </button>
      </div>
    </div>
  )
}
