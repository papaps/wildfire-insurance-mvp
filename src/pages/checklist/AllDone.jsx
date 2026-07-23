import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'

export default function AllDone() {
  const navigate = useNavigate()

  function handleDownload() {
    alert('This is a mockup — PDF export is not implemented.')
  }

  return (
    <PhoneFrame title="All done" onBack={() => navigate('/')}>
      <div className="center-screen">
        <div className="big-icon">✓</div>
        <div className="section-title">Record saved</div>
        <p className="section-subtitle">
          Your report and photos are stored privately on your device. Bring them to your
          renewal, or share them with a FireSmart assessor.
        </p>
        <p className="section-subtitle">Next check-in reminder — January 2027</p>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', flex: 'none', marginBottom: 10 }}
        onClick={handleDownload}
      >
        Download report (PDF)
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        style={{ width: '100%', flex: 'none' }}
        onClick={() => navigate('/')}
      >
        Back to home
      </button>
    </PhoneFrame>
  )
}
