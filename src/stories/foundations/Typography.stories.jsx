// Rendered through a real story (not raw MDX) so the wf- classes below apply
// as they do in the app, instead of being overridden by Storybook's docs
// prose typography.
export default {
  title: 'Foundations/Typography',
}

const rows = [
  { label: 'Welcome header (h1.wf-welcome)', node: <h1 className="wf-welcome">Welcome back, Sam</h1> },
  { label: 'Flow title (h1.wf-flow-title)', node: <h1 className="wf-flow-title">Property details</h1> },
  { label: 'Card title (.wf-card-title)', node: <div className="wf-card-title">Wildfire Risk Report</div> },
  { label: 'Score number (.wf-score-number)', node: <div className="wf-score-number">82</div> },
  {
    label: 'Body / bubble text (.wf-bubble)',
    node: (
      <div className="wf-bubble wf-bubble-assistant" style={{ maxWidth: 320 }}>
        Your report is ready to review.
      </div>
    ),
  },
  {
    label: 'Field label (.wf-field > label)',
    node: (
      <div className="wf-field" style={{ width: 160 }}>
        <label>Address</label>
        <input className="wf-input" defaultValue="1284 Cedar Ridge Drive" readOnly />
      </div>
    ),
  },
]

export const Scale = {
  render: () => (
    <div className="wf-flow" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {rows.map((r) => (
        <div
          key={r.label}
          style={{ display: 'flex', alignItems: 'baseline', gap: 24, borderBottom: '1px solid rgba(0,64,64,0.1)', paddingBottom: 16 }}
        >
          <div style={{ width: 220, flexShrink: 0, fontFamily: 'var(--wf-sans)', fontSize: 12, color: '#6b6b6b' }}>
            {r.label}
          </div>
          {r.node}
        </div>
      ))}
    </div>
  ),
}
