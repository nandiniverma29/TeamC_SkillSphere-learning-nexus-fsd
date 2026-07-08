import { Link } from "react-router-dom";
import "./Login.css";

function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-eyebrow">● CREATE YOUR ROUTE</p>
        <h1>
          JOIN <span>SKILLSPHERE</span>
        </h1>
        <p className="auth-desc">Start your personalized learning journey.</p>
        <form>
          <label>Name</label>
          <input placeholder="Enter your name" />
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
          <label>Password</label>
          <input type="password" placeholder="Create password" />
          <button className="auth-btn">CREATE ACCOUNT →</button>
        </form>
        <p className="switch-auth">
          Already registered?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
