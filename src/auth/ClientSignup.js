import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Options.css';
const ClientSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    medicalHistory: '',
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
    console.log('Client Signup Data:', formData);
    // Here you can add your API call or other logic to handle the signup process
  };

  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>
      <h2>Client Signup</h2>

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
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Gender:
          <select className='selection' name="gender" value={formData.gender} onChange={handleChange} required>
            <option className='options'value="">Select Gender</option>
            <option className='options' value="Male">Male</option>
            <option className='options'value="Female">Female</option>
            <option className='options'value="Other">Other</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Medical History (optional):
          <div>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
          ></textarea>
          </div>
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
      <button>
        <Link className="button-link" to="/">Login Page</Link>
        </button>
    </form>
   
    </div>
  );
};

export default ClientSignup;
