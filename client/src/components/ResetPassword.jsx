import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!token) {
      setError('This reset link is missing its token. Please request a new one.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not reset password');
      } else {
        setMessage(data.message);
        setTimeout(() => navigate('/login'), 2000);
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
        <p className="eyebrow">Almost there</p>
        <h1>Set a <em>new password</em></h1>
        <p className="auth-sub">Choose a new password for your account.</p>

        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-message">{message} Redirecting to login...</div>}

        {!token && !error && (
          <div className="auth-error">
            No reset token found in this link. Please use the link from your email, or{' '}
            <Link to="/forgot-password">request a new one</Link>.
          </div>
        )}

        <label>New password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
          minLength={6}
        />

        <label>Confirm new password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
          minLength={6}
        />

        <button type="submit" className="submit-btn" disabled={loading || !token}>
          {loading ? 'Resetting...' : 'Reset password →'}
        </button>

        <p className="auth-switch">
          <Link to="/login">Back to login</Link>
        </p>
      </form>

      <style>
        {".auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--ink); padding: 2rem; } .auth-card { background: var(--ridge); border: 1px solid var(--contour); padding: 2.5rem; max-width: 420px; width: 100%; } .auth-card h1 { font-family: var(--font-display); font-weight: 700; font-size: 2.2rem; text-transform: uppercase; margin: 0.5rem 0 0.75rem; } .auth-card h1 em { font-style: normal; color: var(--orange); } .auth-sub { color: var(--chalk-dim); font-size: 0.9rem; margin-bottom: 1rem; } .auth-card label { display: block; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--chalk-dim); margin-bottom: 0.4rem; margin-top: 1.1rem; } .auth-card input { width: 100%; background: var(--ink); border: 1px solid var(--contour); color: var(--chalk); padding: 0.75rem 0.9rem; font-family: var(--font-body); font-size: 0.95rem; } .auth-card input:focus { outline: none; border-color: var(--orange); } .submit-btn { width: 100%; margin-top: 1.75rem; background: var(--orange); color: var(--ink); border: none; padding: 0.9rem; font-family: var(--font-mono); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; transition: background 0.2s ease; } .submit-btn:hover { background: var(--orange-dim); } .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; } .auth-switch { text-align: center; margin-top: 1.5rem; color: var(--chalk-dim); font-size: 0.85rem; } .auth-switch a { color: var(--orange); font-weight: 600; } .auth-error { background: rgba(220,80,60,0.15); border: 1px solid #dc503c; color: #ff9c8a; padding: 0.7rem 0.9rem; font-size: 0.85rem; margin-bottom: 0.5rem; } .auth-message { background: rgba(156,185,138,0.15); border: 1px solid var(--sage, #9cb98a); color: var(--sage, #9cb98a); padding: 0.7rem 0.9rem; font-size: 0.85rem; margin-bottom: 0.5rem; }"}
      </style>
    </div>
  );
}
