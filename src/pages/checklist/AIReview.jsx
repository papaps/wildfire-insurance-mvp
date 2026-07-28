import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check } from '../../components/WildfireIcons'
import { useFlow, CHECKLIST_ITEMS } from '../../context/FlowContext'

// Submit for AI — simulated analysis. The item's checks reveal one by one
// (rising in from below) as if being verified, then it auto-advances to the
// completed screen.
export default function AIReview() {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const { checklistProgress } = useFlow()

  const item = CHECKLIST_ITEMS.find((i) => i.id === itemId)
  const checks = item?.aiChecks ?? []
  const [revealed, setRevealed] = useState(0)

  // If the user reached this screen without any evidence, bounce back.
  const hasEvidence =
    (checklistProgress[itemId]?.evidence?.photos?.length ?? 0) > 0 ||
    (checklistProgress[itemId]?.evidence?.files?.length ?? 0) > 0

  useEffect(() => {
    if (!hasEvidence) {
      navigate(`/checklist/items/${itemId}`, { replace: true })
      return
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const step = reduce ? 250 : 700

    const timers = checks.map((_, i) => setTimeout(() => setRevealed(i + 1), (i + 1) * step))
    const done = setTimeout(
      () => navigate(`/checklist/items/${itemId}/confirmed`),
      checks.length * step + 800
    )

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(done)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId])

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-item-analyze">
        <div className="wf-analyze-head">
          <span className="wf-loader-ring" aria-hidden="true">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle opacity="0.2" cx="30" cy="30" r="27" stroke="#DE7356" strokeWidth="6" />
              <path
                d="M57 30C58.6569 30 60.0155 28.6535 59.8501 27.005C59.5579 24.0928 58.8406 21.2335 57.7164 18.5195C56.2087 14.8797 53.999 11.5726 51.2132 8.7868C48.4274 6.00104 45.1203 3.79125 41.4805 2.28361C38.7665 1.15944 35.9072 0.442076 32.995 0.149876C31.3464 -0.0155359 30 1.34315 30 3C30 4.65685 31.3483 5.98069 32.9922 6.18726C35.1158 6.4541 37.1987 7.00439 39.1844 7.82689C42.0962 9.033 44.742 10.8008 46.9706 13.0294C49.1992 15.258 50.967 17.9038 52.1731 20.8156C52.9956 22.8013 53.5459 24.8842 53.8127 27.0078C54.0193 28.6517 55.3431 30 57 30Z"
                fill="#DE7356"
              />
            </svg>
          </span>
          <h1 className="wf-flow-title wf-loader-title">Analyzing your photos...</h1>
          <p className="wf-loader-subtitle">This usually takes about 30 seconds.</p>
        </div>

        <div className="wf-analyze-checks">
          {checks.map((label, i) => (
            <div
              key={label}
              className={`wf-analyze-check${i < revealed ? ' is-shown' : ''}`}
            >
              <Check size={20} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
