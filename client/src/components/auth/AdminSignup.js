import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import { useNavigate } from 'react-router-dom';


import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001f3f', // Navy blue background color
    paddingLeft: '10px', // Add padding left for better readability
    paddingRight: '10px', // Add padding right for better readability
  },
  card: {
    backgroundColor: '#f5f5f5', // Light background color
    marginTop: '35px', // Add margin top for spacing
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', // Box shadow for modern look
    borderRadius: '10px', // Rounded corners for modern look
    maxWidth: '400px', // Limit width for better readability on large screens
    padding: '20px', // Add padding for better spacing
    textAlign: 'center', // Center text content
    transition: 'transform 0.3s ease-in-out', // Smooth transition for hover effect
    '&:hover': {
      transform: 'scale(1.05)', // Scale up the card on hover
    },
  },
  title: {
    color: '#1976d2', // Material-UI primary color
    fontSize:'35px',
    marginBottom: '20px', // Add margin bottom for spacing
  },
  input: {
    marginBottom: '15px', // Add margin bottom for input fields
  },
  button: {
    marginTop: '15px', // Add margin top for button
  },
});

const AdminSignup = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
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
    console.log('Admin Signup Data:', formData);
    // Here you can add your API call or other logic to handle the signup process
    try {
      const response = await axios.post('http://localhost:3000/api/signup/admin', formData);
      console.log('Signup successful:', response.data)
      // Input validation conditions
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Admin',
        contactNumber: '',
        termsAndConditions: false,
      });
      // Redirect or show success message to the user
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h1" className={classes.title}>Admin Signup</Typography>

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
            type="text"
            name="role"
            label="Role"
            value={formData.role}
            readOnly
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

          <Button type="submit" variant="contained" className={classes.button} onClick={handleSubmit} component={Link} to="/" >Signup</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSignup;
