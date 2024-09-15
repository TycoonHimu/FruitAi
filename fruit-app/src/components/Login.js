import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Include the CSS file
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy credentials
    if (userId === 'user' && password === 'pass') {
      localStorage.setItem('authenticated', 'true');
      navigate('/home');
    } else {
      setError('Invalid UserId or Password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      <h1>Fruit.Ai</h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-wrapper">
          <span className="icon">
            <FaEnvelope /> {/* Email icon */}
          </span>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-wrapper password-wrapper">
          <span className="icon">
            <FaLock /> {/* Password icon */}
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye and eye-slash icons */}
          </span>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
