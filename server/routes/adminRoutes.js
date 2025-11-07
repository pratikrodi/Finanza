import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import User from "../models/user.js";
import Appointment from "../models/appointment.js";

const router = express.Router();

// Admin check middleware
const adminProtect = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Not authorized" });
  next();
};

// Get all users
router.get("/users", protect, adminProtect, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Get all appointments
router.get("/appointments", protect, adminProtect, async (req, res) => {
  const appointments = await Appointment.find().populate("customer ca", "name email");
  res.json(appointments);
});

export default router;
