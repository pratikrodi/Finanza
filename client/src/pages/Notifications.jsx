import React, { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // ✅ Fetch appointments as notifications
        const res = await axios.get("http://localhost:5000/api/customer/appointments", { headers });

        // Map appointments into notification-style messages
        const notifs = res.data.map((appt) => ({
          id: appt._id,
          message: `Your appointment with ${appt.ca.name} on ${new Date(
            appt.date
          ).toDateString()} at ${appt.time} is ${appt.status}.`,
          status: appt.status,
        }));

        setNotifications(notifs);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem", color: "#333" }}>Notifications</h2>

      {notifications.length === 0 ? (
        <p style={{ color: "#777" }}>No notifications yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n) => (
            <li
              key={n.id}
              style={{
                background: "#fff",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ margin: 0 }}>{n.message}</p>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color:
                    n.status === "confirmed"
                      ? "green"
                      : n.status === "pending"
                      ? "orange"
                      : "red",
                }}
              >
                {n.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
