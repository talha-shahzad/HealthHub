import React, { useState } from 'react';
import axios from 'axios';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Admin Signup Data:', formData);
    // Here you can add your API call or other logic to handle the signup process
    try {
      const response = await axios.post('http://localhost:3000/api/signup/admin', formData);
      console.log('Signup successful:', response.data);

      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        contactNumber: '',
        termsAndConditions: false,
      });

      // Redirect or show success message to the user
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Signup</h2>

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
          Role:
          <input
            type="text"
            name="role"
            value={formData.role}
            readOnly
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

      <div>
        <label>
          <input
            type="checkbox"
            name="termsAndConditions"
            checked={formData.termsAndConditions}
            onChange={handleChange}
            required
          />
          Agree to Terms and Conditions
        </label>
      </div>

      <button type="submit">Signup</button>
    </form>
  );
};

export default AdminSignup;