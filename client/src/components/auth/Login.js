import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = ({ selectedOption }) => { 

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("response.data");

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
        <div>
            <h1>Login</h1>
            <p>Selected Option from Options component: {selectedOption}</p>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                        required 
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
                <button type="button" onClick={handleSignup}>SignUp</button>
            </form>
        </div>
    );
};

export default Login;
