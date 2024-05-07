import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Container, Paper, TextField, IconButton, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ErrorOutline as ErrorIcon, Event as EventIcon, AccessTime as AccessTimeIcon, Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      backgroundColor: '#f5f5f5', // Adjust background color on hover
    },
    backgroundColor: '#ffffff', // Set default background color
    color: '#333333', // Set default text color
    border: '2px solid #eeeeee', // Set default border color
  },
  appointment: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));

const AppointmentView = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/appointments/user/${userId}`);
      setAppointments(response.data);
      setFilteredAppointments(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterAppointments();
  }, [searchTerm, statusFilter]);

  const filterAppointments = () => {
    let filtered = appointments.filter(appointment => {
      const doctorNameMatch = appointment.doctor_id.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const dateMatch = new Date(appointment.date).toDateString().toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = appointment.status.toLowerCase().includes(statusFilter.toLowerCase()) || statusFilter === '';

      if (searchTerm === '' && statusFilter === '') {
        return true;
      }
      
      if (searchTerm === '') {
        return statusMatch;
      }
  
      if (statusFilter === '') {
        return doctorNameMatch || dateMatch;
      }
  
      return (doctorNameMatch || dateMatch) && statusMatch;
    });
  
    setFilteredAppointments(filtered);
  };

  const handleSearch = () => {
    filterAppointments();
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setFilteredAppointments(appointments);
  };

  if (loading) {
    return (
      <Container maxWidth="md" className={classes.container}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h6" color="error">
          <ErrorIcon className={classes.icon} /> Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2} className={classes.header}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search by doctor name or date"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <IconButton onClick={resetFilters}>
            <FilterListIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom>
        <EventIcon className={classes.icon} /> Appointments
      </Typography>
      {filteredAppointments.map(appointment => (
        <Paper key={appointment._id} elevation={3} className={classes.paper}>
      <div className={classes.appointment}>
        <Typography variant="subtitle1">
          <strong>Appointment Status:</strong> {appointment.status}
        </Typography>
        <Typography variant="subtitle1">
          <AccessTimeIcon className={classes.icon} />
          <strong>Doctor:</strong> {appointment.doctor_id.fullName}
        </Typography>
        <Typography variant="subtitle1">
          <EventIcon className={classes.icon} />
          <strong>Date:</strong> {new Date(appointment.date).toDateString()}
        </Typography>
        <Typography variant="subtitle1">
          <AccessTimeIcon className={classes.icon} />
          <strong>Start Time:</strong> {appointment.timeSlot_id.startTime}
        </Typography>
        <Typography variant="subtitle1">
          <AccessTimeIcon className={classes.icon} />
          <strong>End Time:</strong> {appointment.timeSlot_id.endTime}
        </Typography>
      </div>
    </Paper>
      ))}
    </Container>
  );
};

export default AppointmentView;
