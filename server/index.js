const express = require('express');
const connectdb = require('./db.js');
const mongoose = require('mongoose');
const { User, Admin, Patient, Doctor, MedicalRecord } = require('./models/signup.js'); // Assuming your signup.js contains User and Doctor models
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
connectdb();

app.get('/json', async (req, res) => {
    // Assuming you have an Item model and want to fetch items
    const response = await Item.find();
    return res.json({ items: response });
});

app.post('/create', async (req, res) => {
    console.log(req.body);
    const newItem = new Item(req.body);
    await newItem.save();
    res.send({ message: true });
});

// Get user by ID
app.get('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Fetching user data for ID:', userId)
    // Fetch user from database by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If credentials are valid
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Error fetching user data' });
  }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
        //return success messAge:
        try {
            // Check if user exists
            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            // Validate password
            const isMatch = await bcrypt.compare(password, user.password);
    
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            // If credentials are valid
            res.status(200).json({ message: 'Login successful', user });
    
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(500).json({ message: 'Server error' });
        } 
});


// Admin Signup Route
app.post('/api/signup/admin', async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.error('Email already exists:', req.body.email);
            return res.status(400).json({ message: 'Email already exists' });
        }

        // // Validate specialization ID
        // if (!mongoose.Types.ObjectId.isValid(req.body.specializationID)) {
        //     console.error('Invalid specialization ID:', req.body.specializationID);
        //     return res.status(400).json({ message: 'Invalid specialization ID' });
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new User
        const user = new User({
            role: 'Admin',
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            contactNumber: req.body.contactNumber,
        });

        // Save the User to the database
        const savedUser = await user.save();

        // Create a new Doctor with the user's ID
        const admin = new Admin({
            user: savedUser._id,
        });

        // Save the Doctor to the database
        await admin.save();

        res.status(201).json({ message: 'Admin signup successful' });
    } catch (error) {
        console.error('Admin signup error:', error.message);
        res.status(500).json({ message: `An error occurred while signing up: ${error.message}` });
    }
});

// Client Signup Route
app.post('/api/signup/client', async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.error('Email already exists:', req.body.email);
            return res.status(400).json({ message: 'Email already exists' });
        }

        // // Validate specialization ID
        // if (!mongoose.Types.ObjectId.isValid(req.body.specializationID)) {
        //     console.error('Invalid specialization ID:', req.body.specializationID);
        //     return res.status(400).json({ message: 'Invalid specialization ID' });
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new User
        const user = new User({
            role: 'Patient',
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            contactNumber: req.body.contactNumber,
        });

        // Save the User to the database
        const savedUser = await user.save();

        // Create a new Doctor with the user's ID
        const patient = new Patient({       
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            medicalHistory: req.body.medicalHistory,
            user: savedUser._id,
        });

        // Save the Doctor to the database
        await patient .save();

        res.status(201).json({ message: 'Admin signup successful' });
    } catch (error) {
        console.error('Admin signup error:', error.message);
        res.status(500).json({ message: `An error occurred while signing up: ${error.message}` });
    }
});

// Doctor Signup Route
app.post('/api/signup/doctor', async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.error('Email already exists:', req.body.email);
            return res.status(400).json({ message: 'Email already exists' });
        }

        // // Validate specialization ID
        // if (!mongoose.Types.ObjectId.isValid(req.body.specializationID)) {
        //     console.error('Invalid specialization ID:', req.body.specializationID);
        //     return res.status(400).json({ message: 'Invalid specialization ID' });
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new User
        const user = new User({
            role: 'Doctor',
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            contactNumber: req.body.contactNumber,
        });

        // Save the User to the database
        const savedUser = await user.save();

        // Create a new Doctor with the user's ID
        const doctor = new Doctor({
            medicalLicenseNumber: req.body.licenseNumber,
            specializationID: req.body.specializationID,
            clinicOrHospital: req.body.affiliation,
            user: savedUser._id,
        });

        // Save the Doctor to the database
        await doctor.save();

        res.status(201).json({ message: 'Doctor signup successful' });
    } catch (error) {
        console.error('Doctor signup error:', error.message);
        res.status(500).json({ message: `An error occurred while signing up: ${error.message}` });
    }
});


// code to Add and view medical records by pAtients
// Get all medical records for a user
app.get('/api/medical-records/:userId', async (req, res) => {
    
    console.log('Fetching medical records for user.')
    try {
      const userId = req.params.userId;
      const records = await MedicalRecord.find({ userId: userId });
  
      if (!records) {
        console.log('No medical records found for this user.')
        return res.status(404).json({ message: 'No medical records found for this user.' });
      }
  
      res.status(200).json(records);
    } catch (error) {
      console.error('Error fetching medical records:', error);
      res.status(500).json({ message: 'Error fetching medical records' });
    }
  });
  
  
  // Add a new medical record
app.post('/api/medical-records', async (req, res) => {
    try {
      const newRecord = new MedicalRecord({
        userId: req.body.userId,
        date: req.body.date,
        doctorName: req.body.doctorName,
        diagnosis: req.body.diagnosis,
        prescription: req.body.prescription
      });
  
      const savedRecord = await newRecord.save();
      res.status(201).json(savedRecord);
    } catch (error) {
      console.error('Error adding new medical record:', error);
      res.status(500).json({ message: 'Error adding new medical record' });
    }
  });
  
  

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
