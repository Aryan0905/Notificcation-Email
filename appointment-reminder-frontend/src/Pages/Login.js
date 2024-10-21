import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css';



function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient', 
  });
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4001/user/login', formData);
      console.log("Here is res", res);

      if (res.data.token) {
        document.cookie = `token=${res.data.token}; path=/; SameSite=Lax`;
        navigate('/'); 
      } else {
        alert('Login failed, please check your credentials');
      }
    } catch (error) {
      console.error(error);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select name="role" value={formData.role} onChange={handleInputChange}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
     
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>

    </div>
  );
}

export default Login;
