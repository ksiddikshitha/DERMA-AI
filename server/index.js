import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Sample data
const clinicsData = [
  {
    name: 'Derma Care Clinic',
    address: '123 Main St, City Center',
    phone: '+1-555-0101',
    hours: '9:00 AM - 6:00 PM',
    rating: 4.8,
    specialties: ['Acne Treatment', 'Anti-aging', 'Laser Therapy']
  },
  {
    name: 'Skin Health Center',
    address: '456 Oak Ave, Downtown',
    phone: '+1-555-0102',
    hours: '10:00 AM - 7:00 PM',
    rating: 4.6,
    specialties: ['Eczema', 'Psoriasis', 'General Dermatology']
  },
  {
    name: 'Advanced Dermatology',
    address: '789 Pine Rd, Medical District',
    phone: '+1-555-0103',
    hours: '8:00 AM - 5:00 PM',
    rating: 4.9,
    specialties: ['Mole Removal', 'Chemical Peels', 'Microdermabrasion']
  }
];

const bookings = [];

// Routes

// Skin Analysis API
app.post('/api/analyze-skin', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Mock analysis result
  const analysisResult = {
    skinType: 'Oily',
    concerns: 'Acne prone, sensitivity',
    confidence: 85,
    healthScore: 7,
    recommendations: [
      'Use oil-free moisturizer',
      'Wash face twice daily with gentle cleanser',
      'Apply sunscreen SPF 30+ daily',
      'Avoid heavy makeup',
      'Use salicylic acid treatments 2-3 times weekly'
    ],
    products: [
      { name: 'Gentle Cleanser', category: 'Face Wash', match: 95 },
      { name: 'Oil-Free Moisturizer', category: 'Moisturizer', match: 92 },
      { name: 'Acne Treatment', category: 'Spot Treatment', match: 88 },
      { name: 'Sunscreen SPF 50', category: 'Sun Protection', match: 90 }
    ]
  };

  res.json(analysisResult);
});

// Chat API
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  // Mock response from AI assistant
  const responses = {
    'acne': 'For acne-prone skin, I recommend using salicylic acid or benzoyl peroxide. Keep your skin clean and avoid touching your face.',
    'sensitivity': 'Sensitive skin requires gentle care. Use fragrance-free products and avoid harsh exfoliants. Always do a patch test first.',
    'dry': 'For dry skin, use hydrating moisturizers and avoid hot water. Apply moisturizer to damp skin for better absorption.',
    'wrinkles': 'Anti-aging treatment includes retinol, vitamin C, and sunscreen. Consider professional treatments like microdermabrasion.',
    'default': 'Thank you for your question. Based on your symptoms, I recommend consulting with a dermatologist for a personalized treatment plan. In the meantime, maintain a consistent skincare routine with gentle products.'
  };

  const lowerMessage = message.toLowerCase();
  let reply = responses.default;

  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      reply = value;
      break;
    }
  }

  res.json({ reply });
});

// Clinics API
app.get('/api/clinics', (req, res) => {
  const { location } = req.query;

  let filteredClinics = clinicsData;
  if (location) {
    filteredClinics = clinicsData.filter(clinic =>
      clinic.name.toLowerCase().includes(location.toLowerCase()) ||
      clinic.address.toLowerCase().includes(location.toLowerCase())
    );
  }

  res.json({ clinics: filteredClinics });
});

// Booking API
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, clinicName, appointmentDate, appointmentTime, concern } = req.body;

  if (!name || !email || !phone || !clinicName || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const booking = {
    id: bookings.length + 1,
    name,
    email,
    phone,
    clinicName,
    appointmentDate,
    appointmentTime,
    concern,
    status: 'Pending',
    createdAt: new Date()
  };

  bookings.push(booking);
  res.json({ message: 'Booking successful', booking });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
