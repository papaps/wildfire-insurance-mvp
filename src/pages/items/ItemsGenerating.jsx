import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'

export default function ItemsGenerating() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/chat'), 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <PhoneFrame showBack={false}>
      <div className="center-screen">
        <div className="spinner" />
        <div className="section-title">Generating your wildfire risk score...</div>
        <div className="section-subtitle">
          We're analyzing your property to identify potential wildfire risks and provide
          personalized recommendations.
        </div>
      </div>
    </PhoneFrame>
  )
}
