import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-eyebrow">● ACCESS YOUR ROUTE</p>

        <h1>
          WELCOME <span>BACK</span>
        </h1>

        <p className="auth-desc">
          Continue your learning journey and track your progress.
        </p>

        <form autoComplete="off">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
          />

          <button className="auth-btn">LOGIN →</button>
        </form>

        <p className="switch-auth">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
