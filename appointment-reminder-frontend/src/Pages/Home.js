import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [formData, setFormData] = useState({
    date: '',
    time: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // const token=localStorage.getItem(token);
  // console.log("this is frontend token jbdsfj : ",token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // No need to pass the token explicitly, just send the form data
      // const token=localStorage.getItem(token);
      // console.log("this is frontend token jbdsfj : ",token);
      await axios.post('http://localhost:4001/api/book', formData, {
        withCredentials: true  // Include cookies in the request
      });
      alert('Appointment booked successfully');
    } catch (error) {
      console.error(error);
      alert('Booking failed');
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
    </div>
  );
}

export default Home;
