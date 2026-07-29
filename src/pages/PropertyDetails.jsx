import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepProgress from '../components/StepProgress'
import WfRadio from '../components/WfRadio'
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
    <div className="wf-screen wf-flow">
      <div className="wf-flow-top">
        <StepProgress label="Step 1 of 2" value={0.5} />
      </div>

      <div className="wf-flow-content">
        <h1 className="wf-flow-title">Property Details</h1>

        <div className="wf-form">
          <div className="wf-field">
            <label htmlFor="pd-address">Home Address</label>
            <input
              id="pd-address"
              className="wf-input"
              type="text"
              placeholder="Address"
              value={propertyDetails.streetAddress}
              onChange={(e) => update('streetAddress', e.target.value)}
            />
          </div>

          <div className="wf-field">
            <label htmlFor="pd-city">City</label>
            <input
              id="pd-city"
              className="wf-input"
              type="text"
              placeholder="City"
              value={propertyDetails.city}
              onChange={(e) => update('city', e.target.value)}
            />
          </div>

          <div className="wf-field-row">
            <div className="wf-field">
              <label htmlFor="pd-province">Province</label>
              <div className="wf-select-wrap">
                <select
                  id="pd-province"
                  className="wf-select"
                  data-empty={propertyDetails.province === '' || undefined}
                  value={propertyDetails.province}
                  onChange={(e) => update('province', e.target.value)}
                >
                  <option value="" disabled>Select Province</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="YT">Yukon</option>
                </select>
              </div>
            </div>
            <div className="wf-field">
              <label htmlFor="pd-postal">Postal Code</label>
              <input
                id="pd-postal"
                className="wf-input"
                type="text"
                placeholder="Postal"
                value={propertyDetails.postalCode}
                onChange={(e) => update('postalCode', e.target.value)}
              />
            </div>
          </div>

          <div className="wf-field">
            <label htmlFor="pd-type">Property Type</label>
            <div className="wf-select-wrap">
              <select
                id="pd-type"
                className="wf-select"
                data-empty={propertyDetails.propertyType === '' || undefined}
                value={propertyDetails.propertyType}
                onChange={(e) => update('propertyType', e.target.value)}
              >
                <option value="" disabled>Select Type</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
          </div>

          <div className="wf-field-row">
            <div className="wf-field">
              <label htmlFor="pd-year">Year Built</label>
              <input
                id="pd-year"
                className="wf-input"
                type="text"
                inputMode="numeric"
                placeholder="YYYY"
                value={propertyDetails.yearBuilt}
                onChange={(e) => update('yearBuilt', e.target.value)}
              />
            </div>
            <div className="wf-field">
              <label htmlFor="pd-stories">Number of Stories</label>
              <input
                id="pd-stories"
                className="wf-input"
                type="text"
                inputMode="numeric"
                placeholder="1"
                value={propertyDetails.nStories}
                onChange={(e) => update('nStories', e.target.value)}
              />
            </div>
          </div>

          <div className="wf-field">
            <label htmlFor="pd-construction">Construction Type</label>
            <div className="wf-select-wrap">
              <select
                id="pd-construction"
                className="wf-select"
                data-empty={propertyDetails.constructionType === '' || undefined}
                value={propertyDetails.constructionType}
                onChange={(e) => update('constructionType', e.target.value)}
              >
                <option value="" disabled>Select Type</option>
                <option value="wood-frame">Wood Frame</option>
                <option value="brick">Brick</option>
                <option value="concrete">Concrete</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="wf-field">
            <label htmlFor="pd-roof">Roof Type</label>
            <div className="wf-select-wrap">
              <select
                id="pd-roof"
                className="wf-select"
                data-empty={propertyDetails.roofType === '' || undefined}
                value={propertyDetails.roofType}
                onChange={(e) => update('roofType', e.target.value)}
              >
                <option value="" disabled>Select Type</option>
                <option value="asphalt-shingle">Asphalt Shingle</option>
                <option value="metal">Metal</option>
                <option value="tile">Tile</option>
                <option value="wood-shake">Wood Shake</option>
              </select>
            </div>
          </div>

          <div className="wf-field">
            <label>Do you currently live here?</label>
            <div className="wf-radio-row">
              <WfRadio
                name="livesHere"
                label="Yes"
                checked={propertyDetails.livesHere === 'yes'}
                onChange={() => update('livesHere', 'yes')}
              />
              <WfRadio
                name="livesHere"
                label="No"
                checked={propertyDetails.livesHere === 'no'}
                onChange={() => update('livesHere', 'no')}
              />
            </div>
          </div>

          {error && <p className="wf-flow-error">{error}</p>}
        </div>
      </div>

      <div className="wf-flow-footer">
        <button type="button" className="wf-textbtn" onClick={() => navigate('/')}>
          Cancel
        </button>
        <button
          type="button"
          className="wf-nextbtn"
          disabled={submitting || !formComplete}
          onClick={handleNext}
        >
          {submitting ? 'Saving…' : 'Next'}
        </button>
      </div>
    </div>
  )
}
