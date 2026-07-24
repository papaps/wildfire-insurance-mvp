import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'

export default function DocumentsThankYou() {
  const navigate = useNavigate()

  return (
    <PhoneFrame onBack={() => navigate('/documents')}>
      <div className="center-screen">
        <div className="big-icon">{'✓'}</div>
        <div className="section-title">Thanks!</div>
        <p className="section-subtitle">
          We've received your information. Now, upload or take photos of your property to
          continue your wildfire risk assessment.
        </p>
      </div>
      <FooterNav
        onBack={() => navigate('/documents')}
        nextLabel="Next"
        onNext={() => navigate('/photos')}
      />
    </PhoneFrame>
  )
}
