const express = require('express');
const cors = require('cors');
const doctors = require('./doctors.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/doctors', (req, res) => {
  const { location = '', specialty = '' } = req.query;

  const filtered = doctors.filter(doc =>
    doc.location.toLowerCase().includes(location.toLowerCase()) &&
    doc.specialty.toLowerCase().includes(specialty.toLowerCase())
  );

  res.json(filtered);
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'API is live' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
