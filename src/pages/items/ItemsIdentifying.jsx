import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'

export default function ItemsIdentifying() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/items/review'), 1800)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <PhoneFrame showBack={false}>
      <div className="center-screen">
        <div className="spinner" />
        <div className="section-title">Identifying items in your photos...</div>
        <div className="section-subtitle">This may take a few moments.</div>
      </div>
    </PhoneFrame>
  )
}
