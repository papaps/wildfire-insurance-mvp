import '../src/index.css'
import '../src/styles/wildfire.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'wf-bg',
      values: [
        { name: 'wf-bg', value: '#fcfcfb' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    viewport: {
      options: {
        wfMobile: {
          name: 'Wildfire mobile (440px)',
          styles: { width: '440px', height: '844px' },
        },
      },
    },
    options: {
      storySort: {
        order: ['Foundations', 'Components', 'Patterns'],
      },
    },
  },
}

export default preview
