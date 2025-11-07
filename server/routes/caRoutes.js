import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import Appointment from "../models/appointment.js";

const router = express.Router();

// CA view appointments assigned to them
router.get("/appointments", protect, async (req, res) => {
  if (req.user.role !== "ca") return res.status(403).json({ message: "Not authorized" });

  const appointments = await Appointment.find({ ca: req.user._id }).populate("customer", "name email");
  res.json(appointments);
});

// CA confirm or reject an appointment
router.put("/appointments/:id", protect, async (req, res) => {
  if (req.user.role !== "ca") return res.status(403).json({ message: "Not authorized" });

  const { status } = req.body; // expected: "confirmed" or "rejected"
  if (!["confirmed", "rejected"].includes(status)) return res.status(400).json({ message: "Invalid status" });

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Appointment not found" });

  if (appointment.ca.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized for this appointment" });

  appointment.status = status;
  await appointment.save();

  res.json(appointment);
});

export default router;
