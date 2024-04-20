import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DoctorProfile = () => {
  const location = useLocation();
  
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (location.state?.user) {
      setUserData(location.state.user);
    }
  }, [location.state]);

  useEffect(() => {
    console.log('Component re-rendered');
  });

  console.log('Received User Data:', userData);

  return (
    <div>
      <h1>Doctor Profile</h1>
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
    </div>
  );
};

export default DoctorProfile;
