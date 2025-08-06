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
