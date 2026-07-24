// Shared Back/Next (or Back/Confirm) button row pinned to the bottom of a
// screen's content, matching the mockup's two-button footer pattern.
export default function FooterNav({
  onBack,
  onNext,
  backLabel = 'Back',
  nextLabel = 'Next',
  hideBack = false,
  nextDisabled = false,
  progress,
}) {
  return (
    <div className="footer-nav-wrap">
      <div className="footer-nav">
        {!hideBack && (
          <button className="btn btn-secondary" onClick={onBack} type="button">
            {backLabel}
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={onNext}
          type="button"
          disabled={nextDisabled}
        >
          {nextLabel}
        </button>
      </div>
      {typeof progress === 'number' && (
        <div className="progress-track footer-progress">
          <div className="progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}
    </div>
  )
}
