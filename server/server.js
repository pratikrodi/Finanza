// server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login'); // Import login route

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const getSlotsRouter = require("./routes/freeSlots");
const getEventsRouter = require("./routes/getEvents");
const createEventsRouter = require("./routes/createEvent");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use("/freeSlots", getSlotsRouter);
app.use("/getEvents", getEventsRouter);
app.use("/createEvent", createEventsRouter);
app.use("/api", signupRoute);
app.use("/api", loginRoute); // Add login route

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
