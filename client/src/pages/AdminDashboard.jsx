import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get all users
        const resUsers = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setUsers(resUsers.data);

        // get all appointments
        const resAppointments = await axios.get("http://localhost:5000/api/admin/appointments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setAppointments(resAppointments.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.name} ({u.role})</li>
        ))}
      </ul>

      <h2>Appointments</h2>
      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {a.customerName} booked with {a.caName} on {a.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
