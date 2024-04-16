const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Route to handle login
app.post('/login', async (req, res) => {
  try {
    // Assuming you have some logic here to validate the user credentials
    const { username, password } = req.body;

    // Send the data to C# controller
    const cSharpResponse = await axios.post('http://localhost:5173/web/auth/login', { username, password });
    
    // Forward the response from C# controller to the client
    res.json(cSharpResponse.data);
  } catch (error) {
    console.error('Error sending login request to C# controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
