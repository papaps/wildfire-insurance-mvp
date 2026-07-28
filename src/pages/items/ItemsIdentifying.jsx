import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WildfireLoader from '../../components/WildfireLoader'

export default function ItemsIdentifying() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/items/review'), 2600)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <WildfireLoader
      title="Identifying items in your photos"
      subtitle="This helps us find features that may affect wildfire risk."
    />
  )
}
