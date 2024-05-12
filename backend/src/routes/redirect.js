const express = require('express');
const router = express.Router();

// This would be replaced with a real database in production
const redirects = {};

// POST endpoint to create a new redirect
router.post('/create', (req, res) => {
  const { originalUrl, customSlug } = req.body;

  // Check if the customSlug already exists to prevent duplicates
  if (redirects.hasOwnProperty(customSlug)) {
    return res.status(409).json({ error: 'Custom slug already in use.' });
  }

  // Save the redirect
  redirects[customSlug] = originalUrl;

  // Respond with the full URL to the redirect
  res.status(201).json({ redirectUrl: `${req.protocol}://${req.get('host')}/${customSlug}` });
});

const predefinedUsername = '';
const predefinedPassword = '';

// POST endpoint to handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match the predefined values
  if (username === predefinedUsername && password === predefinedPassword) {
    // Authentication successful
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Authentication failed
    res.status(401).json({ error: 'Invalid username or password' });
  }
});


// GET endpoint to handle redirections
router.get('/:customSlug', (req, res) => {
  const { customSlug } = req.params;

  const originalUrl = redirects[customSlug];
  if (originalUrl) {
    // Redirect to the original URL
    res.redirect(originalUrl);
  } else {
    // If the slug isn't found, respond with a 404 error
    res.status(404).json({ error: 'Redirect not found.' });
  }
});

module.exports = router;
