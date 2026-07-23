import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import FooterNav from '../components/FooterNav'
import { useFlow } from '../context/FlowContext'

export default function PropertyDetails() {
  const navigate = useNavigate()
  const { propertyDetails, setPropertyDetails } = useFlow()

  function update(field, value) {
    setPropertyDetails((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <PhoneFrame title="Property Details" onBack={() => navigate('/')}>
      <div className="section-title">Tell us about your property</div>
      <p className="section-subtitle">
        This helps us assess the wildfire risk for your home.
      </p>

      <div className="field">
        <label>Street Address</label>
        <input
          type="text"
          value={propertyDetails.streetAddress}
          onChange={(e) => update('streetAddress', e.target.value)}
        />
      </div>

      <div className="field">
        <label>City</label>
        <input
          type="text"
          value={propertyDetails.city}
          onChange={(e) => update('city', e.target.value)}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label>Province</label>
          <input
            type="text"
            value={propertyDetails.province}
            onChange={(e) => update('province', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Postal Code</label>
          <input
            type="text"
            value={propertyDetails.postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label>Property Type</label>
        <select
          value={propertyDetails.propertyType}
          onChange={(e) => update('propertyType', e.target.value)}
        >
          <option value="">Select</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
        </select>
      </div>

      <div className="field">
        <label>Year Built</label>
        <input
          type="text"
          value={propertyDetails.yearBuilt}
          onChange={(e) => update('yearBuilt', e.target.value)}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label>Square Footage</label>
          <input
            type="text"
            value={propertyDetails.squareFootage}
            onChange={(e) => update('squareFootage', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Construction Type</label>
          <select
            value={propertyDetails.constructionType}
            onChange={(e) => update('constructionType', e.target.value)}
          >
            <option value="">Select</option>
            <option value="wood-frame">Wood Frame</option>
            <option value="brick">Brick</option>
            <option value="concrete">Concrete</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label>Roof Type</label>
        <select
          value={propertyDetails.roofType}
          onChange={(e) => update('roofType', e.target.value)}
        >
          <option value="">Select</option>
          <option value="asphalt-shingle">Asphalt Shingle</option>
          <option value="metal">Metal</option>
          <option value="tile">Tile</option>
          <option value="wood-shake">Wood Shake</option>
        </select>
      </div>

      <div className="field">
        <label>Do you currently live here?</label>
        <div className="radio-row">
          <label className="radio-option">
            <input
              type="radio"
              name="livesHere"
              checked={propertyDetails.livesHere === 'yes'}
              onChange={() => update('livesHere', 'yes')}
            />
            Yes
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="livesHere"
              checked={propertyDetails.livesHere === 'no'}
              onChange={() => update('livesHere', 'no')}
            />
            No
          </label>
        </div>
      </div>

      <FooterNav hideBack nextLabel="Next" onNext={() => navigate('/documents')} />
    </PhoneFrame>
  )
}
