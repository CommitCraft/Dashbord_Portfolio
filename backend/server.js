const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bioRoutes = require('./routes/bioRoutes');
const errorHandler = require('./middlewares/errorHandler');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require("./routes/experienceRoutes");
const educationRoutes = require("./routes/educationRoutes");
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes=require('./routes/contactRoutes');
const path = require('path');
dotenv.config();

const app = express();
// Configure CORS options
const corsOptions = {
  origin: ["*","http://localhost:5173/","http://localhost:3002/"], // Allow all origins
  credentials: true, // Allow credentials (cookies)
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
// app.use('/uploads', express.static('uploads')); // Serve static files for resumes
// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.error('Error connecting to the database:', err));

sequelize.sync({ force: false })
  .then(() => console.log('Models synchronized with the database.'));

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Server!</h1>');
});

app.use('/api/auth', authRoutes);// Use auth routes
app.use('/api/profile', profileRoutes);// Use profile routes
app.use('/api/bio', bioRoutes);// Use bio routes
app.use('/api/skills', skillRoutes);// Use skills routes
app.use("/api/experiences", experienceRoutes);// Use experiences routes
app.use("/api/education", educationRoutes);// Use education routes
app.use('/api/projects', projectRoutes);// Use projects routes
app.use('/api/contacts', contactRoutes);// Use contactRoutes routes

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));