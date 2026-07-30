import { useState } from 'react'
import WfRadio from './WfRadio'

export default {
  title: 'Components/WfRadio',
  component: WfRadio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Custom-styled radio: teal ring when unselected, coral ring + coral dot when selected. Wraps a real `<input type="radio">` for accessibility.',
      },
    },
  },
}

export const Group = {
  render: function Render() {
    const [value, setValue] = useState('yes')
    return (
      <div className="wf-radio-row">
        <WfRadio name="demo" label="Yes" checked={value === 'yes'} onChange={() => setValue('yes')} />
        <WfRadio name="demo" label="No" checked={value === 'no'} onChange={() => setValue('no')} />
      </div>
    )
  },
}

export const Checked = {
  args: { name: 'checked-demo', label: 'Selected option', checked: true, onChange: () => {} },
}

export const Unchecked = {
  args: { name: 'unchecked-demo', label: 'Unselected option', checked: false, onChange: () => {} },
}
