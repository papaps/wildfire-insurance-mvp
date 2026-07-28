import { useEffect, useState } from 'react'

// Top-of-flow progress indicator. `value` is 0..1.
// A module-level variable remembers the last rendered value across route
// changes so the bar animates from where it was (increase or decrease)
// instead of snapping — each flow page mounts a fresh instance.
let lastValue = 0

export default function StepProgress({ label, value }) {
  const [width, setWidth] = useState(lastValue)

  useEffect(() => {
    // Seed from the previous value, then transition to the new one on the
    // next frame so the CSS width transition actually runs.
    const id = requestAnimationFrame(() => setWidth(value))
    lastValue = value
    return () => cancelAnimationFrame(id)
  }, [value])

  return (
    <div className="wf-progress">
      <div className="wf-progress-label">{label}</div>
      <div className="wf-progress-track">
        <div
          className="wf-progress-fill"
          style={{ width: `${Math.round(width * 100)}%` }}
        />
      </div>
    </div>
  )
}
