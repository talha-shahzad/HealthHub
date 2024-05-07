import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import "./Admin.css";

function AdminMain() {
  const [adminProfile, setAdminProfile] = useState(null);
  const [showAdminProfile, setShowAdminProfile] = useState(true);

  const fetchAdminProfile = async () => {
    try {
      // Simulating data fetching
      const data = {
        fullName: "Husnain Ali",
        email: "husnainali2721@gmail.com",
        contactNumber: "03484485412",
        createdAt: "16-09-2003",
        updatedAt: "Currently",
      };
      setAdminProfile(data);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const adminProfileClick = () => {
    setShowAdminProfile(!showAdminProfile);
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#2d90d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
          <Button
            onClick={adminProfileClick}
            variant="contained"
            color="primary"
            className="button"
          >
            Toggle Admin Profile
          </Button>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
          <Button
            component={Link}
            to="/doctors"
            variant="contained"
            color="secondary"
            className="button"
          >
            View Doctors
          </Button>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
      {showAdminProfile && adminProfile && (
        <Card
          variant="outlined"
          className="card"
          sx={{
            bgcolor: "#f0f0f0",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            maxWidth: 400,
            margin: "auto",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              className="profile-heading"
              style={{ marginBottom: "16px", color: "#2d90d2" }}
            >
              Admin Profile
            </Typography>
            <div className="profile-details">
              <Typography variant="body1" gutterBottom>
                <strong>Full Name:</strong> {adminProfile.fullName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {adminProfile.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Contact Number:</strong> {adminProfile.contactNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Profile Creation Date:</strong>{" "}
                {adminProfile.createdAt}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Last Updated:</strong> {adminProfile.updatedAt}
              </Typography>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AdminMain;
