import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { useFlow } from '../../context/FlowContext'

const STEPS = [
  'Reading your photos',
  'Identifying possible hazards',
  'Ranking fixes by cost',
]

export default function AIReview() {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const { updateChecklistItem } = useFlow()
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const stepTimers = STEPS.map((_, i) =>
      setTimeout(() => setStepIndex(i + 1), (i + 1) * 700)
    )

    const resolveTimer = setTimeout(() => {
      if (Math.random() < 0.5) {
        navigate(`/checklist/items/${itemId}/confirmed`)
      } else {
        updateChecklistItem(itemId, { done: false })
        navigate(`/checklist/items/${itemId}/failed`)
      }
    }, 2500)

    return () => {
      stepTimers.forEach(clearTimeout)
      clearTimeout(resolveTimer)
    }
  }, [navigate, itemId, updateChecklistItem])

  return (
    <PhoneFrame title="AI review" showBack={false}>
      <div className="center-screen">
        <div className="spinner" />
        <div className="section-title">Analyzing your photos...</div>
        <div className="section-subtitle">
          This usually takes about 30 seconds. I'm checking for the hazards most common
          in fire-prone B.C.
        </div>

        <div style={{ width: '100%' }}>
          {STEPS.map((label, i) => (
            <div key={label} className="list-row">
              <div className="list-row-main">
                <span className="list-row-label">{label}</span>
              </div>
              <span className={`status-icon ${i < stepIndex ? 'done' : ''}`}>
                {i < stepIndex ? '✓' : ''}
              </span>
            </div>
          ))}
        </div>

        <a className="help-link" onClick={() => navigate(`/checklist/items/${itemId}`)}>
          Cancel
        </a>
      </div>
    </PhoneFrame>
  )
}
