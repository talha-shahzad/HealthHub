import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Options = ({ onOptionChange }) => {

  const [option, setOption] = useState('');

  const handleOption = (e) => {
    let selection=document.querySelector('.selection')
    const selectedOption = selection.options[selection.selectedIndex].value;
    setOption(selectedOption);
    onOptionChange(selectedOption);

  };

  return (
    <div>
      <h1>Options</h1>
      <select className='selection' defaultValue="Client">
  <option value="Doctor">Doctor</option>
  <option value="Client">Client</option>
  <option value="Admin">Admin</option>
</select>

      <div>
      <button onClick={handleOption}>
        <Link to="/login">Login Page</Link>
        </button>
      </div>
    </div>
  );
};

export default Options;
