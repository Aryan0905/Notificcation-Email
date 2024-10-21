import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        withCredentials: true  // Include cookies in the request
      });
      alert('Appointment booked successfully');
    } catch (error) {
      console.error(error);
      alert('Booking failed');
    }
  };

  const handleLogout = async () => {
    try {
      // Make a GET request to the backend logout API
      await axios.get('http://localhost:4001/user/logout', {
        withCredentials: true, // Include cookies in the request
      });

      // Remove the token cookie by setting its expiration to a past date
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirect the user to the login page after logging out
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}



export default Home;
