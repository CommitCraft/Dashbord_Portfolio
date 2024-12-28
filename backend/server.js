const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const aboutRoutes =require('./routes/aboutRoutes');
const contactRoutes=require('./routes/contactRoutes');
const path = require('path');
dotenv.config();

const app = express();
// Configure CORS options
const corsOptions = {
  origin: "*", // Allow all origins
  credentials: true, // Allow credentials (cookies)
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads')); // Serve static files for resumes
// Serve static files for uploaded images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.error('Error connecting to the database:', err));

sequelize.sync({ force: false })
  .then(() => console.log('Models synchronized with the database.'));

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Server!</h1>');
});

app.use('/api/auth', authRoutes);// Use auth routes


// Routes
app.use('/api/about', aboutRoutes);

app.use('/api/contacts', contactRoutes);// Use contactRoutes routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));