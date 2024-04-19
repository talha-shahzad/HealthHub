import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Options from './auth/Options.js';
import Login from './auth/Login.js';
import ClientSignup from './auth/ClientSignup.js';
import DoctorSignup from './auth/DoctorSignup.js';
import AdminSignup from './auth/AdminSignup.js';

function Root() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSignup, setSelectedSignup] = useState('');
  
  const handleOptionChange = (option) => {
    setSelectedOption(option);

  };
  const handleSignup = (option) => {
    setSelectedSignup(option);

  };
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Options onOptionChange={handleOptionChange} />} />
          <Route path="/login" element={<Login onSignupChange={handleSignup} selectedOption={selectedOption} />} />
          <Route path="/DoctorSignup" element={<DoctorSignup />} />
          <Route path="/ClientSignup" element={<ClientSignup />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />
        </Routes>
      </Router>
      <App selectedOption={selectedOption} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
