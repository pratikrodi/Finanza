const router = require("express").Router();
const moment = require("moment-timezone");
const Appointment = require("../models/appointment"); // Import Mongoose Appointment model

// Define or import staticConfig with the timezone property
const staticConfig = {
  timezone: "YourTimeZoneHere" // Replace "YourTimeZoneHere" with the appropriate timezone
};

moment.tz.setDefault(staticConfig.timezone);

router.route("/").post(async (req, res) => {
  try {
    // Create a new appointment using Mongoose
    const reqDateTime = moment.utc(req.body.reqDateTime).toDate();
    const reqDuration = parseInt(req.body.reqDuration);

    const appointment = new Appointment({
      dateTime: reqDateTime,
      duration: reqDuration,
    });

    // Save the appointment to the database
    await appointment.save();

    // Send response
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send("New appointment added");
  } catch (error) {
    // Handle errors
    console.error("Error adding appointment:", error);
    res.status(500).send("Error adding appointment");
  }
});

module.exports = router;
