const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  contactNumber: String,
  address: String,
  password:String,
  patientId:Number
});

module.exports = mongoose.model('Patient', patientSchema);
