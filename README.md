# Healthhub - A Comprehensive Health Management System  

**Healthhub** is a web application developed using the **MERN stack** (MongoDB, Express.js, React, Node.js). It offers a unified platform for managing health-related activities and resources, catering to three distinct user roles: **Patients**, **Doctors**, and **Admins**. Additionally, it features an **AI Virtual Health Assistant** for enhanced health support.  

---

## Features  

### General Features:
- User authentication: Signup and login for all users.
- Dynamic and responsive user interfaces tailored to each role.  

---

### Patient Features:
- Book appointments with doctors.
- View all appointments (past and upcoming).
- Browse and view all registered doctors.
- Add personal health checkup details, including:
  - Blood Pressure (high/low).
  - Heart rate.
- Add medication details to receive notifications and alerts.
- Access the **Virtual AI Health Assistant** for:
  - Guidance on medications.
  - Assistance in identifying potential diseases.  

---

### Doctor Features:
- View scheduled and completed appointments:
  - Graphical summary of completed appointments.
  - Calendar view of upcoming schedules.
- Accept or reject appointment requests from patients.  

---

### Admin Features:
- Manage users:
  - Add, view, and delete doctors.
  - Add, view, and delete patients.
- Share resources:
  - Publish blogs and user guides focused on health and well-being.  

---

## Virtual AI Health Assistant  

The **AI Virtual Health Assistant** provides intelligent support, offering:  
- Recommendations for medications based on user inputs.  
- Assistance in identifying potential diseases using symptom analysis.  

---

## Installation and Setup  

1. Clone the repository:  
   ```bash
   git clone https://github.com/username/healthhub.git
   cd healthhub
   ```

2. Install dependencies:  
   - Backend:  
     ```bash
     cd backend
     npm install
     ```
   - Frontend:  
     ```bash
     cd frontend
     npm install
     ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory and set the following variables:
     ```
     MONGO_URI=<Your MongoDB Connection String>
     PORT=<Backend Server Port>
     ```

4. Start the application:
   - Backend server:  
     ```bash
     cd backend
     npm run start
     ```
   - Frontend server:  
     ```bash
     cd frontend
     npm run start
     ```

5. Access the application at `http://localhost:3000`.

---

## Technologies Used  

- **Frontend:** React.js, Tailwind CSS (or other CSS frameworks).  
- **Backend:** Node.js, Express.js.  
- **Database:** MongoDB.  
- **AI Features:** Integration with AI/ML models for health assistance.  

---
