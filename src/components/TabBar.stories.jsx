import { MemoryRouter, useLocation } from 'react-router-dom'
import TabBar from './TabBar'

// TabBar drives navigation via react-router's useNavigate() internally, so to
// make it genuinely clickable in Storybook (not just a static screenshot),
// each story runs its own MemoryRouter and derives `active` from the current
// location — clicking a tab actually navigates and re-renders as active,
// exactly like it does in the app.
function ActiveFromLocation() {
  const { pathname } = useLocation()
  const active = pathname === '/chat' ? 'chat' : pathname === '/profile' ? 'profile' : 'home'
  return <TabBar active={active} />
}

function TabBarDemo({ initialPath }) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <ActiveFromLocation />
    </MemoryRouter>
  )
}

export default {
  title: 'Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Floating pill bottom navigation used by the Home, Chat, and Profile screens. Click a tab below — it actually navigates and re-renders as active, same as in the app.',
      },
    },
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

export const Home = { render: () => <TabBarDemo initialPath="/" /> }
export const Chat = { render: () => <TabBarDemo initialPath="/chat" /> }
export const Profile = { render: () => <TabBarDemo initialPath="/profile" /> }
