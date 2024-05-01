import React from 'react';

const DoctorList = ({ doctors, handleBookAppointment }) => {
  return (
    <div className="doctor-list">
      <h2>Doctors</h2>
      {doctors.map((doctor, index) => (
        <div key={index} className="doctor-card">
          <h3>{doctor.user.fullName}</h3>
          <p>Contact Number: {doctor.user.contactNumber || 'N/A'}</p>
          <p>Specialization: {doctor.specializationName || 'N/A'}</p>
          <p>Medical License Number: {doctor.medicalLicenseNumber}</p>
          <p>Clinic or Hospital: {doctor.clinicOrHospital || 'N/A'}</p>
          <button onClick={() => handleBookAppointment(doctor)}>Book Appointment</button>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
