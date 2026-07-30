// Buttons in the wf- system are plain CSS classes, not a shared React
// component — these stories document the classes as used across the app.
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
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <button className="wf-nextbtn">Next</button>
      <button className="wf-nextbtn" disabled>Next</button>
    </div>
  ),
}

export const PrimaryFullWidth = {
  render: () => <button className="wf-nextbtn wf-nextbtn-full" style={{ width: 320 }}>Continue</button>,
}

export const Text = {
  render: () => <button className="wf-textbtn">Cancel</button>,
}

export const Upload = {
  render: () => <button className="wf-upload-btn" style={{ width: 260 }}>Upload document</button>,
}

export const PhotoActions = {
  render: () => (
    <div className="wf-photo-actions" style={{ width: 320 }}>
      <button className="wf-photo-upload">Upload</button>
      <button className="wf-photo-take">Take photo</button>
    </div>
  ),
}

export const Toggle = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <button className="wf-toggle-btn">Exclude</button>
      <button className="wf-toggle-btn is-excluded">Excluded</button>
      <button className="wf-toggle-btn is-loading" disabled>Sending…</button>
    </div>
  ),
}

export const SecondaryOutlined = {
  render: () => (
    <button className="wf-item-action" style={{ width: 160 }}>
      Add evidence
    </button>
  ),
}
