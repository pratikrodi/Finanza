import React from 'react';
import { Link } from 'react-router-dom';

const ClientDash = () => {
  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <div>
        <h3>Profile</h3>
        <Link to="/profile">Edit Profile</Link>
      </div>
      <div>
        <h3>Appointment History</h3>
        <Link to="/appointments">View Appointment History</Link>
      </div>
      <div>
        <h3>Book Appointment</h3>
        <Link to="/book-appointment">Book New Appointment</Link>
      </div>
    </div>
  );
};

export default ClientDash;
    