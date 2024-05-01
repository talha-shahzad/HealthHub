import React, { useState } from 'react';

const ClientBookAppointment = ({ doctor, availableDates, userId,onBookAppointment, onCancel, onDateSelect }) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('NULL');

  const handleBookAppointmentClick = () => {
    // Check if client name and email are provided
    if (selectedDate==='NULL') {
      alert('Please select the date before booking the appointment.');
      return;
    }

    // Check if a date is selected
    if (!selectedDate) {
      alert('Please select a date for the appointment.');
      return;
    }

    // Pass client info to the parent component
    onBookAppointment({
      client_id: userId,
      name: clientName,
      email: clientEmail
    });

    // Reset client name and email fields after booking appointment
    setClientName('');
    setClientEmail('');
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate); // Set the selected date
    onDateSelect(selectedDate); // Pass the selected date to the parent component
  };

  return (
    <div className="appointment-form">
      <h3>Book Appointment</h3>
      <p>Doctor: {doctor.user.fullName}</p>
      <p>DoctorId: {doctor.user._id}</p>
      <p>ClientId: {userId}</p>
      <label>
        Select Date:
        <select onChange={handleDateChange}>
          <option value={selectedDate}>Select Date</option>
          {availableDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </label>
      {/* <label>
        Client Name:
        <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
      </label>
      <label>
        Client Email:
        <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
      </label> */}
      <button onClick={handleBookAppointmentClick}>Book Appointment</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ClientBookAppointment;
