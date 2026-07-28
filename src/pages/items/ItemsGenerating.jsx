import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WildfireLoader from '../../components/WildfireLoader'

export default function ItemsGenerating() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/checklist'), 2600)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <WildfireLoader
      title="Calculating your wildfire risk score..."
      subtitle="We're reviewing your property to identify potential risks and prepare personalized recommendations"
    />
  )
}
