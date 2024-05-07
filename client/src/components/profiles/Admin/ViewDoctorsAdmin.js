import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";

function DoctorCard({ doctor }) {
  const cardStyle = {
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#E6F5FA", // Light blue background color
    color: "white", // White text color
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
    },
  };
  const fullNameStyle = {
    color: "#2d90d2", // Blue color for the full name
    fontWeight: "bold", // Make the full name bold
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="h2" style={fullNameStyle}>
          {doctor.fullName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Email: {doctor.email}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Contact Number: {doctor.contactNumber}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Medical License Number: {doctor.medicalLicenseNumber}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Specialization: {doctor.specializationName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Clinic/Hospital: {doctor.clinicOrHospital}
        </Typography>
        <Button
          component={Link}
          to={{
            pathname: `/appointments/${doctor._id}`,
            state: { doctor },
          }}
          variant="text"
        >
          <u>View More</u>
        </Button>
      </CardContent>
    </Card>
  );
}

function ViewDoctor() {
  const [doctorsData, setDoctorsData] = useState([]);

  const fetchDoctorData = async () => {
    try {
      const userRes = await fetch(
        "http://localhost:3000/fetch_user?role=Doctor"
      );
      const userData = await userRes.json();
      const doctorUserIds = userData.map((doctor) => doctor._id);
      const doctorData = await Promise.all(
        userData.map(async (user) => {
          const res = await fetch(
            `http://localhost:3000/fetch_doctor/${user._id}`
          );
          return await res.json();
        })
      );

      const populatedData = userData.map((user, index) => ({
        ...user,
        ...doctorData[index],
      }));
      setDoctorsData(populatedData);
      console.log("doctor in view doctor", populatedData);
    } catch (error) {
      console.error("Error fetching Doctors Data:", error);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "white",
          padding: "20px 0",
          minHeight: "100vh",
          color: "#87CEEB",
        }}
      >
        <Typography variant="h2" gutterBottom style={{ color: "#2d90d2" }}>
          List of Doctors
        </Typography>
        <Typography variant="h5" gutterBottom style={{ color: "#2d90d2" }}>
          This page will show lists of all the <b>Registered Doctors </b> and
          you can view their all <b color=""> record of appointments </b>.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {doctorsData.map((doctor, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <DoctorCard raised={true} doctor={doctor} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default ViewDoctor;
