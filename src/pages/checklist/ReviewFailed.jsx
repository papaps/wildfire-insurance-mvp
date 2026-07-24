import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { useFlow, CHECKLIST_ITEMS } from '../../context/FlowContext'

export default function ReviewFailed() {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const { updateChecklistItem } = useFlow()
  const item = CHECKLIST_ITEMS.find((i) => i.id === itemId)

  function markComplete() {
    updateChecklistItem(itemId, { done: true })
    navigate('/checklist/items')
  }

  return (
    <PhoneFrame title="AI review" onBack={() => navigate(`/checklist/items/${itemId}`)}>
      <div
        style={{
          aspectRatio: '4 / 3',
          borderRadius: 10,
          background: 'linear-gradient(135deg, var(--teal-wash), #C9D6D6)',
          marginBottom: 16,
        }}
      />

      <div className="section-title">I can't confirm this yet</div>
      <div className="section-subtitle">
        This still doesn't look complete in this photo for {item?.label ?? 'this item'}.
        Try a photo from further back that shows the full area.
      </div>

      <div className="section-subtitle" style={{ fontWeight: 500, color: 'var(--teal)' }}>
        YOU HAVE THE FINAL SAY — The AI can be wrong. If you're sure the work is done, you
        can mark it complete yourself.
      </div>

      <FooterNav
        backLabel="Redo photo"
        onBack={() => navigate(`/checklist/items/${itemId}`)}
        nextLabel="Mark Complete"
        onNext={markComplete}
      />
    </PhoneFrame>
  )
}
