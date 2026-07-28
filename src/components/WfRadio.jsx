// Custom-styled radio matching the Wildfire design: teal ring when unselected,
// coral ring + coral dot when selected. Wraps a real <input> for accessibility.
export default function WfRadio({ name, checked, onChange, label }) {
  return (
    <label className="wf-radio">
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span className="wf-radio-mark" aria-hidden="true" />
      <span className="wf-radio-label">{label}</span>
    </label>
  )
}
