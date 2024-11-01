const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');   


router.post("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '../doctor', 'signLogin.html'));
})

router.post('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../doctor', 'signup.html'));
})

router.post('/signupdb', (req, res) => {
    console.log(req.body);
    const newdoc = new Doctor({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        specialization:req.body.specialization,
        contactNumber:req.body.contactNumber,
        address:req.body.address,
        doctorId:req.body.doctorId
    });
    newdoc.save()
    .then(async (data)=>
    {
        const doctors = await Doctor.find();
        res.render('dashboardd',{doctors});
    })
    .catch((err)=>{
        console.error(err);
        res.sendFile(path.join(__dirname, '../error.html'));
    })
  });

  router.post('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../doctor', 'login.html'));
  })
  router.post('/logindb', (req, res) => {
    const { firstName, password } = req.body;
    
    Doctor.findOne({ firstName, password })
    .then(async(data)=>{
        console.log(data);
        const doctors = await Doctor.find();
        res.render('dashboardd',{doctors});
    })
    .catch((err)=>{
        console.error(err);
        res.sendFile(path.join(__dirname, '../error.html'));
    })
  }); 

module.exports = router;
