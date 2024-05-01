import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSchedule = ({ userId }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [shiftId, setShiftId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/schedule/${userId}`);
      setSchedule(response.data);
      console.log('Schedule:', response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setLoading(false);
    }
  };

  // Ensure endTime is set before submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('User ID:', userId); // Print userId to verify
      console.log('Adding/Updating schedule:', date, shiftId, startTime, endTime);

      // Fetch schedule before adding or updating
      const response = await axios.get(`http://localhost:3000/api/schedule/${userId}`);
      console.log('Schedule received:', response.data);
      setSchedule(response.data);

      // Check if endTime is set
      if (!endTime) {
        alert('Please select an end time.');
        return;
      }


      // Check for conflicts with existing schedule
    const existingSchedule = schedule.find(item => {
      const scheduleDate = new Date(item.date);
      const selectedDate = new Date(date);
      return (
        scheduleDate.getDate() === selectedDate.getDate() &&
        scheduleDate.getMonth() === selectedDate.getMonth() &&
        scheduleDate.getFullYear() === selectedDate.getFullYear() &&
        item.startTime === startTime &&
        item.endTime === endTime
      );
    });
      if (existingSchedule) {
        alert('A schedule for the selected date already exists. Please choose another date.');
        return;
      }

      // Pass userId and endTime in the request body
      await axios.post('http://localhost:3000/api/schedule', {
        user_id: userId, // Pass userId from props
        date,
        shift_id: shiftId,
        startTime,
        endTime // Include endTime in the request body
      });
      fetchSchedule(); // Refresh schedule after adding or updating
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('A schedule for the same date already exists.');
      } else {
        console.error('Error adding/updating schedule:', error);
        alert('An error occurred while adding/updating the schedule. Please try again later.');
      }
    }
  };
  
  const generateEndTimeOptions = () => {
    const endTimes = [];
    const start = new Date(`1970-01-01T${startTime}`);
    const currentHour = start.getHours();
    const currentMinute = start.getMinutes();
    const startSlot = Math.ceil(currentMinute / 30); // Get the current 30-minute slot
    const minutesAfterStart = currentMinute + 30;
    let hourIncrement = 0;
    
    // Check if the minutes after start exceed 60
    const adjustedMinutes = minutesAfterStart % 60;
    const additionalHours = Math.floor(minutesAfterStart / 60);
  
    for (let i = startSlot; i < 48; i++) { // 48 half-hour slots in a day
      const minuteOffset = (i * 30) % 60;
      const hourOffset = Math.floor((i * 30) / 60) + additionalHours; // Add additional hours if needed
      const time = new Date(start);
      time.setHours(currentHour + hourOffset + hourIncrement);
      time.setMinutes(minuteOffset + adjustedMinutes);
      if (time.getHours() === currentHour && time.getMinutes() <= currentMinute) {
        // Skip the time if it's before the selected start time
        continue;
      }
      if (!isNaN(time.getTime())) { // Check if the date is valid
        endTimes.push({
          value: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          label: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
      if (hourOffset === 1) {
        // Handle incrementing hour by 1 when needed (e.g., from 11:30 PM to 12:00 AM)
        hourIncrement++;
      }
    }
    return endTimes;
  };
  
  
  

  return (
    <div className="schedule-container">
      <h2>Manage Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="schedule-form">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="shiftId">Shift ID:</label>
            <input
              type="text"
              id="shiftId"
              value={shiftId}
              onChange={(e) => setShiftId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <select
  id="endTime"
  value={endTime}
  onChange={(e) => setEndTime(e.target.value)}
  required
>
  {generateEndTimeOptions().map((time, index) => (
    <option key={index} value={time.value}>{time.label}</option>
  ))}
</select>

          </div>
          <button type="submit">Add/Update Schedule</button>
        </div>
      </form>

      <div className="schedule-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          schedule.map((item) => (
            <div key={item._id} className="schedule-item">
              <p>Date: {new Date(item.date).toLocaleDateString()}</p>
              <p>Shift ID: {item.shift_id}</p>
              <p>Start Time: {item.startTime}</p>
              <p>End Time: {item.endTime}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageSchedule;
