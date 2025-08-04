const express = require('express');
const cors = require('cors');
const doctors = require('./doctors.json');

const app = express();
app.use(cors());

app.get('/api/doctors', (req, res) => {
  const { location, specialty } = req.query;
  const filtered = doctors.filter(doc => 
    doc.location.toLowerCase().includes(location?.toLowerCase() || '') &&
    doc.specialty.toLowerCase().includes(specialty?.toLowerCase() || '')
  );
  res.json(filtered);
});

app.listen(5000, () => console.log('API running on http://localhost:5000'));
