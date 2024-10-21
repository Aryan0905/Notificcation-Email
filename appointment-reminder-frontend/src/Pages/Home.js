import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 



function Home() {
  const [formData, setFormData] = useState({
    date: '',
    time: ''
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
      await axios.post('http://localhost:4001/api/book', formData, {
        withCredentials: true,  
      });
      alert('Appointment booked successfully');
    } catch (error) {
      console.error(error);
      alert('Booking failed');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4001/user/logout', {
        withCredentials: true, 
      });

      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="home-container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <button type="submit" className="submit-btn">Book Appointment</button>
      </form>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
}

export default Home;
