const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Doctor = require('./formModel'); 
 // Your schema file
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospitalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like images and HTML)
app.use('/imagess',express.static(path.join(__dirname,'imagess')));

// Route to serve your form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.send('Doctor information saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving doctor info');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});