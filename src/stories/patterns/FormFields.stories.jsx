export default {
  title: 'Patterns/Form Fields',
  parameters: {
    docs: {
      description: { component: 'Text input and select styling used across the property/document/insurance flows.' },
    },
  },
  decorators: [(Story) => <div className="wf-flow" style={{ width: 340 }}><Story /></div>],
}

export const TextInput = {
  render: () => (
    <div className="wf-form">
      <div className="wf-field">
        <label>Street address</label>
        <input className="wf-input" placeholder="1284 Cedar Ridge Drive" />
      </div>
    </div>
  ),
}

export const Select = {
  render: () => (
    <div className="wf-form">
      <div className="wf-field">
        <label>Province</label>
        <div className="wf-select-wrap">
          <select className="wf-select">
            <option>British Columbia</option>
            <option>Alberta</option>
            <option>Ontario</option>
          </select>
        </div>
      </div>
    </div>
  ),
}

export const FieldRow = {
  render: () => (
    <div className="wf-form">
      <div className="wf-field-row">
        <div className="wf-field">
          <label>City</label>
          <input className="wf-input" placeholder="Kelowna" />
        </div>
        <div className="wf-field">
          <label>Postal code</label>
          <input className="wf-input" placeholder="V1Y 1A1" />
        </div>
      </div>
    </div>
  ),
}
