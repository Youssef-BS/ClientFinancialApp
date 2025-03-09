import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css'; 
const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = urlParams.get('token');
    if (!tokenFromUrl) {
      setError("Invalid or missing token");
      return;
    }
    setToken(tokenFromUrl);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/reset-password', {
        token,
        newPassword
      });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/auth/sign-in');
      }, 2000);
    } catch (error) {
      setError(error.response?.data.message || "An error occurred");
    }
  };

  if (!token) {
    return (
      <div className="login-signup">
        <div className="form-box">
          <div className="error" style={{ color: 'red', textAlign: 'center' }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-signup">
      <div className="form-box reset-password">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <div className="input-box">
            <input
              type="password"
              placeholder="Enter new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
          {message && <p className="success" style={{ color: '#0D4715' }}>{message}</p>}
          <button type="submit" className="btn" style={{ backgroundColor: "#0D4715", width: "50%" }}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 