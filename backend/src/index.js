const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redirectRoutes = require('./routes/redirect');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes and origins
app.use(cors({
    origin: 'http://localhost:5173', // Update this to match your Vite server's origin
    methods: ['GET', 'POST'],
  }));

// Use the redirect routes
app.use('/', redirectRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
