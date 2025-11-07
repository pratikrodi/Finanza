import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    profilePic: "",
  });
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [showPicModal, setShowPicModal] = useState(false);

  // Fetch user profile on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customer/me", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
        setProfilePic(res.data.profilePic);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Profile Picture upload (separate request)
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePic(URL.createObjectURL(file)); // preview immediately

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await axios.put(
        "http://localhost:5000/api/customer/update/profile-pic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setUser(res.data);
      setProfilePic(res.data.profilePic);
      sessionStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile photo updated!");
      setShowPicModal(false);
    } catch (err) {
      console.error("Error uploading photo:", err);
      alert("Failed to upload photo.");
    }
  };

  // Handle text change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save other fields (JSON request)
  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/customer/update/details",
        {
          name: user.name,
          email: user.email,
          contact: user.contact,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setUser(res.data);
      sessionStorage.setItem("user", JSON.stringify(res.data));
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "2rem" }}>
      <div
        style={{
          maxWidth: "400px",
          margin: "2rem auto",
          padding: "2rem",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <FaEdit
          onClick={() => setEditing(!editing)}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            cursor: "pointer",
            color: "#2563eb",
            fontSize: "20px",
          }}
        />

        {/* Profile Picture */}
        <div style={{ textAlign: "center" }}>
          <img
            src={
              profilePic
                ? profilePic.startsWith("blob")
                  ? profilePic
                  : `http://localhost:5000${profilePic}`
                : "https://via.placeholder.com/100"
            }
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              marginBottom: "1rem",
              objectFit: "cover",
              cursor: "pointer",
              border: "3px solid #2563eb",
            }}
            onClick={() => setShowPicModal(true)}
          />
        </div>

        {/* Fields stacked vertically */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              disabled={!editing}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              disabled={!editing}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={user.contact}
              disabled={!editing}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
        </div>

        {editing && (
          <button
            onClick={handleSave}
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "10px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Profile Pic Modal */}
      {showPicModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h3>Update Profile Photo</h3>
            <img
              src={
                profilePic
                  ? profilePic.startsWith("blob")
                    ? profilePic
                    : `http://localhost:5000${profilePic}`
                  : "https://via.placeholder.com/100"
              }
              alt="Preview"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ margin: "10px 0" }}
            />
            <br />
            <button
              onClick={() => setShowPicModal(false)}
              style={{
                background: "red",
                color: "#fff",
                padding: "8px 15px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
