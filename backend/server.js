require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const hostelRoutes = require('./routes/hostel.routes');
const contactRoutes = require('./routes/contact.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gurukul_hostel';

app.use(cors());
app.use(express.json());

app.use('/hostels', hostelRoutes);
app.use('/contact', contactRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Gurukul House API is running' });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
