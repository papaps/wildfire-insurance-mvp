import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Upload, CameraOutline, XMark, FilePdf, Trash2 } from '../../components/WildfireIcons'
import { useFlow, CHECKLIST_ITEMS } from '../../context/FlowContext'
import grass from '../../assets/grass.png'

// Action Item — attach evidence for a single checklist fix. Renders the empty
// state (just the two upload actions) or the uploaded state (photo grid + file
// rows). Evidence lives in FlowContext so it survives back-navigation, and the
// upload actions are simulated (no real picker) per the flow spec.
export default function MarkItemComplete() {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const { checklistProgress, addChecklistFiles, addChecklistPhoto, removeChecklistPhoto, removeChecklistFile } =
    useFlow()

  const item = CHECKLIST_ITEMS.find((i) => i.id === itemId)
  const evidence = checklistProgress[itemId]?.evidence ?? { photos: [], files: [] }
  const hasEvidence = evidence.photos.length > 0 || evidence.files.length > 0

  const back = () => navigate('/checklist/items')

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-flow-top">
        <button type="button" className="wf-iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="wf-flow-content wf-item-content">
        <div className="wf-item-headwrap">
          <div className="wf-item-heading">
            <span className="wf-item-tag">{item?.cost ?? 'Free'}</span>
            <h1 className="wf-item-title">{item?.label ?? 'Checklist item'}</h1>
          </div>
          <p className="wf-item-desc">{item?.description}</p>
        </div>

        {evidence.photos.length > 0 && (
          <div className="wf-item-grid">
            {evidence.photos.map((id) => (
              <div key={id} className="wf-detail-thumb">
                <img src={grass} alt="" />
                <button
                  type="button"
                  className="wf-detail-remove"
                  onClick={() => removeChecklistPhoto(itemId, id)}
                  aria-label="Remove photo"
                >
                  <XMark size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {evidence.files.map((name) => (
          <div key={name} className="wf-file-row">
            <FilePdf size={24} />
            <span className="wf-file-name">{name}</span>
            <button
              type="button"
              className="wf-file-delete"
              onClick={() => removeChecklistFile(itemId, name)}
              aria-label="Remove file"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <div className="wf-item-actions">
          <button type="button" className="wf-item-action" onClick={() => addChecklistFiles(itemId)}>
            <Upload size={20} />
            Upload Files
          </button>
          <button type="button" className="wf-item-action" onClick={() => addChecklistPhoto(itemId)}>
            <CameraOutline size={20} />
            Take Photo
          </button>
        </div>
      </div>

      <div className="wf-flow-footer wf-flow-footer-single">
        <button
          type="button"
          className="wf-nextbtn wf-nextbtn-full"
          disabled={!hasEvidence}
          onClick={() => navigate(`/checklist/items/${itemId}/review`)}
        >
          Submit for AI Review
        </button>
      </div>
    </div>
  )
}
