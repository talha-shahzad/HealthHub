import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentDoctor = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/appointments/doctor/${userId}`);
      console.log('Appointments:', response.data);
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  const handleBookAppointment = async (appointmentId, status) => {
    try {
      const response = await axios.put(`http://localhost:3000/appointments/${appointmentId}/status`, {
        status
      });
      if (response.data) {
        fetchAppointments();
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="appointment-container">
      <h2>Appointment Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Table for Pending Appointments */}
          <h3>Pending Appointments</h3>
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>Time Slot</th>
                <th>Patient Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                appointment.status === 'Pending' && (
                  <tr key={appointment._id}>
                    <td>{formatDate(appointment.date)}</td>
                    <td>{appointment.shift}</td>
                    <td>{`${appointment.timeSlotStart} - ${appointment.timeSlotEnd}`}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.status}</td>
                    <td>
                      <button onClick={() => handleBookAppointment(appointment._id, 'Confirmed')}>
                        Confirm
                      </button>
                      <button onClick={() => handleBookAppointment(appointment._id, 'Cancelled')}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>

          {/* Table for Confirmed Appointments */}
          <h3>Confirmed Appointments</h3>
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>Time Slot</th>
                <th>Patient Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                appointment.status === 'Confirmed' && (
                  <tr key={appointment._id}>
                    <td>{formatDate(appointment.date)}</td>
                    <td>{appointment.shift}</td>
                    <td>{`${appointment.timeSlotStart} - ${appointment.timeSlotEnd}`}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.status}</td>
                    <td>
                      <button onClick={() => handleBookAppointment(appointment._id, 'Completed')}>
                        Complete
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>

          {/* Table for Cancelled Appointments */}
          <h3>Cancelled Appointments</h3>
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>Time Slot</th>
                <th>Patient Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                appointment.status === 'Cancelled' && (
                  <tr key={appointment._id}>
                    <td>{formatDate(appointment.date)}</td>
                    <td>{appointment.shift}</td>
                    <td>{`${appointment.timeSlotStart} - ${appointment.timeSlotEnd}`}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.status}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>

          {/* Table for Completed Appointments */}
          <h3>Completed Appointments</h3>
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>Time Slot</th>
                <th>Patient Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                appointment.status === 'Completed' && (
                  <tr key={appointment._id}>
                    <td>{formatDate(appointment.date)}</td>
                    <td>{appointment.shift}</td>
                    <td>{`${appointment.timeSlotStart} - ${appointment.timeSlotEnd}`}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.status}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AppointmentDoctor;
