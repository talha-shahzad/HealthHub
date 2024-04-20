const mongoose = require('mongoose');

// Users Schema
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['Doctor', 'Patient', 'Admin'],
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// Doctors Schema
const doctorSchema = new mongoose.Schema({
    medicalLicenseNumber: {
        type: String,
        required: true
    },
    specializationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialization'
    },
    clinicOrHospital: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

// Patients Schema
const patientSchema = new mongoose.Schema({
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    medicalHistory: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Patient = mongoose.model('Patient', patientSchema);

// Admins Schema
const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Admin = mongoose.model('Admin', adminSchema);

// Appointments Schema
const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// MedicalRecords Schema
const medicalRecordSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
    diagnosis: {
      type: String,
      required: true
    },
    prescription: {
      type: String,
      required: true
    }
  });
  
const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

// Specializations Schema
const specializationSchema = new mongoose.Schema({
    specializationName: {
        type: String,
        required: true
    }
});

const Specialization = mongoose.model('Specialization', specializationSchema);

module.exports = {
    User,
    Doctor,
    Patient,
    Admin,
    Appointment,
    MedicalRecord,
    Specialization
};
