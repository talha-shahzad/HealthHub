import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Options.css';

const Login = ({ selectedOption }) => {
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
    };

      const handleSignup = () => {
        let optval = "/" + selectedOption + "Signup";
        console.log(optval);
        navigate(optval,{replace:true});
      };
    return (
        <div className='container'>
            <h1>Login</h1>
             <p>Selected Option from Options component: {selectedOption}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                       
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                       
                    />
                </div>
                <button type="submit">Login</button>
                <button onClick={handleSignup}>SignUp</button>
               
            </form>
        </div>
        
    );
};

export default Login;