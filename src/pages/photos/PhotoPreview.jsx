import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import FooterNav from '../../components/FooterNav'
import { useFlow, PHOTO_CATEGORIES } from '../../context/FlowContext'

export default function PhotoPreview() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const { addPhoto } = useFlow()
  const category = PHOTO_CATEGORIES.find((c) => c.id === categoryId)

  function handleKeep() {
    addPhoto(categoryId)
    navigate(`/photos/${categoryId}`)
  }

  return (
    <PhoneFrame title="Photo Preview" onBack={() => navigate(`/photos/${categoryId}/camera`)}>
      <div className="section-title">Review Photo</div>
      <div className="section-subtitle">Make sure the photo clearly shows the requested area.</div>

      <div
        style={{
          width: '100%',
          aspectRatio: '3 / 4',
          borderRadius: 12,
          background: 'linear-gradient(135deg, var(--teal-tint), var(--teal))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--white)',
          fontSize: 16,
          fontWeight: 500,
          fontFamily: 'var(--font-display)',
          marginBottom: 16,
        }}
      >
        {category ? category.label : 'Photo'}
      </div>

      <FooterNav
        onBack={() => navigate(`/photos/${categoryId}/camera`)}
        onNext={handleKeep}
        backLabel="Retake"
        nextLabel="Keep"
      />
    </PhoneFrame>
  )
}
