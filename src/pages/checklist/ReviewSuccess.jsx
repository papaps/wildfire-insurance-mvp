import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { useFlow, CHECKLIST_ITEMS } from '../../context/FlowContext'

export default function ReviewSuccess() {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const { updateChecklistItem } = useFlow()
  const item = CHECKLIST_ITEMS.find((i) => i.id === itemId)

  useEffect(() => {
    updateChecklistItem(itemId, { done: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId])

  return (
    <PhoneFrame title="Review" onBack={() => navigate(`/checklist/items/${itemId}`)}>
      <div
        style={{
          aspectRatio: '4 / 3',
          borderRadius: 10,
          background: 'linear-gradient(135deg, #e2e4ea, #cfd2da)',
          marginBottom: 16,
        }}
      />

      <div className="section-title">✓ This looks complete to me</div>
      <div className="section-subtitle">
        {item?.label ?? 'This item'} no longer appears to be a problem in this photo. I've
        added it to your record with today's date.
      </div>

      <FooterNav
        backLabel="Redo photo"
        onBack={() => navigate(`/checklist/items/${itemId}`)}
        nextLabel="Back to my checklist"
        onNext={() => navigate('/checklist/items')}
      />
    </PhoneFrame>
  )
}
