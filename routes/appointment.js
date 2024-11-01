const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const path = require('path');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

// Define appointment routes here...
router.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../appointment', 'getappoint.html'));
})
router.post('/appointdb',async(req, res) => {
    try {
        const { patientId, doctorId, appointmentDate } = req.body;
        console.log(patientId)
        console.log(doctorId)
        console.log(appointmentDate);
        // Check if patient and doctor exist
        const patient = await Patient.findOne({patientId});
        const doctor = await Doctor.findOne({doctorId});
        console.log(patient);
    
        if (!patient || !doctor) {
          return res.status(404).json({ message: 'Patient or doctor not found' });
        }
    console.log("go");
        // Create a new appointment
        const appointment = new Appointment({
          patientID: patientId,
          doctorID: doctorId,
          appointmentDate: appointmentDate,
        });
    console.log("mew");
    await appointment.save();
    res.sendFile(path.join(__dirname, '../appointment', 'done_appoint.html'));
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
})



module.exports = router;
