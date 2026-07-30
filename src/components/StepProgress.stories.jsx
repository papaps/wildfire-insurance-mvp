import StepProgress from './StepProgress'

export default {
  title: 'Components/StepProgress',
  component: StepProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Top-of-flow progress indicator used across multi-step flows (property setup, checklist, insurance report).',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
  decorators: [(Story) => <div style={{ width: 392 }}><Story /></div>],
}

export const Early = { args: { label: 'Step 1 of 4', value: 0.25 } }
export const Midway = { args: { label: 'Step 2 of 4', value: 0.5 } }
export const Complete = { args: { label: 'Step 4 of 4', value: 1 } }
