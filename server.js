const express = require('express');
const app = express();

// Define port
const port = 3000;

// Define endpoint for handling POST requests
app.post('/v1/chat/completions', async (req, res) => {
  try {
    const formattedQuestions = await makeRequest(); // Call your makeRequest function here
    res.json(formattedQuestions); // Send the formattedQuestions as JSON response
  } catch (error) {
    console.error('An error occurred while processing the request:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
