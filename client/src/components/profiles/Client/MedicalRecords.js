// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MedicalRecords = ({ userId }) => {
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [newRecord, setNewRecord] = useState({
//     date: '',
//     doctorName: '',
//     diagnosis: '',
//     prescription: ''
//   });
//   const [isAdding, setIsAdding] = useState(false);

//   // Fetch medical records for the user
//   useEffect(() => {
//     const fetchMedicalRecords = async () => {
//       try {
//         const response = await axios.get(`/api/medical-records/${userId}`);
//         setMedicalRecords(response.data);
//       } catch (error) {
//         console.error('Error fetching medical records:', error);
//       }
//     };

//     fetchMedicalRecords();
//   }, [userId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewRecord({
//       ...newRecord,
//       [name]: value
//     });
//   };

//   const handleAddRecord = async () => {
//     try {
//       // Save new record to database
//       await axios.post('/api/medical-records', {
//         ...newRecord,
//         userId
//       });

//       // Refresh medical records list
//       const response = await axios.get(`/api/medical-records/${userId}`);
//       setMedicalRecords(response.data);

//       console.log('New record added successfully');

//       // Reset the form
//       setNewRecord({
//         date: '',
//         doctorName: '',
//         diagnosis: '',
//         prescription: ''
//       });
//       setIsAdding(false);
//     } catch (error) {
//       console.error('Error adding new record:', error);
//     }
//   };

//   return (
//     <section className="medical-records">
//       <h2>Medical Records</h2>
//       <ul>
//         {medicalRecords.map(record => (
//           <li key={record._id}>
//             <p>Date of visit: {record.date}</p>
//             <p>Doctor's name: {record.doctorName}</p>
//             <p>Diagnosis: {record.diagnosis}</p>
//             <p>Prescription: {record.prescription}</p>
//           </li>
//         ))}
//       </ul>
      
//       {isAdding ? (
//         <div>
//           <input
//             type="date"
//             name="date"
//             value={newRecord.date}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="text"
//             name="doctorName"
//             placeholder="Doctor's Name"
//             value={newRecord.doctorName}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="text"
//             name="diagnosis"
//             placeholder="Diagnosis"
//             value={newRecord.diagnosis}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="text"
//             name="prescription"
//             placeholder="Prescription"
//             value={newRecord.prescription}
//             onChange={handleInputChange}
//             required
//           />
//           <button onClick={handleAddRecord}>Save</button>
//           <button onClick={() => setIsAdding(false)}>Cancel</button>
//         </div>
//       ) : (
//         <button onClick={() => setIsAdding(true)}>Add New Record</button>
//       )}
//     </section>
//   );
// };

// export default MedicalRecords;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';

const MedicalRecords = ({ userId }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

   const navigate = useNavigate(); // Hook for navigation
  useEffect(() => {
    console.log("UserId passed to MedicalRecords:", userId); // Print userId to console
    const fetchMedicalRecords = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/medical-records/${userId}`);
          setMedicalRecords(response.data);
          console.log('Medical records fetched successfully.', response.data);
        } catch (error) {
          console.error('Error fetching medical records:', error);
        }
      };

    fetchMedicalRecords();
  }, [userId]);

  const handleSearch = () => {
    const filtered = medicalRecords.filter(record => 
      record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(record.date).toLocaleDateString().includes(searchTerm) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.prescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMedicalRecords(filtered);
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  const handleAddRecord = () => {
    navigate("/client/add-record", { 
      state: { 
        userId: userId,
        prevPath: "/ClientProfile",  // Store the previous path
      } 
    });
  };

  return (
    <div>
      <h1>Medical Records</h1>

      {/* Search Bar */}
      <div>
        <input 
          type="text" 
          placeholder="Search by doctor name, date, diagnosis, or prescription..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearchButtonClick}>Search</button>
      </div>

      {/* Record List */}
      <ul>
        {medicalRecords.map((record) => (
          <li key={record._id}>
            <h3>{record.doctorName}</h3>
            <p>Date: {new Date(record.date).toLocaleDateString()}</p>
            {/* Display other record details as needed */}
          </li>
        ))}
      </ul>

      {/* Add Record Button */}
      <button onClick={handleAddRecord}>Add New Record</button>
    </div>
  );
};

export default MedicalRecords;
