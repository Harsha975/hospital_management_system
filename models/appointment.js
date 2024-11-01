const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientID: { type: mongoose.Schema.Types.Number, ref: 'Patient' },
  doctorID: { type: mongoose.Schema.Types.Number, ref: 'Doctor' },
  appointmentDate: Date,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
