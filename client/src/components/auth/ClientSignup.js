import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Link, Navigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001f3f',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  card: {
    paddingLeft:'35px',
    paddingRight:'35px',
    backgroundColor: '#f5f5f5',
    marginTop: '35px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    maxWidth: '400px',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  title: {
    fontSize: '35px',
    color: '#1976d2',
    marginBottom: '20px',
  },
  input: {
    marginBottom: '15px',
  },
  button: {
    marginTop: '15px',
  },
});

const ClientSignup = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    medicalHistory: '',
    contactNumber: '',
    termsAndConditions: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Client Signup Data:', formData);
  
    // Password matching validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Date of birth validation (5 years past date)
    const selectedDate = new Date(formData.dateOfBirth);
    const currentDate = new Date();
    const fiveYearsAgo = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate());
  
    if (selectedDate > fiveYearsAgo) {
      alert('Please select a date of birth at least 5 years ago!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/signup/client', formData);
      console.log('Signup successful:', response.data);
  
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        medicalHistory: '',
        contactNumber: '',
        termsAndConditions: false,
      });

      navigate('/login');
  
      // Redirect or show success message to the user
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h1" className={classes.title}>Client Signup</Typography>

          <TextField
            type="text"
            name="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={classes.input}
          />

          <TextField
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={classes.input}
          />

          <TextField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={classes.input}
          />

          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={classes.input}
          />

          <TextField
            type="date"
            name="dateOfBirth"
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className={classes.input}
          />

          <Select
            name="gender"
            label="Gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className={classes.input}
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>

          <TextField
            multiline
            rows={4}
            name="medicalHistory"
            label="Medical History (optional)"
            value={formData.medicalHistory}
            onChange={handleChange}
            className={classes.input}
          />

          <TextField
            type="text"
            name="contactNumber"
            label="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className={classes.input}
          />

          <div>
            <label>
              <input
                type="checkbox"
                name="termsAndConditions"
                checked={formData.termsAndConditions}
                onChange={handleChange}
                required
              />
              Agree to Terms and Conditions
            </label>
          </div>

          <Button
            type="submit"
            variant="contained"
            className={classes.button}
            onClick={handleSubmit}
            component={Link}
            to="/login"
          >
            Signup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSignup;
