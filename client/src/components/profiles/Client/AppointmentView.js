import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentView = ({ userId }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/appointments/user/${userId}`);
                setAppointments(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (appointments.length === 0) {
        return <div>No appointments found for this user.</div>;
    }

    return (
        <div>
            <h2>Appointments</h2>
            {appointments.map(appointment => (
                <div key={appointment._id}>
                    <p><strong>Appointment Status:</strong> <span style={{ fontWeight: 'bold' }}>{appointment.status}</span></p>
                    <p><strong>Doctor:</strong> {appointment.doctor_id.fullName}</p>
                    <p><strong>Date:</strong> {new Date(appointment.date).toDateString()}</p>
                    <p><strong>Start Time:</strong> {appointment.timeSlot_id.startTime}</p>
                    <p><strong>End Time:</strong> {appointment.timeSlot_id.endTime}</p>
                    {/* Add more details as needed */}
                </div>
            ))}
        </div>
    );
};

export default AppointmentView;
