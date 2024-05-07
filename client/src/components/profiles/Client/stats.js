import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stats.css';
import TestResult from './TestResult';
import { TextField, Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';


const Stats = ({ userId }) => {
  const [bloodtype, setBloodType] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [lungHealth, setLungHealth] = useState(0);
  const [boolval, setbool] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [showBasicForm, setShowBasicForm] = useState(false);
  const [showBasicInfo, setShowBasicInfo] = useState(false);

  const checkLungs = () => {
    setClickCount(prevClickCount => prevClickCount + 1);
    if (clickCount === 0) {
      showCircle();
      setStartTime(Date.now()); 
    } else if (clickCount === 1) {
      clearInterval(timerInterval);
      calculateHealth();
      // Reset all states to their initial values
      setTimer(0);
      setClickCount(0);
    } 
  };
  
  

  const showCircle = () => {
    const rectangle = document.querySelector('.rectangle1');
    rectangle.innerHTML = "<div class='inner-circle'></div>";
    console.log("show",clickCount)
  };

  const removeCircle = () => {
    const rectangle = document.querySelector('.rectangle1');
    rectangle.innerHTML = `<div><h2>Lung Health</h2><p>${lungHealth}%</p></div>`;
    console.log("remove",clickCount)
  };


  
  const calculateHealth = () => {
    
    const endTime = Date.now(); // Record the end time
    const timeDifference = endTime - startTime; // Calculate the time difference in milliseconds
   
    const breathHoldingTime = Math.round(timeDifference / 100); 
const health = Math.max(0, 100 - breathHoldingTime); // Assuming longer holding time is healthier
    console.log('Breath Holding Time:', breathHoldingTime,timeDifference);

    setLungHealth(health);
    removeCircle();
    console.log('Lung Health:', health,lungHealth);
    
    const rectangle = document.querySelector('.rectangle1');
    rectangle.classList.remove('green', 'orange', 'red');
  
    if (lungHealth >= 80) {
      rectangle.classList.add('green');
    } else if (lungHealth >= 50 && lungHealth < 80) {
      rectangle.classList.add('orange');
    } else {
      rectangle.classList.add('red');
    }
  };

  const fetchBasicInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${userId}/check_basic_info`);
      const basicInfoData = response.data;
      console.log('Basic Info Data:', basicInfoData);
      // Assuming basic info is an object
      if (basicInfoData) {
        console.log('Age:', basicInfoData.age);
        console.log('Height:', basicInfoData.height);
        console.log('Weight:', basicInfoData.weight);
        // Assuming you have state variables to set age, height, and weight
        setAge(basicInfoData.age);
        setHeight(basicInfoData.height);
        setWeight(basicInfoData.weight);
        setShowBasicInfo(true);
      }
    } catch (error) {
      console.error('Error fetching basic info:', error);
      // Handle error
    }
  };
  const fetchBloodType = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${userId}/check_Bloodtype`);
      const bloodTypeData = response.data;
      console.log('Blood Type Data:', bloodTypeData);
      if (bloodTypeData.length > 0) {
        const firstBloodType = bloodTypeData[0];
        console.log('Blood Type:', firstBloodType.bloodtype);
        setBloodType(firstBloodType.bloodtype);
      }
    } catch (error) {
      console.error('Error fetching blood type:', error);
      // Handle error
    }
  };
  

  useEffect(() => {
    
    fetchBloodType();
    fetchBasicInfo();

  }, [userId]);

  const handleBloodTypeUpdate = async (event) => {
    const selectedBloodType = event.target.value;
    setBloodType(selectedBloodType);
    console.log('Selected blood type:', userId, selectedBloodType);
    try {
      const response = await axios.post(`http://localhost:3000/api/${userId}/post_Bloodtype`, {
        userId: userId,
        bloodType: selectedBloodType
      });

      console.log('Blood type updated successfully:', response.data);

    } catch (error) {
      console.error('Error from stats updating blood type:', error);
      // Handle error
    }
  };

  const handleBasicInfoUpdates = async () => {
    
    try {
      const response = await axios.post(`http://localhost:3000/api/${userId}/post_basic_info`, {
        userId: userId,
        age: age,
        height: height,
        weight: weight
      });

      console.log('Basic Info Updated successfully:', response.data);

    } catch (error) {
      console.error('Error from stats updating Basic Info:', error);
      // Handle error
    }
  };

  const handleBasicInfoClick = () => {

    if(showBasicInfo==true)
      {
        let BMI=weight/(height*height);
        let basic=document.getElementById('basic-info');
    basic.innerHTML=`<p><strong>Age</strong>: <em>${age} years</em></p>
    <p><strong>Height</strong>: <em>${height} metres</em></p>
    <p><strong>Weight</strong>:<em> ${weight} KGs</em></p>
    <p><strong>BMI</strong>:<em> ${BMI}</em></p>`;
      }
      else{
    setShowBasicForm(true);
      }
  };
