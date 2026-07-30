import WildfireLoader from './WildfireLoader'

export default {
  title: 'Components/WildfireLoader',
  component: WildfireLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Centered loading screen used while identifying items or calculating the wildfire risk score.',
      },
    },
  },
}

export const IdentifyingItems = {
  args: {
    title: 'Identifying items…',
    subtitle: "We're scanning your photos to catalog your belongings.",
  },
}

export const CalculatingScore = {
  args: {
    title: 'Calculating your wildfire risk score…',
    subtitle: 'This usually takes less than a minute.',
  },
}
