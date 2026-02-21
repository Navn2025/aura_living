require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/admin.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gurukul_hostel';

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists');
    } else {
      await Admin.create({ username: 'admin', password: 'gurukul123' });
      console.log('Admin created: username: admin, password: gurukul123');
    }

    const existingNavneet = await Admin.findOne({ username: 'navneet' });
    if (existingNavneet) {
      console.log('User navneet already exists');
    } else {
      await Admin.create({ username: 'navneet', password: '123456789' });
      console.log('Admin created: username: navneet, password: 123456789');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedAdmin();
