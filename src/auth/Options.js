import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import  './Options.css';

const Options = ({ onOptionChange }) => {

  const [option, setOption] = useState('');

  const handleOption = (e) => {
    let selection=document.querySelector('.selection')
    const selectedOption = selection.options[selection.selectedIndex].value;
    setOption(selectedOption);
    onOptionChange(selectedOption);

  };

  return (
    <div className='container'>
      <h1>Select Role</h1>
      <select className='selection' defaultValue="Client">
  <option value="Doctor" className='options'>Doctor</option>
  <option value="Client"  className='options'>Client</option>
  <option value="Admin"  className='options'>Admin</option>
</select>

<div className="button-container">
      <button onClick={handleOption}>
        <Link className="button-link" to="/login">Login Page</Link>
        </button>
      </div>
    </div>
  );
};

export default Options;
