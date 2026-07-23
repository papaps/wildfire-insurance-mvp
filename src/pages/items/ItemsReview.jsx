import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { useFlow, PHOTO_CATEGORIES } from '../../context/FlowContext'

export default function ItemsReview() {
  const navigate = useNavigate()
  const { identifiedItems } = useFlow()

  return (
    <PhoneFrame title="Review AI-detected items" onBack={() => navigate('/photos')}>
      <div className="section-title">Review AI-detected items</div>
      <div className="section-subtitle">
        Please review the items we identified in your photos and confirm they're correct
        before continuing.
      </div>

      {PHOTO_CATEGORIES.map((cat) => {
        const count = identifiedItems[cat.id]?.length ?? 0
        return (
          <button
            key={cat.id}
            className="list-row"
            type="button"
            onClick={() => navigate(`/items/review/${cat.id}`)}
          >
            <div className="list-row-main">
              <span className="list-row-label">{cat.label}</span>
              <span className="list-row-sub">{count} items detected</span>
            </div>
            <span className="status-icon done">✓</span>
          </button>
        )
      })}

      <FooterNav
        backLabel="Back"
        onBack={() => navigate('/photos')}
        nextLabel="Confirm"
        onNext={() => navigate('/items/generating')}
      />
    </PhoneFrame>
  )
}
