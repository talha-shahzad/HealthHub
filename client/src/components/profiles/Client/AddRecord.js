import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;
  const prevPath = location.state?.prevPath;

  const [newRecord, setNewRecord] = useState({
    date: '',
    doctorName: '',
    diagnosis: '',
    prescription: ''
  });

  const [userData, setUserData] = useState(null); // State to hold userData

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({
      ...newRecord,
      [name]: value
    });
  };

  const handleAddRecord = async () => {
    try {
      // Save new record to database
      await axios.post('http://localhost:3000/api/medical-records', {
        ...newRecord,
        userId
      });

      console.log('New record added successfully',userData);

      // Navigate back to medical records page
      navigate('/ClientProfile', { state: { user: userData } });
    } catch (error) {
      console.error('Error adding new record:', error);
    }
  };

  const handleBack = () => {
    navigate(prevPath);
  };

  return (
    <div>
      <h1>Add New Medical Record</h1>

      {/* Display user details if available */}
      {userData && (
        <div>
          <h2>User Details</h2>
          <p>Name: {userData.fullName}</p>
          <p>Email: {userData.email}</p>
          {/* Add other user details as needed */}
        </div>
      )}

      <div>
        <input
          type="date"
          name="date"
          value={newRecord.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor's Name"
          value={newRecord.doctorName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={newRecord.diagnosis}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="prescription"
          placeholder="Prescription"
          value={newRecord.prescription}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleAddRecord}>Save</button>
        <button onClick={handleBack}>Cancel</button>
      </div>
    </div>
  );
};

export default AddRecord;
