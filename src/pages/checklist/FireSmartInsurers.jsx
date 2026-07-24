import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { INSURERS } from '../../context/FlowContext'

export default function FireSmartInsurers() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="FireSmart-friendly insurers" onBack={() => navigate('/checklist/share')}>
      <p className="section-subtitle">
        These insurers recognize wildfire mitigation work in fire-prone B.C.
      </p>

      {INSURERS.map((i) => (
        <div key={i.id} className="list-row" style={{ cursor: 'default' }}>
          <div className="list-row-main">
            <span className="list-row-label">{i.label}</span>
            <span className="list-row-sub">{i.firesmartNote}</span>
          </div>
          <button type="button" className="btn-outline" disabled title="Not available yet">
            Get a quote ↗
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', flex: 'none', marginTop: 12 }}
        onClick={() => navigate('/checklist/done')}
      >
        Save my record for later
      </button>
    </PhoneFrame>
  )
}
