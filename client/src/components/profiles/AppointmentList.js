import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider, Typography, Paper, Grid, Box } from '@mui/material';
import { Event, Person, Schedule, Done, AccessTime, Alarm } from '@mui/icons-material'; // Added Alarm icon

const AppointmentList = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/appointments/doctor/${doctorId}`);
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Error fetching appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={3}>
      {appointments.map((appointment, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '10px', transition: 'transform 0.3s', position: 'relative' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold', position: 'absolute', top: 0, left: '-20px', transform: 'rotate(-45deg)', backgroundColor: '#007bff', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>New</Typography>
            <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>Appointment {index + 1}</Typography>
            <List disablePadding>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <Event sx={{ mr: 1, color: '#007bff', fontSize: '1.2rem' }} />
                <ListItemText primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }} primary="Date" secondary={appointment.date} />
              </ListItem>
              <Divider />
              <ListItem disablePadding sx={{ mb: 1 }}>
                <Person sx={{ mr: 1, color: '#007bff', fontSize: '1.2rem' }} />
                <ListItemText primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }} primary="Patient Name" secondary={appointment.patientName} />
              </ListItem>
              <Divider />
              <ListItem disablePadding sx={{ mb: 1 }}>
                <Schedule sx={{ mr: 1, color: '#007bff', fontSize: '1.2rem' }} />
                <ListItemText primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }} primary="Shift" secondary={appointment.shift} />
              </ListItem>
              <Divider />
              <ListItem disablePadding sx={{ mb: 1 }}>
                <Done sx={{ mr: 1, color: appointment.status === 'Confirmed' ? '#28a745' : '#dc3545', fontSize: '1.2rem' }} />
                <ListItemText primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }} primary="Status" secondary={appointment.status} />
              </ListItem>
              <Divider />
              <ListItem disablePadding sx={{ mb: 1 }}>
                <AccessTime sx={{ mr: 1, color: '#007bff', fontSize: '1.2rem' }} />
                <ListItemText primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }} primary="Time Slot Start" secondary={appointment.timeSlotStart} />
              </ListItem>
              <Divider />
              <ListItem disablePadding sx={{ mb: 1 }}>
                <AccessTime sx={{ mr: 1, color: '#007bff', fontSize: '1.2rem' }} />
                <ListItemText primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }} primary="Time Slot End" secondary={appointment.timeSlotEnd} />
              </ListItem>
              {/* Added a new list item */}
              <Divider />
              <ListItem disablePadding sx={{ mb: 1 }}>
                <Alarm sx={{ mr: 1, color: '#007bff', fontSize: '1.2rem' }} />
                <ListItemText primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }} primary="Reminder" secondary={appointment.reminder} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppointmentList;
