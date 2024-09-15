import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Include the CSS file
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from 'react-icons/fa'; // Import icons

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showSignup, setShowSignup] = useState(false); // Toggle for Signup form
  const [rememberMe, setRememberMe] = useState(false); // Remember Me checkbox
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

  const toggleSignupForm = () => {
    setShowSignup((prevState) => !prevState);
  };

  return (
    <div className="login-signup-container">
      <div className={`form-container ${showSignup ? 'signup' : 'login'}`}>
        <div className="form-toggle">
          <button
            type="button"
            className={`toggle-button ${!showSignup ? 'active' : ''}`}
            onClick={() => setShowSignup(false)}
          >
            Login
          </button>
          <button
            type="button"
            className={`toggle-button ${showSignup ? 'active' : ''}`}
            onClick={() => setShowSignup(true)}
          >
            Sign Up
          </button>
        </div>
        <div className="form-content">
          {!showSignup ? (
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
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
              <div className="remember-forgot">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />{' '}
                  Remember Me
                </label>
                <button type="button" className="forgot-password">
                  Forgot Password?
                </button>
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit">Login</button>
            </form>
          ) : (
            <form>
              <h2>Sign Up</h2>
              <div className="input-wrapper">
                <span className="icon">
                  <FaUser /> {/* User icon */}
                </span>
                <input type="text" placeholder="Username" required />
              </div>
              <div className="input-wrapper">
                <span className="icon">
                  <FaEnvelope /> {/* Email icon */}
                </span>
                <input type="email" placeholder="Email" required />
              </div>
              <div className="input-wrapper password-wrapper">
                <span className="icon">
                  <FaLock /> {/* Password icon */}
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                />
                <span className="toggle-password" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye and eye-slash icons */}
                </span>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
