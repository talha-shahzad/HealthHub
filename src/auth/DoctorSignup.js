import React, { useState } from 'react';
import './Options.css';
const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    specialization: '',
    affiliation: '',
    contactNumber: '',
    termsAndConditions: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Doctor Signup Data:', formData);
    // Here you can add your API call or other logic to handle the signup process
  };

  return (
  <div className='container'>
    <form onSubmit={handleSubmit}>
      <h2>Doctor Signup</h2>

      <div>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Medical License Number:
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Specialization:
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Clinic/Hospital Affiliation (optional):
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button type="submit">Signup</button>
    </form>
    </div>
  );
};

export default DoctorSignup;
