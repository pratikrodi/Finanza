import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { protect } from "../middlewares/authMiddleware.js";
import User from "../models/user.js";
import Appointment from "../models/appointment.js";

const router = express.Router();

// ---------- Ensure upload folder exists ----------
const uploadDir = path.join(process.cwd(), "uploads/profilePics");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ---------- Multer setup ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user?._id || "guest"}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

/* ---------------- PROFILE ROUTES ---------------- */

// Get logged-in user profile
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update profile picture only
router.put(
  "/update/profile-pic",
  protect,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const profilePic = req.file
        ? `/uploads/profilePics/${req.file.filename}`
        : null;

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { profilePic },
        { new: true }
      ).select("-password");

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to update profile picture" });
    }
  }
);

// Update details only
router.put("/update/details", protect, async (req, res) => {
  const { name, email, contact } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, contact },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update details" });
  }
});

/* ---------------- APPOINTMENT ROUTES ---------------- */

// Get all CAs
router.get("/cas", protect, async (req, res) => {
  const cas = await User.find({ role: "ca" }).select("-password");
  res.json(cas);
});

// Get customer appointments
router.get("/appointments", protect, async (req, res) => {
  const appointments = await Appointment.find({
    customer: req.user._id,
  }).populate("ca", "name email");
  res.json(appointments);
});

// Book appointment
router.post("/appointments", protect, async (req, res) => {
  const { caId, date, time, reason } = req.body;
  if (!caId || !date || !time || !reason) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const appointment = await Appointment.create({
    customer: req.user._id,
    ca: caId,
    date,
    time,
    reason,
    customerContact: req.user.email,
  });

  res.json(appointment);
});

// Cancel appointment
router.delete("/appointments/:id", protect, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Appointment not found" });
  if (!appointment.customer.equals(req.user._id)) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await appointment.deleteOne();
  res.json({ message: "Appointment canceled" });
});

export default router;
