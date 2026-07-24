import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { GoogleIcon, FacebookIcon } from '../../components/AuthIcons'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: signInError } = await signIn({ email, password })

    setSubmitting(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    navigate('/')
  }

  return (
    <PhoneFrame title="Log In" showBack={false}>
      <div className="auth-center">
        <div className="section-title">Sign in</div>
        <p className="section-subtitle">Enter your email and password to log in</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-row">
            <label className="radio-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <span
              className="help-link help-link-disabled"
              title="Not available in this demo"
            >
              Forgot Password?
            </span>
          </div>

          {error && <p className="field-error">{error}</p>}

          <button className="btn btn-primary auth-submit" type="submit" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="auth-divider">Or</div>

        <button
          className="btn btn-secondary auth-submit auth-sso-btn"
          type="button"
          disabled
          title="Not available in this demo"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          className="btn btn-secondary auth-submit auth-sso-btn"
          type="button"
          disabled
          title="Not available in this demo"
        >
          <FacebookIcon />
          Continue with Facebook
        </button>

        <p className="auth-switch">
          Don't have an account?{' '}
          <span className="help-link" onClick={() => navigate('/signup')}>
            Sign Up
          </span>
        </p>
      </div>
    </PhoneFrame>
  )
}
