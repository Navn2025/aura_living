const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const multer=require('multer');
const {v2: cloudinary}=require('cloudinary');
const Admin=require('../models/admin.model');
const Hostel=require('../models/hostel.model');
const Contact=require('../models/contact.model');

const JWT_SECRET=process.env.JWT_SECRET||'gurukul_secret_key_2024';

/* ── Cloudinary config ── */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ── Multer — in-memory storage (no disk writes) ── */
const upload=multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 10*1024*1024}, // 10 MB max per file
  fileFilter: (req, file, cb) =>
  {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

/* ── Auth Middleware ── */
const authMiddleware=(req, res, next) =>
{
  const token=req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({message: 'No token provided'});
  try
  {
    const decoded=jwt.verify(token, JWT_SECRET);
    req.adminId=decoded.id;
    next();
  } catch (error)
  {
    return res.status(401).json({message: 'Invalid token'});
  }
};

/* ── Upload image to Cloudinary ── */
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) =>
{
  try
  {
    if (!req.file) return res.status(400).json({message: 'No file provided'});

    const result=await new Promise((resolve, reject) =>
    {
      const stream=cloudinary.uploader.upload_stream(
        {folder: 'auraliving/hostels', resource_type: 'image'},
        (error, result) => {if (error) reject(error); else resolve(result);}
      );
      stream.end(req.file.buffer);
    });

    res.json({url: result.secure_url, public_id: result.public_id});
  } catch (error)
  {
    res.status(500).json({message: error.message});
  }
});

/* ── Auth ── */
router.post('/login', async (req, res) =>
{
  try
  {
    const {username, password}=req.body;
    const admin=await Admin.findOne({username, password});
    if (!admin) return res.status(401).json({message: 'Invalid credentials'});
    const token=jwt.sign({id: admin._id}, JWT_SECRET, {expiresIn: '24h'});
    res.json({token, message: 'Login successful'});
  } catch (error)
  {
    res.status(500).json({message: error.message});
  }
});

/* ── Hostels CRUD ── */
router.get('/hostels', authMiddleware, async (req, res) =>
{
  try
  {
    const hostels=await Hostel.find();
    res.json(hostels);
  } catch (error)
  {
    res.status(500).json({message: error.message});
  }
});

router.get('/hostels/:id', authMiddleware, async (req, res) =>
{
  try
  {
    const hostel=await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({message: 'Hostel not found'});
    res.json(hostel);
  } catch (error)
  {
    res.status(500).json({message: error.message});
  }
});

router.post('/hostels', authMiddleware, async (req, res) =>
{
  try
  {
    const hostel=new Hostel(req.body);
    await hostel.save();
    res.status(201).json(hostel);
  } catch (error)
  {
    res.status(400).json({message: error.message});
  }
});

router.put('/hostels/:id', authMiddleware, async (req, res) =>
{
  try
  {
    const hostel=await Hostel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!hostel) return res.status(404).json({message: 'Hostel not found'});
    res.json(hostel);
  } catch (error)
  {
    res.status(400).json({message: error.message});
  }
});

router.delete('/hostels/:id', authMiddleware, async (req, res) =>
{
  try
  {
    const hostel=await Hostel.findByIdAndDelete(req.params.id);
    if (!hostel) return res.status(404).json({message: 'Hostel not found'});
    res.json({message: 'Hostel deleted successfully'});
  } catch (error)
  {
    res.status(500).json({message: error.message});
  }
});

/* ── Contacts ── */
router.get('/contacts', authMiddleware, async (req, res) =>
{
  try
  {
    const contacts=await Contact.find().sort({createdAt: -1});
    res.json(contacts);
  } catch (error)
  {
    res.status(500).json({message: error.message});
  }
});

router.delete('/contacts/:id', authMiddleware, async (req, res) =>
{
  try
  {
    const contact=await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({message: 'Contact not found'});
    res.json({message: 'Contact deleted successfully'});
  } catch (error)
  {
    res.status(500).json({message: error.message});
  }
});

module.exports=router;
