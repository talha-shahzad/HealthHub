import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppointmentDoctor from './Doctor/Appointments';
import ManageSchedule from './Doctor/ManageSchedule';
import AppointmentStats from './AppointmentStats';
import AppointmentList from './AppointmentList';
import axios from 'axios';
import { 
  Typography, 
  Box, 
  Button, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();
const drawerWidth = 240;

const DoctorProfile = () => {
  const [appointmentsData, setAppointmentsData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const [drawerOpen, setDrawerOpen] = useState(false);

  
  useEffect(() => {
    if (location.state?.user) {
      setUserData(location.state.user);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/appointments/doctor/${userData.user._id}`);
        const appointments = response.data;
        let pendingCount = 0;
        let confirmedCount = 0;
        let cancelledCount = 0;
        let completedCount = 0;
        
        appointments.forEach(appointment => {
          switch (appointment.status) {
            case 'Pending':
              pendingCount++;
              break;
            case 'Confirmed':
              confirmedCount++;
              break;
            case 'Cancelled':
              cancelledCount++;
              break;
            case 'Completed':
              completedCount++;
              break;
            default:
              break;
          }
        });
        
        setAppointmentsData({
          pending: { count: pendingCount, isLoading: false, error: null },
          confirmed: { count: confirmedCount, isLoading: false, error: null },
          cancelled: { count: cancelledCount, isLoading: false, error: null },
          completed: { count: completedCount, isLoading: false, error: null }
        });
        
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    
    if (userData && userData.user) {
      fetchAppointments();
    }
  }, [userData]);

  const navigateToSection = (section) => {
    setActiveSection(section);
    setDrawerOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'appointments':
        return <AppointmentDoctor userId={userData.user._id} />;
      case 'manage-schedule':
        return <ManageSchedule userId={userData.user._id} />;
      default:
        return (
          <Box sx={{ mt: 4, mb: 2 }}> {/* Adjust the top (mt) and bottom (mb) margins as needed */}
  <Typography variant="h4">Doctor Profile</Typography>
  {userData.user ? (
    <>
      {appointmentsData && (
        <AppointmentStats appointmentsData={appointmentsData} />
      )}
      <AppointmentList doctorId={userData.user._id}/>
    </>
  ) : (
    <p>Loading...</p>
  )}
</Box>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {userData.user ? `${userData.user.fullName} ${userData.user.email}` : 'Profile'}
              {userData.user && userData.specialization && ` - ${userData.specialization}`  }
              {userData.user && userData.clinicOrHospital && ` - ${userData.clinicOrHospital}`}
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
  anchor="left"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      background: '#f0f2f5',
      transition: 'background-color 0.3s ease', // Add transition for background color change
    },
    '& .MuiListItem-root': {
      marginTop: '8px',
      marginBottom: '8px',
      background: '#fff', // Set initial background color for list items
      transition: 'background-color 0.3s ease', // Add transition for background color change
    },
    '& .MuiListItem-root:hover': {
      background: '#d7dae0', // Change background color on hover
    },
    '& .MuiListItemText-primary': {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#333', // Set initial text color
      transition: 'color 0.3s ease', // Add transition for text color change
    },
    '& .MuiListItem-root:hover .MuiListItemText-primary': {
      color: '#000', // Change text color on hover
    },
    '@keyframes fadeIn': { // Define fadeIn animation keyframes
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    animation: 'fadeIn 0.5s ease-out', // Apply fadeIn animation to the drawer paper
  }}
>
  <List>
    {['Profile', 'Appointments', 'Manage Schedule'].map((text, index) => (
      <ListItem 
        button 
        key={text} 
        onClick={() => navigateToSection(text.toLowerCase().replace(' ', '-'))}
        sx={{ background: index % 2 === 0 ? '#f0f2f5' : '#fff' }} // Alternate background colors for list items
      >
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
</Drawer>



      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
        <Box sx={{ width: '80%', maxWidth: 1200 }}>
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DoctorProfile;
