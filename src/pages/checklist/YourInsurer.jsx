import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { useFlow, INSURERS } from '../../context/FlowContext'

export default function YourInsurer() {
  const navigate = useNavigate()
  const { insurer, setInsurer } = useFlow()
  const [search, setSearch] = useState('')

  const filteredInsurers = INSURERS.filter((i) =>
    i.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PhoneFrame title="Your insurer" onBack={() => navigate('/checklist/share')}>
      <div className="section-title">Who insures your home?</div>

      <div className="field">
        <input
          type="text"
          placeholder="Search insurers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="radio-row" style={{ flexDirection: 'column', gap: 0 }}>
        {filteredInsurers.map((i) => (
          <label key={i.id} className="list-row" style={{ cursor: 'pointer' }}>
            <div className="list-row-main">
              <span className="list-row-label">{i.label}</span>
              <span className="list-row-sub">{i.firesmartNote}</span>
            </div>
            <input
              type="radio"
              name="insurer"
              checked={insurer.insurerId === i.id}
              onChange={() => setInsurer({ insurerId: i.id })}
            />
          </label>
        ))}
      </div>

      <div className="field">
        <label>Policy number (optional)</label>
        <input
          type="text"
          value={insurer.policyNumber}
          onChange={(e) => setInsurer({ policyNumber: e.target.value })}
        />
      </div>

      <p className="section-subtitle">
        Nothing is sent yet — choosing your insurer just addresses the report. You'll review
        exactly what's included before anything is shared.
      </p>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', flex: 'none', marginBottom: 10 }}
        onClick={() => navigate('/checklist/send')}
      >
        Review before sending
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        style={{ width: '100%', flex: 'none' }}
        onClick={() => navigate('/checklist/done')}
      >
        Save my record for later
      </button>

      <div
        className="help-link"
        style={{ textAlign: 'center', width: '100%' }}
        onClick={() => navigate('/checklist/share/browse')}
      >
        My insurer isn't listed
      </div>
    </PhoneFrame>
  )
}
