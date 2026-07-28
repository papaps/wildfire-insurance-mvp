import { useAuth } from '../context/AuthContext'
import TabBar from '../components/TabBar'
import { UserRound, Settings, CircleHelp } from '../components/WildfireIcons'
import profileImg from '../assets/profile.jpg'

export default function Profile() {
  const { user, signOut } = useAuth()

  const meta = user?.user_metadata ?? {}
  const fullName =
    [meta.first_name, meta.last_name].filter(Boolean).join(' ') || 'Andrew Thompson'
  const email = user?.email || 'andrew.thompson@gmail.com'

  return (
    <div className="wf-screen">
      <div className="wf-profile-user">
        <img className="wf-avatar" src={profileImg} alt="" />
        <div>
          <div className="wf-profile-name">{fullName}</div>
          <div className="wf-profile-email">{email}</div>
        </div>
      </div>

      <div className="wf-menu-list">
        <button type="button" className="wf-menu-item">
          <UserRound size={20} />
          My Profile
        </button>
        <div className="wf-divider" />
        <button type="button" className="wf-menu-item">
          <Settings size={20} />
          Settings
        </button>
        <div className="wf-divider" />
        <button type="button" className="wf-menu-item">
          <CircleHelp size={20} />
          FAQ
        </button>
      </div>

      <div className="wf-profile-card">
        <button type="button" className="wf-card-row">
          Change Password
        </button>
        <div className="wf-divider" />
        <button
          type="button"
          className="wf-card-row wf-card-row-danger"
          onClick={() => signOut()}
        >
          Log out
        </button>
      </div>

      <TabBar active="profile" />
    </div>
  )
}
