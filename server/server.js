const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const corsOptions = {
  origin: '*',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
}
app.use(cors(corsOptions))

// Route to handle login
app.post('/login', async (req, res) => {
  console.log("hello \n \n \n \n \n \n");
  try {
    // Assuming you have some logic here to validate the user credentials
    const { username, password } = req.body;

    // Send the data to C# controller
    const cSharpResponse = await axios.post('http://localhost:5173/web/auth/login', { username, password });
    console.log("hello");
    
    // Forward the response from C# controller to the client
    res.json(cSharpResponse.data);
  } catch (error) {
    console.error('Error sending login request to C# controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//route to handle registration
app.post('/register', async (req, res) => {
  try {
    // Assuming you have some logic here to validate the user credentials
    const { username, email, password } = req.body.formData;

    // Send the data to C# controller
    const cSharpResponse = await axios.post('http://localhost:5173/web/auth/Register', { username, password, email });
    
    // Forward the response from C# controller to the client
    res.json(cSharpResponse.data);
  } catch (error) {
    console.error('Error sending registration request to C# controller:', error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

app.post('/validate-token', async (req, res) => {
  try {
    // Assuming you have some logic here to validate the user credentials
    const { token } = req.body;

    // Send the data to C# controller
    const cSharpResponse = await axios.post('http://localhost:5173/web/auth/verify', { token });
    
    // Forward the response from C# controller to the client
    res.json(cSharpResponse.data);
  } catch (error) {
    console.error('Error sending registration request to C# controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
