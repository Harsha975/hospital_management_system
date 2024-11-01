const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  specialization: String,
  contactNumber: String,
  address: String,
  doctorId:Number
});

module.exports = mongoose.model('Doctor', doctorSchema);
