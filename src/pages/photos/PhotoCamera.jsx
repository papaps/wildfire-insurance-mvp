import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { PHOTO_CATEGORIES } from '../../context/FlowContext'

export default function PhotoCamera() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const category = PHOTO_CATEGORIES.find((c) => c.id === categoryId)
  const label = category ? category.label.toLowerCase() : 'this area'

  return (
    <PhoneFrame title="" showBack={false}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--teal)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(`/photos/${categoryId}`)}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            color: 'var(--white)',
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          ✕
        </button>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            padding: 24,
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--white)', fontSize: 14, fontWeight: 500, margin: 0, fontFamily: 'var(--font-display)' }}>
            Take a clear photo of your {label}
          </p>
          <div
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              borderRadius: 12,
              background: 'linear-gradient(135deg, var(--teal-tint), var(--teal))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            📷
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 32px' }}>
          <button
            type="button"
            onClick={() => navigate(`/photos/${categoryId}/preview`)}
            aria-label="Take photo"
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              background: 'var(--white)',
              border: '4px solid rgba(255,255,255,0.4)',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
    </PhoneFrame>
  )
}
