const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');


router.post("/",(req,res)=>{
    res.render('signLogin');
})

router.post('/signup', (req, res) => {
    res.render( 'signup');
})

router.post('/signupdb', (req, res) => {
    console.log(req.body);
    const newpatient = new Patient({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        dateOfBirth:req.body.dateOfBirth,
        gender:req.body.gender,
        contactNumber:req.body.contactNumber,
        address:req.body.address,
        patientId:req.body.patientId
    });
    newpatient.save()
    .then(async()=>{
        const patient = await Patient.find();
        res.render('dashboard',{patient});
    })
    .catch((err)=>{
        console.error(err);
        res.sendFile(path.join(__dirname, '../error.html'));
    })
  });



  router.post('/login', (req, res) => {
    res.render( 'login');
  })
  router.post('/logindb', (req, res) => {
    const { firstName, password } = req.body;
    Patient.findOne({ firstName, password })
    .then(async()=>{
        const patient = await Patient.find();
        res.render('dashboard',{patient});
    })
    .catch((err)=>{
        console.error(err);
        res.sendFile(path.join(__dirname, '../error.html'));
    })
  }); 


module.exports = router;
