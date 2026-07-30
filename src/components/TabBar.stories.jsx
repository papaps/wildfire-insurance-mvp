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
}

export const Home = { args: { active: 'home' } }
export const Chat = { args: { active: 'chat' } }
export const Profile = { args: { active: 'profile' } }
