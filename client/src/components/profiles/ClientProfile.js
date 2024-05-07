import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AiChatbot from './Client/AiChatbot';
import Appointments from './Client/Appointments';
import AppointmentView from './Client/AppointmentView';
import MedicalRecords from './Client/MedicalRecords';
import HealthArticle from './Client/HealthActivity';
// import Timer from '../auth/Timer';
import Stats from './Client/stats';
import { 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Button, 
  Avatar, 
  Menu, 
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const ClientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (location.state?.user) {
      setUserData(location.state.user);
    }
  }, [location.state]);

  const navigateToSection = (section) => {
    setActiveSection(section);
    setDrawerOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderContent = () => {
    if (userData.user) {
    switch (activeSection) {
      case 'appointments':
        return <Appointments userId={userData.user._id} />;
      case 'view-appointments':
        return <AppointmentView userId={userData.user._id} />;
      case 'medical-assistant':
        return <AiChatbot />;
      case 'medical-records':
        return <MedicalRecords medicalRecords={userData.medicalRecords} userId={userData.user._id} />;
        default:
          return <Stats userId={userData.user._id} />;
      }
    } else {
      return null; // or display a loading indicator
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
              User Profile
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        {/* <Timer/> */}
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          {['Profile', 'Appointments', 'View Appointments', 'Medical Records', 'Medical Assistant'].map((text, index) => (
            <ListItem button key={text} onClick={() => navigateToSection(text.toLowerCase().replace(' ', '-'))}>
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
      <Box>
        <HealthArticle/>
      </Box>
    </ThemeProvider>
  );
};

export default ClientProfile;
