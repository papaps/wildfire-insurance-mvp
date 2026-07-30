import * as Icons from './WildfireIcons'

// InsurerLogo needs real image props (id/name) rather than a size — documented
// separately as part of the insurer-card pattern instead of this size-driven grid.
const { InsurerLogo, ...IconSet } = Icons

export default {
  title: 'Components/WildfireIcons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inline SVG icon set used throughout the wf- screens. All icons use `currentColor` for their stroke, so they inherit text color, and accept a `size` prop.',
      },
    },
  },
}

export const AllIcons = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
        gap: 16,
        color: 'var(--wf-teal)',
      }}
    >
      {Object.entries(IconSet).map(([name, Icon]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: 12,
            border: '1px solid rgba(0,64,64,0.15)',
            borderRadius: 10,
          }}
        >
          <Icon size={24} />
          <span style={{ fontFamily: 'var(--wf-sans)', fontSize: 11, textAlign: 'center', wordBreak: 'break-word' }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
}
