import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    root: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#001f3f', // Navy blue background color
    },
    card: {
      backgroundColor: '#f5f5f5', // Light background color
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
  });
  

const Login = ({ selectedOption }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);

            // Handle successful login and get user data
            const userData = response.data;
            console.log('User Data:', userData);

            let optval = "/" + selectedOption + "Profile";
            console.log(optval);
            // Navigate to the next page with user data
            navigate(optval, { state: { user: userData } });

        } catch (error) {
            // Handle error
            console.error('Login error occurred:', error);
            // Optionally, show an alert or error message
            alert('Login failed. Please check your credentials.');
        }
    };

    const handleSignup = () => {
        let optval = "/" + selectedOption + "Signup";
        console.log(optval);
        navigate(optval, { replace: true });
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                <Typography variant="h1" style={{ color: '#1976d2', marginBottom: '20px',fontSize:'35px' }}>Login</Typography>
                    <p>Selected Option from Options component: {selectedOption}</p>
                    <form>
                        <div>
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <Button variant="contained" onClick={handleLogin} style={{marginTop:'11px'}}>Login</Button>
                        <Button variant="outlined" onClick={handleSignup} style={{marginTop:'11px'}}>Sign Up</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
