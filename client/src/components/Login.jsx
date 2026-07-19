import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        login(data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Could not reach the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Access your route</p>
        <h1>Welcome <em>back</em></h1>
        <p className="auth-sub">Continue your learning journey and track your progress.</p>

        {error && <div className="auth-error">{error}</div>}

        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C33.6 6 29 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C33.6 6 29 4 24 4c-7.4 0-13.8 4.2-17.1 10.3z"/>
            <path fill="#4CAF50" d="M24 44c5 0 9.4-1.7 12.9-4.6l-6-5c-2 1.4-4.6 2.2-6.9 2.2-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.9 39.8 16.4 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6 5C40.5 35.6 44 30.4 44 24c0-1.2-.1-2.4-.4-3.5z"/>
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider"><span>or</span></div>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <p style={{ textAlign: 'right', marginTop: '0.5rem' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--chalk-dim)' }}>
            Forgot password?
          </Link>
        </p>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login →'}
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>

      <style>
        {".auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--ink); padding: 2rem; } .auth-card { background: var(--ridge); border: 1px solid var(--contour); padding: 2.5rem; max-width: 420px; width: 100%; } .auth-card h1 { font-family: var(--font-display); font-weight: 700; font-size: 2.2rem; text-transform: uppercase; margin: 0.5rem 0 0.75rem; } .auth-card h1 em { font-style: normal; color: var(--orange); } .auth-sub { color: var(--chalk-dim); font-size: 0.9rem; margin-bottom: 1rem; } .auth-card label { display: block; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--chalk-dim); margin-bottom: 0.4rem; margin-top: 1.1rem; } .auth-card input { width: 100%; background: var(--ink); border: 1px solid var(--contour); color: var(--chalk); padding: 0.75rem 0.9rem; font-family: var(--font-body); font-size: 0.95rem; } .auth-card input:focus { outline: none; border-color: var(--orange); } .submit-btn { width: 100%; margin-top: 1.75rem; background: var(--orange); color: var(--ink); border: none; padding: 0.9rem; font-family: var(--font-mono); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; transition: background 0.2s ease; } .submit-btn:hover { background: var(--orange-dim); } .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; } .auth-switch { text-align: center; margin-top: 1.5rem; color: var(--chalk-dim); font-size: 0.85rem; } .auth-switch a { color: var(--orange); font-weight: 600; } .auth-error { background: rgba(220,80,60,0.15); border: 1px solid #dc503c; color: #ff9c8a; padding: 0.7rem 0.9rem; font-size: 0.85rem; margin-bottom: 0.5rem; } .google-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.65rem; background: var(--chalk); color: var(--ink); border: none; padding: 0.85rem; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 600; margin-top: 1.5rem; cursor: pointer; transition: transform 0.15s ease; } .google-btn:hover { transform: translateY(-2px); } .auth-divider { display: flex; align-items: center; text-align: center; color: var(--chalk-dim); font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; margin: 1.25rem 0; } .auth-divider::before, .auth-divider::after { content: ''; flex: 1; border-bottom: 1px solid var(--contour); } .auth-divider span { padding: 0 0.75rem; }"}
      </style>
    </div>
  );
}
