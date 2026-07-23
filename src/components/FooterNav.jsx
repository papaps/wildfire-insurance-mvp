// Shared Back/Next (or Back/Confirm) button row pinned to the bottom of a
// screen's content, matching the mockup's two-button footer pattern.
export default function FooterNav({
  onBack,
  onNext,
  backLabel = 'Back',
  nextLabel = 'Next',
  hideBack = false,
  nextDisabled = false,
}) {
  return (
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
  )
}
