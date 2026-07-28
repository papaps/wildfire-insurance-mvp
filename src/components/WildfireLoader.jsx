// Centered loading screen used by the "Identifying items" and "Calculating
// wildfire risk score" steps. The ring is the design's Loading Icon SVG — a
// faint track with a coral arc — spun via CSS.
export default function WildfireLoader({ title, subtitle }) {
  return (
    <div className="wf-screen">
      <div className="wf-loader">
        <span className="wf-loader-ring" aria-hidden="true">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle opacity="0.2" cx="30" cy="30" r="27" stroke="#DE7356" strokeWidth="6" />
            <path
              d="M57 30C58.6569 30 60.0155 28.6535 59.8501 27.005C59.5579 24.0928 58.8406 21.2335 57.7164 18.5195C56.2087 14.8797 53.999 11.5726 51.2132 8.7868C48.4274 6.00104 45.1203 3.79125 41.4805 2.28361C38.7665 1.15944 35.9072 0.442076 32.995 0.149876C31.3464 -0.0155359 30 1.34315 30 3C30 4.65685 31.3483 5.98069 32.9922 6.18726C35.1158 6.4541 37.1987 7.00439 39.1844 7.82689C42.0962 9.033 44.742 10.8008 46.9706 13.0294C49.1992 15.258 50.967 17.9038 52.1731 20.8156C52.9956 22.8013 53.5459 24.8842 53.8127 27.0078C54.0193 28.6517 55.3431 30 57 30Z"
              fill="#DE7356"
            />
          </svg>
        </span>
        <h1 className="wf-flow-title wf-loader-title">{title}</h1>
        <p className="wf-loader-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}
