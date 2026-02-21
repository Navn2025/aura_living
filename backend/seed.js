require('dotenv').config();
const mongoose = require('mongoose');
const Hostel = require('./models/hostel.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gurukul_hostel';

const seedData = [
  {
    name: "Gurukul House - Jagdalpur",
    location: "Jagdalpur, Chhattisgarh",
    rating: 4.8,
    price: 4500,
    gender: "Co-ed",
    established: 2020,
    description: "Gurukul House offers a unique blend of traditional Indian hospitality and modern amenities. Our hostel is designed to provide a peaceful environment for students to focus on their studies while enjoying a sense of community.",
    totalRemainingBeds: 24,
    capacity: 100,
    occupancy: 76,
    hostelType: "Premium",
    popular: true,
    comming_soon: false,
    images: [
      { imageUrl: "/room1.jpg" },
      { imageUrl: "/room2.jpg" },
      { imageUrl: "/room3.jpg" }
    ],
    features: [
      "High-speed WiFi",
      "Air Conditioning",
      "Hot Water",
      "Laundry Service",
      "Mess & Dining",
      "Study Room",
      "24/7 Security",
      "Power Backup"
    ],
    usps: [
      "Walking distance to major colleges",
      "Safe neighborhood with CCTV surveillance",
      "Experienced wardens and support staff"
    ],
    nearby1: "Pandit Ravishankar Shukla University",
    nearby1distance: "1.2 km",
    nearby2: "City Center Mall",
    nearby2distance: "2.5 km",
    nearby3: "Jagdalpur Railway Station",
    nearby3distance: "3.8 km",
    locationLink: "https://maps.google.com/?q=Jagdalpur,Chhattisgarh"
  },
  {
    name: "Gurukul House - Girls Wing",
    location: "Jagdalpur, Chhattisgarh",
    rating: 4.9,
    price: 5000,
    gender: "Girls Only",
    established: 2021,
    description: "A dedicated women's hostel with top-notch security and comfortable living spaces. We prioritize safety and provide a supportive environment for female students to thrive academically.",
    totalRemainingBeds: 12,
    capacity: 60,
    occupancy: 80,
    hostelType: "Premium",
    popular: true,
    comming_soon: false,
    images: [
      { imageUrl: "/room1.jpg" },
      { imageUrl: "/room2.jpg" }
    ],
    features: [
      "Female Warden",
      "24/7 Security Guard",
      "High-speed WiFi",
      "AC Rooms",
      "Hot Water",
      "Laundry Service",
      "Mess",
      "Study Room"
    ],
    usps: [
      "All-female staff on floor",
      "Strict entry regulations",
      "Regular parents' meetings"
    ],
    nearby1: "Government Girls College",
    nearby1distance: "0.5 km",
    nearby2: "City Hospital",
    nearby2distance: "1.5 km",
    nearby3: "Bus Stand",
    nearby3distance: "2 km",
    locationLink: "https://maps.google.com/?q=Jagdalpur,Chhattisgarh"
  },
  {
    name: "Gurukul House - Boys Hostel",
    location: "Jagdalpur, Chhattisgarh",
    rating: 4.6,
    price: 4000,
    gender: "Boys Only",
    established: 2019,
    description: "Our boys' hostel provides a comfortable and affordable living option for male students. With excellent facilities and a vibrant community, it's the perfect place for students to build lasting friendships.",
    totalRemainingBeds: 35,
    capacity: 120,
    occupancy: 71,
    hostelType: "Standard",
    popular: false,
    comming_soon: false,
    images: [
      { imageUrl: "/room3.jpg" },
      { imageUrl: "/room2.jpg" }
    ],
    features: [
      "High-speed WiFi",
      "Fan Rooms",
      "Hot Water",
      "Laundry",
      "Mess",
      "Sports Area",
      "24/7 Security"
    ],
    usps: [
      "Affordable pricing",
      "Large community",
      "Near city center"
    ],
    nearby1: "Engineering College",
    nearby1distance: "2 km",
    nearby2: "City Market",
    nearby2distance: "1 km",
    nearby3: "Bus Depot",
    nearby3distance: "2.5 km",
    locationLink: "https://maps.google.com/?q=Jagdalpur,Chhattisgarh"
  },
  {
    name: "Gurukul House - Raipur",
    location: "Raipur, Chhattisgarh",
    rating: 4.7,
    price: 5500,
    gender: "Co-ed",
    established: 2022,
    description: "Our newest addition in Raipur offers premium facilities for students pursuing higher education in the capital city of Chhattisgarh.",
    totalRemainingBeds: 0,
    capacity: 80,
    occupancy: 100,
    hostelType: "Premium",
    popular: true,
    comming_soon: true,
    images: [
      { imageUrl: "/room1.jpg" }
    ],
    features: [
      "High-speed WiFi",
      "AC Rooms",
      "Hot Water",
      "Laundry Service",
      "Mess & Dining",
      "Study Room",
      "Gym",
      "24/7 Security"
    ],
    usps: [
      "Located in IT hub",
      "Premium amenities",
      "Modern infrastructure"
    ],
    nearby1: "IIIT Raipur",
    nearby1distance: "3 km",
    nearby2: "AIIMS Raipur",
    nearby2distance: "5 km",
    nearby3: "Mall",
    nearby3distance: "2 km",
    locationLink: "https://maps.google.com/?q=Raipur,Chhattisgarh"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Hostel.deleteMany({});
    console.log('Cleared existing hostels');

    await Hostel.insertMany(seedData);
    console.log('Seed data inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
