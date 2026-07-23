import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'

export default function PhotosValidating() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 20 : p))
    }, 300)

    const navTimer = setTimeout(() => {
      navigate('/items/identifying')
    }, 1800)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(navTimer)
    }
  }, [navigate])

  return (
    <PhoneFrame title="Upload Photos" showBack={false}>
      <div className="center-screen">
        <div className="spinner" />
        <div className="section-title">Validating Photos...</div>
        <div className="section-subtitle">
          Hang tight while we check your photos for quality and completeness.
        </div>
        <div className="progress-track" style={{ maxWidth: 240 }}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <a className="help-link" onClick={() => navigate('/items/identifying')}>
          Skip
        </a>
      </div>
    </PhoneFrame>
  )
}
