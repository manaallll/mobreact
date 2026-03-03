import './signUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters long');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    navigate('/login');
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      <div className="containerr">
        <div className="main">
          <div className="content">
            <form id="signup-form" onSubmit={handleSubmit}>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
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
              <input 
                type="password" 
                id="confirm-password" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />

              <button className="signbtn" id="signupbtn" type="submit">
                Sign Up
              </button>
            </form>
            <p className="account">Already have an account? <Link to="/login">Log in</Link></p>
            <br /><br />
            {error && <p id="error-mssg">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
