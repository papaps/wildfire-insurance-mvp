import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <PhoneFrame
      title="Home"
      showBack={false}
      tabBar
      right={
        <span className="help-link" style={{ marginBottom: 0 }} onClick={handleSignOut}>
          Sign out
        </span>
      }
    >
      <div className="center-screen">
        <button className="btn-outline" onClick={() => navigate('/property-details')}>
          + Add your property
        </button>
      </div>
    </PhoneFrame>
  )
}
