import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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