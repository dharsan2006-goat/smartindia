import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import "animate.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setShowWelcome(true);
      setTimeout(() => navigate("/home"), 2000);
    } else {
      setError("Invalid email or password");
    }
  };

  if (showWelcome) {
    return (
      <div className="login-container">
        <div className="welcome-message animate__animated animate__bounceIn">
          <h1>Welcome to Pushpa Book Store!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login-box animate__animated animate__fadeInDown" onSubmit={handleLogin}>
        <div className="login-icon">📚</div>
        <h2>Pushpa Bookstore</h2>
        <p className="subtitle">Login to your account</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Login</button>

        <p className="hint">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
