import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Celebration from '../../components/Celebration'
import { MoveRight } from '../../components/WildfireIcons'
import { useFlow, CHECKLIST_ITEMS, computeRiskScore } from '../../context/FlowContext'

// Action Item — Completed. The AI review passed: the item is marked done, the
// risk score drops, and the plan is updated. Celebrates, shows the before/after
// score, and returns to the Action Plan.
export default function ReviewSuccess() {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const { checklistProgress, updateChecklistItem } = useFlow()
  const item = CHECKLIST_ITEMS.find((i) => i.id === itemId)

  // Freeze the before/after scores from the state as it was on entry, before
  // this item is marked done, so they don't shift when the score recomputes.
  const [scores] = useState(() => {
    const before = computeRiskScore(checklistProgress)
    const after = Math.max(0, before - (item?.scoreImpact ?? 0))
    return { before: before.toFixed(1), after: after.toFixed(1) }
  })

  useEffect(() => {
    updateChecklistItem(itemId, { done: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId])

  // Remaining count including this just-completed item, so it reads correctly
  // on the first paint regardless of when the state update lands.
  const doneIds = new Set(
    CHECKLIST_ITEMS.filter((i) => checklistProgress[i.id]?.done).map((i) => i.id)
  )
  doneIds.add(itemId)
  const remaining = CHECKLIST_ITEMS.length - doneIds.size

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-item-complete">
        <Celebration />

        <div className="wf-complete-copy">
          <h1 className="wf-flow-title">{item?.shortName ?? 'Item'} Completed!</h1>
          <p className="wf-complete-sub">Your estimated wildfire readiness has improved.</p>
        </div>

        <div className="wf-card wf-complete-score">
          <span className="wf-plan-score-label">Wildfire Risk Score</span>
          <span className="wf-complete-score-values">
            <span className="wf-complete-score-num">{scores.before}</span>
            <MoveRight size={24} />
            <span className="wf-complete-score-num">{scores.after}</span>
          </span>
        </div>
      </div>

      <div className="wf-flow-footer wf-plan-footer">
        <p className="wf-complete-remaining">
          {remaining} recommendation{remaining === 1 ? '' : 's'} remaining
        </p>
        <button
          type="button"
          className="wf-nextbtn wf-nextbtn-full"
          onClick={() => navigate('/checklist/items')}
        >
          Continue Checklist
        </button>
      </div>
    </div>
  )
}
