import { useState } from 'react'

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--black)',
    padding: 24,
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    padding: '48px 40px',
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: 'var(--text)',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: 'var(--text-muted)',
    marginBottom: 32,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: 'var(--text-muted)',
    marginBottom: 8,
    fontFamily: 'var(--font-display)',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--black)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: 16,
    outline: 'none',
  },
  btn: {
    width: '100%',
    padding: '16px',
    background: 'var(--gold)',
    color: 'var(--black)',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: 8,
  },
  error: {
    color: 'var(--danger)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
  },
}

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD
    if (!adminPass) {
      setError('Admin password not configured. Set VITE_ADMIN_PASSWORD env variable.')
      return
    }

    if (password === adminPass) {
      onLogin()
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin</h1>
        <p style={styles.subtitle}>Atapower Management Panel</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" style={styles.btn}>Enter</button>
          {error && <div style={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  )
}
