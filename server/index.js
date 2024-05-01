const express = require('express');
const connectdb = require('./db.js');
const mongoose = require('mongoose');
const { User, Admin, Patient, Doctor, MedicalRecord,Appointment,TimeSlot,DailySchedule } = require('./models/signup.js'); // Assuming your signup.js contains User and Doctor models
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


//client Appointment handling
app.get('/api/doctors_list', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user');
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/available-dates/:doctorId', async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const dailySchedules = await DailySchedule.find({ user_id: doctorId });
    const availableDates = dailySchedules.map(schedule => schedule.date.toISOString().split('T')[0]);
    res.json(availableDates);
  } catch (error) {
    console.error('Error fetching available dates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Define route to get available dates of a doctor
app.get('/doctor/:doctorId/available_dates', async (req, res) => {
  const { doctorId } = req.params;
  console.log("doctorId:", doctorId); // Check if doctorId is received correctly

  try {
    // Find all daily schedules for the specified doctor
    const schedules = await DailySchedule.find({ user_id: doctorId });

    // Extract unique dates from the schedules
    const availableDates = [...new Set(schedules.map(schedule => schedule.date))];

    res.json(availableDates);
  } catch (error) {
    console.error('Error fetching available dates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Doctor Signup Route
// Doctor Signup Route
app.post('/api/signup/doctor', async (req, res) => {
  try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
          console.error('Email already exists:', req.body.email);
          return res.status(400).json({ message: 'Email already exists' });
      }

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

      // Create a new Doctor with the user's ID and specialization name
      const doctor = new Doctor({
          medicalLicenseNumber: req.body.licenseNumber,
          specializationName: req.body.specializationName,
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
  
// GET doctor's appointments with patient name and timeslot details
app.get('/appointments/doctor/:userId', async (req, res) => {
  try {
      const appointments = await Appointment.find({ doctor_id: req.params.userId })
          .populate('patient_id', 'fullName')
          .populate({
              path: 'timeSlot_id',
              select: 'startTime endTime shift_id'
          })
          .select('-createdAt -updatedAt')
          .lean();
      
      // Map over appointments to format data and extract patient name and timeslot details
      const formattedAppointments = appointments.map(appointment => {
          return {
              _id: appointment._id,
              date: appointment.date,
              shift: appointment.timeSlot_id.shift_id,
              patientName: appointment.patient_id.fullName, // Extract patient name from populated field
              status: appointment.status,
              timeSlotStart: appointment.timeSlot_id.startTime, // Extract start time from populated field
              timeSlotEnd: appointment.timeSlot_id.endTime // Extract end time from populated field
          };
      });
console.log(formattedAppointments);
      res.json(formattedAppointments);
  } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// PUT endpoint to update appointment status
app.put('/appointments/:appointmentId/status', async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    // Find the appointment by ID and update its status
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
    
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Error updating appointment status' });
  }
});



// GET endpoint to check availability of time slots for a specific date and doctor
app.get('/api/check_availability', async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    // Find all time slots for the given doctor and date
    const timeSlots = await TimeSlot.find({ user_id: doctorId, date: { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) } });

    // Filter out booked time slots
    const availableSlots = timeSlots.filter(slot => slot.status === 'Available');

    res.status(200).json({ availableSlots });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ message: 'Error checking availability' });
  }
});

// Backend route to book appointment and update time slot status
app.post('/api/book_appointment', async (req, res) => {
  try {
    const { doctorId, patientId, date, timeSlotId } = req.body;

    // Create a new appointment instance
    const newAppointment = new Appointment({
      doctor_id: doctorId,
      patient_id: patientId,
      date,
      timeSlot_id: timeSlotId,
      status: 'Pending'
    });

    // Save the new appointment to the database
    const savedAppointment = await newAppointment.save();

    // Update time slot status to booked and set appointment ID
    await TimeSlot.findOneAndUpdate(
      { _id: timeSlotId },
      { $set: { status: 'Booked', appointment_id: savedAppointment._id } }
    );

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});

// Backend route to fetch appointments by user ID with doctor name and timeslot details
app.get('/api/appointments/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find appointments by user ID and populate doctor name from user schema
    const appointments = await Appointment.find({ patient_id: userId })
      .populate({
        path: 'doctor_id',
        model: 'User',
        select: 'fullName' // Only select the fullName field from the user schema
      })
      .populate({
        path: 'timeSlot_id',
        model: 'TimeSlot',
        select: 'startTime endTime' // Select the startTime and endTime fields from the timeslot schema
      })
      .lean(); // Convert Mongoose document to plain JavaScript object

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});





// GET doctor's schedule
  app.get('/api/:doctorId/schedule', async (req, res) => {
    try {
        const doctorSchedule = await DailySchedule.find({ user_id: req.params.doctorId });
        const scheduleDates = doctorSchedule.map(schedule => schedule.date);
        res.json(scheduleDates);
    } catch (error) {
        console.error('Error fetching doctor schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET doctor's schedule
// POST route to add or update daily schedule
app.post('/api/schedule', async (req, res) => {
  try {
    const { user_id, date, shift_id, startTime, endTime } = req.body;
    console.log('Adding/Updating schedule:', user_id, date, shift_id, startTime, endTime);
    
    // Ensure user_id is provided in the request body
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Perform any additional validation if needed

    // Create a new DailySchedule instance
    const newSchedule = new DailySchedule({
      user_id,
      date,
      shift_id,
      startTime,
      endTime
    });

    // Save the new schedule to the database
    const savedSchedule = await newSchedule.save();

    // Calculate the time slots
    const slotsToAdd = calculateTimeSlots(startTime, endTime);
    console.log('Time slots to add:', slotsToAdd);

    // Add/update time slots
    const slotsUpdated = await updateTimeSlots(user_id, date, shift_id, slotsToAdd);
    console.log('Time slots updated successfully?', slotsUpdated);

    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error('Error adding/updating schedule:', error);
    res.status(500).json({ message: 'Error adding/updating schedule' });
  }
});

// Function to calculate time slots
const calculateTimeSlots = (startTime, endTime) => {
  const slots = [];
  let currentTime = parseTime(startTime);
  const endTimeObj = parseTime(endTime);

  while (currentTime < endTimeObj) {
    const slotStartTime = formatTime(currentTime);
    currentTime.setMinutes(currentTime.getMinutes() + 30);
    const slotEndTime = formatTime(currentTime);
    slots.push({ startTime: slotStartTime, endTime: slotEndTime });
  }

  return slots;
};

// Helper function to parse time string to Date object
// Helper function to parse time string to Date object
const parseTime = (timeStr) => {
  const [hoursStr, minutesStr, period] = timeStr.split(/:| /);
  const hours = parseInt(hoursStr) + (period === 'PM' && hoursStr !== '12' ? 12 : 0);
  const minutes = parseInt(minutesStr);
  const currentTime = new Date();
  currentTime.setHours(hours, minutes, 0); // Set hours, minutes, and seconds to 0
  return currentTime;
};

// Helper function to format time from Date object to HH:mm string
const formatTime = (timeObj) => {
  let hours = timeObj.getHours();
  const minutes = timeObj.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
};


// Function to update time slots
const updateTimeSlots = async (user_id, date, shift_id, slotsToAdd) => {
  try {
    await TimeSlot.deleteMany({ user_id, date, shift_id }); // Remove existing time slots for the same user, date, and shift

    const timeSlots = slotsToAdd.map(slot => ({
      user_id,
      date,
      shift_id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: 'Available'
    }));

    await TimeSlot.insertMany(timeSlots);

    return true; // Return true if slots are updated successfully
  } catch (error) {
    console.error('Error updating time slots:', error);
    throw error;
  }
};

// GET route to fetch doctors's schedule
app.get('/api/schedule/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch the schedule for the provided userId
    const schedule = await DailySchedule.find({ user_id: userId });
console.log('Schedule:', schedule);
    res.status(200).json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ message: 'Error fetching schedule' });
  }
});

// POST add or update schedule
app.post('/api/schedule/update', async (req, res) => {
  const { userId, date, startTime, endTime } = req.body;

  try {
    let dailySchedule = await DailySchedule.findOne({ user_id: userId, date });

    if (!dailySchedule) {
      dailySchedule = new DailySchedule({
        user_id: userId,
        date,
        startTime,
        endTime
      });
      await dailySchedule.save();
    } else {
      dailySchedule.startTime = startTime;
      dailySchedule.endTime = endTime;
      await dailySchedule.save();
    }

    res.json({ success: true, message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ success: false, message: 'Error updating schedule' });
  }
});

// Helper function to generate time slots
const generateTimeSlots = (startTime, endTime) => {
  const timeSlots = [];
  let current = new Date(`01/01/2022 ${startTime}`);
  const end = new Date(`01/01/2022 ${endTime}`);
  
  while (current <= end) {
    const slot = {
      startTime: current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: new Date(current.getTime() + 30 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    timeSlots.push(slot);
    
    current = new Date(current.getTime() + 30 * 60000);
  }

  return timeSlots;
};


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
