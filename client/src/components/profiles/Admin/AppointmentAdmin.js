import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";

function Appointment() {
  const location = useLocation();
  const userId = location.pathname.split("/").pop(); // Extract doctor ID from the URL pathname
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`http://localhost:3000/doctor/${userId}`);
        const data = await res.json();
        setUser(data);
        setAppointmentsCount(data.appointmentsCount);
        setAppointments(data.appointmentsData);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctor();
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return "red";
      case "Completed":
        return "green";
      case "Pending":
        return "yellow";
      default:
        return "inherit";
    }
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {user && (
        <Card style={{ marginTop: "20px", backgroundColor: "#f0f0f0" }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              Doctor Details
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <strong>Name:</strong> {user.fullName}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <strong>Contact Number:</strong> {user.contactNumber}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <strong>Medical License Number:</strong>{" "}
              {user.medicalLicenseNumber}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <strong>Specialization:</strong> {user.specializationName}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <strong>Clinic/Hospital:</strong> {user.clinicOrHospital}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <strong>Appointment Count:</strong> {appointmentsCount}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card style={{ marginTop: "20px", backgroundColor: "#f0f0f0" }}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                color="primary"
                fontWeight="bold"
                gutterBottom
              >
                Appointment Records
              </Typography>
              {appointments.map((appointment, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <Typography color="textSecondary">
                    <strong>Date:</strong> {appointment.date}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: getStatusColor(appointment.status) }}>
                      {appointment.status}
                    </span>
                  </Typography>
                  {/* Add more details here */}
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Appointment;
