export default {
  title: 'Patterns/Cards',
  parameters: {
    docs: {
      description: {
        component: 'Card containers from wildfire.css used for report sections, choices, and list rows.',
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
}

export const Generic = {
  render: () => (
    <div className="wf-card">
      <div className="wf-card-title">Wildfire Risk Report</div>
      <div className="wf-card-divider" style={{ margin: '10px 0' }} />
      <p style={{ margin: 0, fontFamily: 'var(--wf-sans)', fontSize: 13, color: 'var(--wf-teal)' }}>
        Your property scored 82/100 — Low Risk.
      </p>
    </div>
  ),
}

export const Choice = {
  render: () => (
    <button type="button" className="wf-choice-card" style={{ width: '100%' }}>
      <div className="wf-choice-main">
        <span className="wf-choice-label">Single-family home</span>
        <span className="wf-choice-sub">Detached, one or two storeys</span>
      </div>
    </button>
  ),
}

export const Insurer = {
  render: () => (
    <div className="wf-insurer-card">
      <div className="wf-insurer-logo" style={{ background: 'var(--wf-teal-06)', borderRadius: 4 }} />
      <div className="wf-insurer-main">
        <span className="wf-insurer-name">BCAA Insurance</span>
        <span className="wf-insurer-note">Wildfire coverage add-on available</span>
      </div>
    </div>
  ),
}

export const Property = {
  render: () => (
    <div className="wf-property-card">
      <div style={{ width: 60, height: 60, borderRadius: 4, background: 'var(--wf-teal-06)', flexShrink: 0 }} />
      <div className="wf-property-label">1284 Cedar Ridge Drive</div>
    </div>
  ),
}
