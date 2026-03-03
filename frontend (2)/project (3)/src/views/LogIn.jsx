// Login.jsx
import './logIn.css'; // You can reuse the same CSS or create a separate one
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Retrieve stored user data
    const storedUserData = localStorage.getItem('userData');
    
    if (!storedUserData) {
      setError('No account found. Please sign up first.');
      return;
    }

    const userData = JSON.parse(storedUserData);
    
    // Validate credentials
    if (formData.email !== userData.email) {
      setError('Invalid email');
      return;
    }

    if (formData.password !== userData.password) {
      setError('Incorrect password');
      return;
    }

    // If credentials are valid, you can:
    // 1. Store login status
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // 2. Redirect to home page or dashboard
    navigate('/');
  };

  return (
    <div className="login-form">
      <h1>Log In</h1>
      <div className="containerr">
        <div className="main">
          <div className="content">
            <form id="login-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />

              <button className="logbtn" id="loginbtn" type="submit">
                Log In
              </button>
            </form>
            <p className="account">Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <br /><br />
            {error && <p id="error-mssg">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;