import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Login/Login.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      setError("Email already registered");
      return;
    }
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/home", { replace: true });
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Register</h2>
        
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
        
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        
        <button type="submit">Register</button>
        
        <p className="hint">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}