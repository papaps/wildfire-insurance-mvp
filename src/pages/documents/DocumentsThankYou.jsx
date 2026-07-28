import { useNavigate } from 'react-router-dom'
import { Flower } from '../../components/WildfireIcons'

export default function DocumentsThankYou() {
  const navigate = useNavigate()

  return (
    <div className="wf-screen wf-flow">
      <div className="wf-thanks">
        <Flower size={43} />
        <h1 className="wf-flow-title wf-thanks-title">Your details have been saved.</h1>
        <p className="wf-thanks-text">
          Upload existing photos or take new ones to continue your wildfire risk assessment.
        </p>
      </div>

      <div className="wf-flow-footer wf-flow-footer-single">
        <button
          type="button"
          className="wf-nextbtn wf-nextbtn-full"
          onClick={() => navigate('/photos')}
        >
          Next
        </button>
      </div>
    </div>
  )
}
