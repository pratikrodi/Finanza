import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function CustomerDashboard() {
  const [cas, setCas] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [caId, setCaId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const profileBtnRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const headers = { Authorization: `Bearer ${token}` };

  // 👉 Generate slots from 10AM–10PM
  function generateSlots() {
    const slots = [];
    for (let hour = 10; hour < 21; hour++) {
      const start = `${hour.toString().padStart(2, "0")}:00`;
      const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
      slots.push(`${start} - ${end}`);
    }
    return slots;
  }

  // 👉 Get available slots for CA + Date
  function getAvailableSlots(caId, date) {
    if (!caId || !date) return [];

    const day = new Date(date).getDay();
    if (day === 0) return []; // Sunday holiday

    const allSlots = generateSlots();

    // Booked slots for this CA on this date
    const booked = appointments
      .filter(
        (a) =>
          a.ca._id === caId &&
          new Date(a.date).toDateString() === new Date(date).toDateString()
      )
      .map((a) => a.time);

    // If today → remove past slots
    const now = new Date();
    const isToday =
      new Date(date).toDateString() === new Date().toDateString();

    return allSlots.filter((slot) => {
      const startTime = slot.split(" - ")[0];

      // Remove booked
      if (booked.includes(startTime)) return false;

      // Remove past slots if today
      if (isToday) {
        const slotHour = parseInt(startTime.split(":")[0], 10);
        if (slotHour <= now.getHours()) return false;
      }

      return true;
    });
  }

  // 👉 Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👉 Fetch data
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const resCas = await axios.get("http://localhost:5000/api/customer/cas", {
          headers,
        });
        setCas(resCas.data);

        const resAppointments = await axios.get(
          "http://localhost:5000/api/customer/appointments",
          { headers }
        );
        setAppointments(resAppointments.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [user, token, navigate]);

  // 👉 Book appointment
  const handleBook = async () => {
    if (!caId || !date || !time || !reason) {
      return alert("Please select CA, date, time and enter a reason!");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/customer/appointments",
        { caId, date, time, reason },
        { headers }
      );

      const resAppointments = await axios.get(
        "http://localhost:5000/api/customer/appointments",
        { headers }
      );
      setAppointments(resAppointments.data);

      setCaId("");
      setDate("");
      setTime("");
      setReason("");
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment. Check console for details.");
    }
  };

  // 👉 Cancel appointment
  const handleCancel = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/customer/appointments/${id}`,
        { headers }
      );
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 👉 Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={{ margin: 0 }}>Finanza</h2>
        <div style={{ position: "relative" }}>
          <img
            ref={profileBtnRef}
            src={
              user?.profilePic
                ? `http://localhost:5000${user.profilePic}`
                : "https://via.placeholder.com/40"
            }
            alt="Profile"
            onClick={() => setDropdownOpen((d) => !d)}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid white",
              objectFit: "cover",
            }}
          />

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                right: 0,
                top: "55px",
                background: "#fff",
                color: "#333",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                minWidth: "260px",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    user?.profilePic
                      ? `http://localhost:5000${user.profilePic}`
                      : "https://via.placeholder.com/50"
                  }
                  alt="Profile"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <strong>{user?.name}</strong>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>
                    {user?.email}
                  </p>
                </div>
              </div>
              <div style={menuItemStyle} onClick={() => navigate("/profile")}>
                👤 Profile
              </div>
              <div
                style={menuItemStyle}
                onClick={() => navigate("/notifications")}
              >
                🔔 Notifications
              </div>
              <div
                style={{ ...menuItemStyle, color: "red", fontWeight: "bold" }}
                onClick={handleLogout}
              >
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem" }}>
        <h2 style={{ marginBottom: "0.5rem", color: "#333" }}>
          Hi {user?.name || "Loading..."} 👋
        </h2>
        <h2 style={{ marginBottom: "1rem", color: "#333" }}>
          Book Appointment
        </h2>
        <div style={formContainerStyle}>
          <select
            onChange={(e) => setCaId(e.target.value)}
            value={caId}
            style={inputStyle}
          >
            <option value="">Select CA</option>
            {cas.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            style={inputStyle}
          />

          {/* SLOT SELECT */}
          <select
            onChange={(e) => setTime(e.target.value)}
            value={time}
            style={inputStyle}
          >
            <option value="">Select Time Slot</option>
            {getAvailableSlots(caId, date).length === 0 ? (
              <option disabled>No slots available</option>
            ) : (
              getAvailableSlots(caId, date).map((slot, idx) => (
                <option key={idx} value={slot.split(" - ")[0]}>
                  {slot}
                </option>
              ))
            )}
          </select>

          <input
            type="text"
            placeholder="Reason for appointment"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
            style={{ ...inputStyle, flex: 2 }}
          />
          <button onClick={handleBook} style={buttonStyle}>
            Book
          </button>
        </div>

        <h2 style={{ marginBottom: "1rem", color: "#333" }}>My Appointments</h2>
        {appointments.length === 0 ? (
          <p style={{ color: "#777" }}>No appointments booked yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {appointments.map((a) => (
              <li key={a._id} style={appointmentStyle}>
                <div>
                  <strong>{a.ca.name}</strong> <br />
                  <span style={{ color: "#555" }}>
                    {new Date(a.date).toDateString()} – {a.time}
                  </span>
                  <br />
                  <em style={{ color: "#444" }}>Reason: {a.reason}</em> <br />
                  <span
                    style={{
                      color:
                        a.status === "confirmed"
                          ? "green"
                          : a.status === "pending"
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {a.status}
                  </span>
                </div>
                <button
                  onClick={() => handleCancel(a._id)}
                  style={{ ...buttonStyle, background: "#dc2626" }}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ✅ Styles
const headerStyle = {
  background: "#4f46e5",
  color: "#fff",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  flex: 1,
  minWidth: "150px",
};
const buttonStyle = {
  padding: "10px 16px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s",
};
const formContainerStyle = {
  display: "flex",
  gap: "1rem",
  marginBottom: "2rem",
  flexWrap: "wrap",
};
const appointmentStyle = {
  background: "#f9fafb",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #e5e7eb",
};
const menuItemStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
  fontSize: "0.95rem",
  transition: "background 0.2s",
};

export default CustomerDashboard;
