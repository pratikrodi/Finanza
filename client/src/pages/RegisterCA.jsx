import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterCA() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: "ca", // fixed role for CA
  });
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  // Redirect after successful registration
  useEffect(() => {
    if (user) {
      setSuccess("Successfully Registered..!! 🎉");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "350px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Register as CA
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={form.name}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <input
            name="contact"
            type="tel"
            placeholder="Contact Number"
            pattern="[0-9]{10}" // 10-digit number validation
            onChange={handleChange}
            value={form.contact}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading ? "Registering..." : "Register as CA"}
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", marginTop: "0.5rem" }}>{success}</p>
        )}

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4f46e5", fontWeight: "bold" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
