import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'

export default function Home() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Home" showBack={false} tabBar>
      <div className="center-screen">
        <button className="btn-outline" onClick={() => navigate('/property-details')}>
          + Add your property
        </button>
      </div>
    </PhoneFrame>
  )
}
