const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true } // Add password field
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