const handleinfo = async () => {

};

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    let BMI=weight/(height*height);
    console.log(age, height, weight)
    let form=document.getElementById('basicform');
    form.style.display='none';
    let basic=document.getElementById('basic');
    basic.innerHTML=`<p><strong>Age</strong>: <em>${age} years</em></p>
    <p><strong>Height</strong>: <em>${height} metres</em></p>
    <p><strong>Weight</strong>:<em> ${weight} KGs</em></p>
    <p><strong>BMI</strong>:<em> ${BMI}</em></p>`;
    handleBasicInfoUpdates();
  }
};
  return (
    <div>
    <div className='holder'>
      {bloodtype ? (
        <div>
          <div className="blood circle d-flex align-items-center justify-content-center text-white animation-enabled">
            <p className='inner-p'>{bloodtype}</p>
          </div>
          <h2 style={{ color: 'black' }}> Blood Type </h2>
        </div>
      ) : (
        <div>
        <Select
  value={bloodtype}
  onChange={handleBloodTypeUpdate}
  displayEmpty
  sx={{ bgcolor: '#007bff', color: 'white'}}
>
  <MenuItem value="" disabled>
    Select Blood Type
  </MenuItem>
  <MenuItem value='A+'>A+</MenuItem>
  <MenuItem value='A-'>A-</MenuItem>
  <MenuItem value='B+'>B+</MenuItem>
  <MenuItem value='B-'>B-</MenuItem>
  <MenuItem value='AB+'>AB+</MenuItem>
  <MenuItem value='AB-'>AB-</MenuItem>
  <MenuItem value='O+'>O+</MenuItem>
  <MenuItem value='O-'>O-</MenuItem>
</Select>
    <div>
      <div className="blood circle d-flex align-items-center justify-content-center text-white">
        <p className='inner-p'>{bloodtype}</p>
      </div>
    </div>
  </div>

      )}

      <div className="rectangle1" onClick={checkLungs}>
        <div>
          {boolval ? (
            <div>
              <h2 style={{ color: 'black' }}>Lung Health</h2>
              <p className='health'>{lungHealth}%</p>
            </div>
          ) : (
            <div>
              <h2 style={{ color: 'black' }}>Lung Health</h2>
              <p className='health'>Click to check.<br></br>
              <strong>Click again Until you can Hold your breath</strong>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="rectangle2" onClick={handleBasicInfoClick}>
      {showBasicForm ? (
        <div id='basic'>
        <form id='basicform' onKeyPress={handleKeyPress}>
              <input
                type="number"
                placeholder="Age (Years)"
                value={age}
                required
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="number"
                placeholder="Height (Metres)"
                value={height}
                required
                onChange={(e) => setHeight(e.target.value)}
              />
              <input
                type="number"
                placeholder="Weight (KGs)"
                value={weight}
                required
                onChange={(e) => setWeight(e.target.value)}
              />

            </form>
        </div>
          ) : (
            <div id='basic-info'>
            <h1 style={{ textAlign: 'center' }}><em>Basic Info</em></h1>
            </div>
          )}
          </div>
    </div>
<TestResult userId={userId} />
    </div>
  );
};

export default Stats;
