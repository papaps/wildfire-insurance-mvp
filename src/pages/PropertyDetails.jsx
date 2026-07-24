import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import FooterNav from '../components/FooterNav'
import { useFlow } from '../context/FlowContext'
import { supabase } from '../supabase'

const REQUIRED_FIELDS = [
  'streetAddress',
  'city',
  'province',
  'postalCode',
  'propertyType',
  'yearBuilt',
  'nStories',
  'constructionType',
  'roofType',
]

export default function PropertyDetails() {
  const navigate = useNavigate()
  const { propertyDetails, setPropertyDetails, addProperty } = useFlow()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function update(field, value) {
    setPropertyDetails((prev) => ({ ...prev, [field]: value }))
  }

  const formComplete =
    REQUIRED_FIELDS.every((field) => String(propertyDetails[field]).trim()) &&
    /^\d+$/.test(propertyDetails.yearBuilt.trim()) &&
    /^\d+$/.test(propertyDetails.nStories.trim())

  async function handleNext() {
    if (!formComplete) return

    setError('')
    setSubmitting(true)

    try {
      const { data, error: submitError } = await supabase
        .from('submissions')
        .insert({
          street_address: propertyDetails.streetAddress,
          city: propertyDetails.city,
          province: propertyDetails.province,
          postal_code: propertyDetails.postalCode,
          property_type: propertyDetails.propertyType,
          year_built: propertyDetails.yearBuilt ? Number(propertyDetails.yearBuilt) : null,
          n_stories: propertyDetails.nStories ? Number(propertyDetails.nStories) : null,
          construction_type: propertyDetails.constructionType,
          roof_type: propertyDetails.roofType,
          currently_lived_in: propertyDetails.livesHere === 'yes',
        })
        .select('id, street_address, city, created_at')
        .single()

      if (submitError) {
        setError(submitError.message)
        return
      }

      addProperty(data)
      navigate('/documents')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PhoneFrame step="Step 1 of 2" onBack={() => navigate('/')}>
      <div className="section-title">Property Details</div>

      <div className="field">
        <label>Home Address</label>
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

      <div className="field-row">
        <div className="field">
          <label>Year Built</label>
          <input
            type="text"
            inputMode="numeric"
            value={propertyDetails.yearBuilt}
            onChange={(e) => update('yearBuilt', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Number of Stories</label>
          <input
            type="text"
            inputMode="numeric"
            value={propertyDetails.nStories}
            onChange={(e) => update('nStories', e.target.value)}
          />
        </div>
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

      {error && <p className="field-error">{error}</p>}

      <FooterNav
        onBack={() => navigate('/')}
        nextLabel={submitting ? 'Saving...' : 'Next'}
        nextDisabled={submitting || !formComplete}
        onNext={handleNext}
        progress={0.5}
      />
    </PhoneFrame>
  )
}
