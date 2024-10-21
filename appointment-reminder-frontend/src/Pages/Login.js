import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient', // Default role is 'patient'
  });
  const navigate = useNavigate(); // React Router's hook for navigation

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4001/user/login', formData);  // Send email, password, and role
      
      console.log("Here is res",res);
      // Assuming the backend returns the JWT token in "res.data.token"
      if (res.data.token) {
        document.cookie = `token=${res.data.token}; path=/; SameSite=Lax`; // Store token as a cookie
        console.log("Navigating to home...");
        navigate('/', { replace: true });
// Redirect to the home page after login
        console.log("prajwal ki mkb");
      } else {
        alert('Login failed, please check your credentials');
      }
    } catch (error) {
      console.error(error);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
