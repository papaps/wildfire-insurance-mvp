import * as Icons from './AuthIcons'

export default {
  title: 'Components/AuthIcons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Brand icons used on the SSO sign-in buttons (Login / Sign up screens).',
      },
    },
  },
}

export const AllIcons = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {Object.entries(Icons).map(([name, Icon]) => (
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
          <div style={{ width: 24, height: 24 }}>
            <Icon />
          </div>
          <span style={{ fontFamily: 'var(--wf-sans)', fontSize: 11 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}
