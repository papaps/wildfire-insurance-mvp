import TabBar from './TabBar'

export default {
  title: 'Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Floating pill bottom navigation used by the Home, Chat, and Profile screens.',
      },
    },
  },
  argTypes: {
    active: { control: 'radio', options: ['home', 'chat', 'profile'] },
  },
  // TabBar is a flex item with `align-self: center` inside .wf-screen's
  // column flex layout, which is what keeps it pill-width instead of
  // stretching edge to edge. Standalone it isn't a flex item at all, so
  // recreate that context here.
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--wf-bg)', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
}

export const Home = { args: { active: 'home' } }
export const Chat = { args: { active: 'chat' } }
export const Profile = { args: { active: 'profile' } }
