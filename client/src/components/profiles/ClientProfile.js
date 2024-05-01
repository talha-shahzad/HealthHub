import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Appointments from './Client/Appointments'; // Import Appointments component
import AppointmentView from './Client/AppointmentView'; // Import AppointmentView component
import MedicalRecords from './Client/MedicalRecords'; // Import MedicalRecords component
import './ClientProfile.css'; // Import CSS file for styling

const ClientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  
  const [userData, setUserData] = useState({});
  const [activeSection, setActiveSection] = useState('profile'); // 'profile' or 'medical-records'

  useEffect(() => {
    if (location.state?.user) {
      setUserData(location.state.user);
    }
  }, [location.state]);

  const navigateToSection = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'appointments':
        return <Appointments userId={userData.user._id} />;
        case 'view-appointments':
          return <AppointmentView userId={userData.user._id} />;
      case 'medical-records':
        return <MedicalRecords medicalRecords={userData.medicalRecords} userId={userData.user._id} />;
      default:
        return (
          <>
            <h1>ClientProfile</h1>
            {userData.user ? (
              <>
                <p>Name: {userData.user.fullName}</p>
                <p>Email: {userData.user.email}</p>
                <p>Contact Number: {userData.user.contactNumber}</p>
                {/* Add other fields here */}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </>
        );
    }
  };
  

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="user-details">
          <h2>User Profile</h2>
          <p>Name: {userData.user ? userData.user.fullName : 'Loading...'}</p>
          <p>Email: {userData.user ? userData.user.email : 'Loading...'}</p>
          <p>Contact Number: {userData.user ? userData.user.contactNumber : 'Loading...'}</p>
        </div>
        <div className="actions">
          <button onClick={() => navigateToSection('profile')} className={activeSection === 'profile' ? 'active' : ''}>Client Profile</button>
          <button onClick={() => navigateToSection('appointments')} className={activeSection === 'appointments' ? 'active' : ''}>Appointments</button>
          <button onClick={() => navigateToSection('view-appointments')} className={activeSection === 'view-appointments' ? 'active' : ''}>View Appointments</button>
          <button onClick={() => navigateToSection('medical-records')} className={activeSection === 'medical-records' ? 'active' : ''}>Medical Records</button>
          {/* Add more buttons for other sections if needed */}
        </div>
      </header>

      {/* Main content */}
      <div className="main-content">
        {renderContent()} {/* Render active section content */}
      </div>
    </div>
  );
};

export default ClientProfile;
