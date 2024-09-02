import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState(""); // New state for password

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name,
        age,
        email,
        mobile,
        address,
        password // Include password in the data sent to the server
      });
      console.log("Signup successful:", response.data);
      // Reset form fields after successful signup
      setName("");
      setAge("");
      setEmail("");
      setMobile("");
      setAddress("");
      setPassword("");
      // Handle success (e.g., show success message to the user)
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error (e.g., display error message to the user)
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "110vh" }}>
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            placeholder="Enter mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8" // Example constraint: minimum length of 8 characters
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <p className="mt-3">
          Already a user? <a href="/login">Login here</a>.
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
