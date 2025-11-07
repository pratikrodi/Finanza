import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function CADashboard() {
  const { user: reduxUser, token: reduxToken } = useSelector((state) => state.auth);

  // fallback to sessionStorage if Redux is empty (after refresh)
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const storedToken = sessionStorage.getItem("token");

  const ca = reduxUser || storedUser || { name: "Loading...", email: "" };
  const token = reduxToken || storedToken;

  const [appointments, setAppointments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [processingIds, setProcessingIds] = useState({});

  useEffect(() => {
    if (!token) return; // no token, don't fetch
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Fetch CA appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ca/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      alert("Failed to load appointments. Check console for details.");
    }
  };

  // Update appointment status
  const updateStatus = async (id, status) => {
    try {
      setProcessingIds((s) => ({ ...s, [id]: true }));
      await axios.put(
        `http://localhost:5000/api/ca/appointments/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchAppointments();
      alert(`Appointment ${status === "confirmed" ? "confirmed" : "rejected"} successfully.`);
    } catch (err) {
      console.error("Failed to update appointment status:", err);
      alert("Failed to update appointment status. See console for details.");
    } finally {
      setProcessingIds((s) => {
        const copy = { ...s };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleStatusAction = (appt, status) => {
    const when = appt.time ? `on ${appt.time}` : "";
    const text = `Are you sure you want to ${status} the appointment request from "${appt.customer?.name || appt.customerName}" ${when}?`;
    if (!window.confirm(text)) return;
    updateStatus(appt._id, status);
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      {/* Navbar */}
      <div
        style={{
          background: "#4f46e5",
          color: "#fff",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "bold" }}>CA Dashboard</h2>

        {/* Profile Dropdown */}
        <div style={{ position: "relative" }}>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            onClick={() => setDropdownOpen((d) => !d)}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid white",
            }}
          />
          {dropdownOpen && (
            <div
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
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <strong>{ca.name}</strong>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>{ca.email}</p>
                </div>
              </div>
              <div style={menuItemStyle} onClick={() => alert("Go to profile page")}>
                👤 Profile
              </div>
              <div style={menuItemStyle} onClick={() => alert("Show notifications")}>
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

      {/* Appointments Section */}
      <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "2rem" }}>
        <h2 style={{ marginBottom: "1rem", color: "#333", fontWeight: "600" }}>My Appointments</h2>

        {appointments.length === 0 ? (
          <p style={{ color: "#777" }}>No appointments yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {appointments.map((a) => {
              const dateStr = a.date ? new Date(a.date).toLocaleDateString() : "(no date)";
              const timeStr = a.time || "(no time)";
              const custName = a.customer?.name || a.customerName || "Unknown";

              return (
                <li
                  key={a._id}
                  style={{
                    background: "#fff",
                    padding: "1.2rem",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <strong>{custName}</strong>
                      <div>📧 {a.customer?.email || a.customerEmail || ""}</div>
                      <div>📞 {a.customerContact || "(no contact)"}</div>
                      <div>📝 {a.reason || "(no reason provided)"}</div>
                      <div>📅 {dateStr} — <b>{timeStr}</b></div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          marginBottom: 8,
                          padding: "6px 12px",
                          borderRadius: 20,
                          fontWeight: "600",
                          backgroundColor:
                            a.status === "confirmed"
                              ? "#d1fae5"
                              : a.status === "pending"
                              ? "#fef3c7"
                              : "#fee2e2",
                          color:
                            a.status === "confirmed"
                              ? "green"
                              : a.status === "pending"
                              ? "orange"
                              : "red",
                        }}
                      >
                        {a.status?.toUpperCase()}
                      </div>

                      {a.status === "pending" && (
                        <div>
                          <button
                            onClick={() => handleStatusAction(a, "confirmed")}
                            disabled={!!processingIds[a._id]}
                            style={{ ...buttonStyle, background: "#16a34a" }}
                          >
                            {processingIds[a._id] ? "Processing..." : "✅ Confirm"}
                          </button>
                          <button
                            onClick={() => handleStatusAction(a, "rejected")}
                            disabled={!!processingIds[a._id]}
                            style={{ ...buttonStyle, background: "#dc2626" }}
                          >
                            {processingIds[a._id] ? "Processing..." : "❌ Reject"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "8px 14px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginLeft: 8,
};

const menuItemStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
};

export default CADashboard;
