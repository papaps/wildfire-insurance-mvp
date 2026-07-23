import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame'
import { useAuth } from '../../context/AuthContext'

export default function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [confirmationPending, setConfirmationPending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const { data, error: signUpError } = await signUp({ email, password, firstName, lastName })

    setSubmitting(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      navigate('/')
      return
    }

    // No session yet means the project has email confirmation turned on.
    setConfirmationPending(true)
  }

  if (confirmationPending) {
    return (
      <PhoneFrame title="Sign Up" showBack={false}>
        <div className="center-screen">
          <div className="big-icon">✓</div>
          <div className="section-title">Check your email</div>
          <p className="section-subtitle">
            We sent a confirmation link to {email}. Confirm it, then log in.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Log In
          </button>
        </div>
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame title="Sign Up" showBack={false}>
      <div className="section-title">Create your account</div>
      <p className="section-subtitle">Enter your details to get started</p>

      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

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

        {error && <p className="field-error">{error}</p>}

        <button className="btn btn-primary auth-submit" type="submit" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <div className="auth-divider">Or</div>

      <button className="btn btn-secondary auth-submit" type="button" disabled title="Not available in this demo">
        Continue with Google
      </button>
      <button className="btn btn-secondary auth-submit" type="button" disabled title="Not available in this demo">
        Continue with Facebook
      </button>

      <p className="auth-switch">
        Already have an account?{' '}
        <span className="help-link" onClick={() => navigate('/login')}>
          Log In
        </span>
      </p>
    </PhoneFrame>
  )
}
