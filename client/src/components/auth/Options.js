// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import './OptionsWrapper.css';
// const Options = ({ onOptionChange }) => {

//   const [option, setOption] = useState('');

//   const handleOption = (e) => {
//     let selection=document.querySelector('.selection')
//     const selectedOption = selection.options[selection.selectedIndex].value;
//     setOption(selectedOption);
//     onOptionChange(selectedOption);

//   };

//   return (
//     <div>
//        <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             Health Hub
//           </Typography>
//           <select className='selection' defaultValue="Client" onChange={handleOption}>
//             <option value="Doctor">Doctor</option>
//             <option value="Client">Client</option>
//             <option value="Admin">Admin</option>
//           </select>
//           <Grid item xs={12} textAlign="center">
//             <Button variant="contained" onClick={handleOption}>
//               <Link to={`/login`} style={{ textDecoration: 'none', color: 'inherit' }}>Get Started</Link>
//             </Button>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//       <Container>
//         <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
//         <div>
//       <div class="container">
//       <header class="header">
//         <div class="content">
//           <h1><span>Get Quick</span><br />Medical Services</h1>
//           <p>
//             In today's fast-paced world, access to prompt and efficient medical
//             services is of paramount importance. When faced with a medical
//             emergency or seeking immediate medical attention, the ability to
//             receive quick medical services can significantly impact the outcome
//             of a situation.
//           </p>
//           <button class="btn">Get Services</button>
//         </div>
//         <div class="image">
//           <span class="image__bg"></span>
//           <img src="assets/header-bg.png" alt="header image" />
//           <div class="image__content image__content__1">
//             <span><i class="ri-user-3-line"></i></span>
//             <div class="details">
//               <h4>1520+</h4>
//               <p>Active Clients</p>
//             </div>
//           </div>
//           <div class="image__content image__content__2">
//             <ul>
//               <li>
//                 <span><i class="ri-check-line"></i></span>
//                 Get 20% off on every 1st month
//               </li>
//               <li>
//                 <span><i class="ri-check-line"></i></span>
//                 Expert Doctors
//               </li>
//             </ul>
//           </div>
//         </div>
//       </header>
//     </div>
//       </div>
//         </Grid>
//       </Container>
//       <footer style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#333', color: '#fff', padding: '10px 0', textAlign: 'center' }}>
//         © {new Date().getFullYear()} Health Hub. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Options;


import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { withStyles } from '@mui/styles';


import Subtitle from './SubTitle';
import SpecialtyDoctorsSlideshow from './SpecialtyDoctorsSlideshow';

import './OptionsWrapper.css'; // Import CSS for animations
const CustomButton = withStyles({
  root: {
    border: 'none',
    padding: '10px 20px',
    display: 'inline-block',
    fontSize: '20px',
    fontWeight: '600',
    width: '170px',
    height: '50px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transform: 'skew(-21deg)',
    position: 'relative',
    color: '#fff',
    '&:hover': {
      color: '#000',
      background: '#2752af !important', // Change background color to black on hover
    },
    '&:hover::before': {
      width: '0',
    },
    '&:hover::after': {
      width: '0',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '100%',
      /*very light blue color background*/
      background: '#03265a',

      transition: 'all 0.5s',
      zIndex: '-1',
      left: '0',
      transform: 'skewX(-21deg)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '100%',
      background: '#03265a',
      transition: 'all 0.5s',
      zIndex: '-1',
      right: '0',
      transform: 'skewX(21deg)',
    },
  },
})(Button);





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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Health Hub
          </Typography>
          <select className='selection'>
            <option value="Doctor">Doctor</option>
            <option value="Client">Client</option>
            <option value="Admin">Admin</option>
          </select>
        </Toolbar>
      </AppBar>
      <Container style={{ minHeight: '100vh', paddingTop: '20px', paddingBottom: '20px', marginLeft: '-10px', marginRight: 'auto',fontWeight: 'bold' }}>
        <Grid container>
          <div className="slide-container">
            <div className="text-slide">
              <Typography variant="h2" className="title" style={{ marginTop: '100px'}}>
                Your Health Solutions<br/>
                Are Here
              </Typography>
              <Subtitle />
    <CustomButton onClick={handleOption} component={Link} to="/login" 
  style={{ color: '#fff',fontSize:'20px', }} >
      Get Started
    </CustomButton>
            </div>
            <div className="image-slide" style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clini_1258-88108.jpg?t=st=1714897492~exp=1714901092~hmac=5cc2bedb684a968f2d2190ee647ea75e81137ad980a2127c62b8a6e68dd20516&w=740")' }}></div>
          </div>
        </Grid>
        <Grid>
          <SpecialtyDoctorsSlideshow/>
        </Grid>
      </Container>
{/*       
<footer style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#333', color: '#fff', padding: '10px 0', textAlign: 'center', zIndex: 100 }}>
  © {new Date().getFullYear()} Health Hub. All rights reserved.
</footer> */}

    </div>
  );
};

export default Options;
