// Buttons in the wf- system are plain CSS classes, not a shared React
// component — these stories document the *distinct visual types* actually
// used across the app. Several class names style near-identical buttons
// (e.g. .wf-upload-btn / .wf-photo-upload are the same treatment applied in
// different flows) — those are shown once here, with all equivalent
// classes noted, rather than as separate redundant stories.
export default {
  title: 'Patterns/Buttons',
  parameters: {
    docs: {
      description: {
        component: 'Button treatments from wildfire.css, as applied directly to <button> elements throughout the flow screens.',
      },
    },
  },
}

export const Primary = {
  name: 'Primary (.wf-nextbtn)',
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <button className="wf-nextbtn">Next</button>
      <button className="wf-nextbtn" disabled>Next</button>
    </div>
  ),
}

export const PrimaryFullWidth = {
  name: 'Primary, full width (.wf-nextbtn-full)',
  render: () => <button className="wf-nextbtn wf-nextbtn-full" style={{ width: 320 }}>Continue</button>,
}

export const PrimaryWithIcon = {
  name: 'Primary, with icon (.wf-upload-btn ≡ .wf-photo-upload)',
  render: () => <button className="wf-upload-btn" style={{ width: 260 }}>Upload document</button>,
}

export const SecondaryOutlined = {
  name: 'Secondary / outlined (.wf-item-action ≡ .wf-photo-take)',
  render: () => (
    <button className="wf-item-action" style={{ width: 200 }}>
      Add evidence
    </button>
  ),
}

export const Toggle = {
  name: 'Toggle (.wf-toggle-btn)',
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <button className="wf-toggle-btn">Exclude</button>
      <button className="wf-toggle-btn is-excluded">Excluded</button>
      <button className="wf-toggle-btn is-loading" disabled>Sending…</button>
    </div>
  ),
}

export const Text = {
  name: 'Text (.wf-textbtn)',
  render: () => <button className="wf-textbtn">Cancel</button>,
}
