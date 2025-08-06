import express, { json } from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const doctors = JSON.parse(readFileSync(join(__dirname, 'doctors.json'), 'utf8'));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

// Get all doctors
app.get('/api/doctors', (req, res) => {
  const { location = '', specialty = '' } = req.query;

  const filtered = doctors.filter(doc =>
    doc.location.toLowerCase().includes(location.toLowerCase()) &&
    doc.specialty.toLowerCase().includes(specialty.toLowerCase())
  );

  res.json(filtered);
});

// Get doctor by ID - New endpoint
app.get('/api/doctors/:id', (req, res) => {
  console.log('Received request for doctor ID:', req.params.id);
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find(doc => doc.id === doctorId);
  
  if (!doctor) {
    console.log(`Doctor with ID ${doctorId} not found`);
    return res.status(404).json({ error: `Doctor with ID ${doctorId} not found` });
  }
  
  console.log('Found doctor:', doctor);
  res.json({
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialty,
    location: doctor.location
  });
});

// Search doctors by specialty - New endpoint
app.get('/api/doctors/specialty/:specialty', (req, res) => {
  console.log('Received request for specialty:', req.params.specialty);
  const searchSpecialty = req.params.specialty.toLowerCase();
  
  const matchingDoctors = doctors.filter(doc => 
    doc.specialty.toLowerCase().includes(searchSpecialty)
  );
  
  console.log(`Found ${matchingDoctors.length} doctors with specialty containing "${searchSpecialty}"`);
  
  res.json(matchingDoctors.map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialty,
    location: doctor.location
  })));
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'API is live' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
