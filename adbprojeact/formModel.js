const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  specialty: String,
  phone: String
});

module.exports = mongoose.model('Doctor', doctorSchema);