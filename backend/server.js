const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer'); // Required for multer error handling
const path = require('path');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const educationRoutes = require('./routes/educationRoutes');
const experienceRoutes=require('./routes/experienceRoutes');
const skillRoutes=require('./routes/skillRoutes');
const projectRoutes=require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const upload = require('./middlewares/upload');

dotenv.config();

const app = express();

// Configure CORS options
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000']; // Corrected
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle single file uploads (e.g., "image" or "resume")
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`, // Return relative path
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Handle multiple file uploads
app.post('/upload-multiple', upload.fields([{ name: 'image' }, { name: 'resume' }]), (req, res) => {
  try {
    res.status(200).json({
      message: 'Files uploaded successfully',
      files: {
        image: req.files.image ? `/uploads/${req.files.image[0].filename}` : null,
        resume: req.files.resume ? `/uploads/${req.files.resume[0].filename}` : null,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Global error handler for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Multer Error: ${err.message}` });
  }
  if (err) {
    console.error(err.stack);
    return res.status(400).json({ error: err.message });
  }
  next();
});

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.error('Error connecting to the database:', err));

// Synchronize models with the database
sequelize.sync({ alter: true }) // Updates schema without dropping tables
  .then(() => console.log('Models synchronized with the database.'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Server!</h1>');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contacts', contactRoutes);
app.use("/api/experiences", experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);


// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Server initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
