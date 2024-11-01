// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const patientRoutes = require('./routes/patient');
const doctorRoutes = require('./routes/doctor');
const appointmentRoutes = require('./routes/appointment');
const Appointment = require('./models/appointment');
const Patient = require('./models/patient');
const Doctor = require('./models/doctor');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);
app.use('/appointment', appointmentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.render('index');
});

app.post("/viewAppointments", async (req, res) => { 
    try {
        const appointments = await Appointment.find();
        res.render('display_appointment', { appointments });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/generateReport", async (req, res) => {
    try {
        const patients = await Patient.find();
        const doctors = await Doctor.find();
        const appointments = await Appointment.find();
        res.render('report', { patients, doctors, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// 3D rendering code using Three.js (if needed)

// const { WebGLRenderer } = require('three');
// const { Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } = require('three');

// // Create a scene
// const scene = new Scene();

// // Create a camera
// const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
// camera.position.z = 5;

// // Create a renderer
// const renderer = new WebGLRenderer();
// renderer.setSize(800, 800);

// // Create a cube
// const geometry = new BoxGeometry();
// const material = new MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new Mesh(geometry, material);
// scene.add(cube);


// // Render the scene
// const animate = () => {
//   requestAnimationFrame(animate);

//   // Rotate the cube
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// };

// animate();
