import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
      <Typography variant="h2" gutterBottom style={{ fontFamily: 'Arial', color: 'blue' }}>Appointment Requests</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4" style={{ fontFamily: 'Arial', color: 'green' }}>Pending Appointments</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Time Slot</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(appointment => (
                  appointment.status === 'Pending' && (
                    <TableRow key={appointment._id}>
                      <TableCell>{formatDate(appointment.date)}</TableCell>
                      <TableCell>{appointment.shift}</TableCell>
                      <TableCell>{`${appointment.timeSlotStart} - ${appointment.timeSlotEnd}`}</TableCell>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleBookAppointment(appointment._id, 'Confirmed')} variant="contained" color="primary" startIcon={<CheckCircleIcon />}>Confirm</Button>
                        <Button onClick={() => handleBookAppointment(appointment._id, 'Cancelled')} variant="contained" color="error" startIcon={<CancelIcon />}>Cancel</Button>
                      </TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h4" style={{ fontFamily: 'Arial', color: 'green' }}>Confirmed Appointments</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Time Slot</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(appointment => (
                  appointment.status === 'Confirmed' && (
                    <TableRow key={appointment._id}>
                      <TableCell>{formatDate(appointment.date)}</TableCell>
                      <TableCell>{appointment.shift}</TableCell>
                      <TableCell>{`${appointment.timeSlotStart} - ${appointment.timeSlotEnd}`}</TableCell>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleBookAppointment(appointment._id, 'Completed')} variant="contained" color="primary" startIcon={<DoneAllIcon />}>Complete</Button>
                      </TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h4" style={{ fontFamily: 'Arial', color: 'green' }}>Cancelled Appointments</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Time Slot</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(appointment => (
                  appointment.status === 'Cancelled' && (
                    <TableRow key={appointment._id}>
                      <TableCell>{formatDate(appointment.date)}</TableCell>
                      <TableCell>{appointment.shift}</TableCell>
                      <TableCell>{`${appointment.timeSlotStart} - ${appointment.timeSlotEnd}`}</TableCell>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h4" style={{ fontFamily: 'Arial', color: 'green' }}>Completed Appointments</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Time Slot</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(appointment => (
                  appointment.status === 'Completed' && (
                    <TableRow key={appointment._id}>
                      <TableCell>{formatDate(appointment.date)}</TableCell>
                      <TableCell>{appointment.shift}</TableCell>
                      <TableCell>{`${appointment.timeSlotStart} - ${appointment.timeSlotEnd}`}</TableCell>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default AppointmentDoctor;
