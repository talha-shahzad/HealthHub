import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Options from './components/auth/Options.js';
import Login from './components/auth/Login.js';
import ClientSignup from './components/auth/ClientSignup.js';
import DoctorSignup from './components/auth/DoctorSignup.js';
import AdminSignup from './components/auth/AdminSignup.js';
//profiles
import AdminProfile from './components/profiles/AdminProfile.js'
import ClientProfile from './components/profiles/ClientProfile.js'
import DoctorProfile from './components/profiles/DoctorProfile.js';

//client functionalities
import MedicalRecords from './components/profiles/Client/MedicalRecords.js';
import AddRecord from './components/profiles/Client/AddRecord.js';

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
          {/* Profiles */}
          <Route path="/AdminProfile" element={<AdminProfile />} />
          <Route path="/ClientProfile" element={<ClientProfile />} />
          <Route path="/DoctorProfile" element={<DoctorProfile />} />
          {/* Client functionalities */}
          <Route path="/profile/medical-records" element={<MedicalRecords />} />
          <Route path="/client/add-record" element={<AddRecord />} />
          <Route path="/client/add-record/ClientProfile" element={<ClientProfile />} />
        </Routes>
      </Router>
      {/*<App selectedOption={selectedOption} />*/}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);