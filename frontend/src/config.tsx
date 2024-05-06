import axios from 'axios';

// Define the base URL
const web_HostAddress = 'http://localhost:5064';

// Define the endpoint
const endpoint = '/messages/';

// Define the headers
const headers = {
  'Accept': 'application/json'
};

// Define the function to fetch messages
async function fetchMessages() {
  try {
    // Make the GET request
    const response = await axios.get(web_HostAddress + endpoint, { headers });

    // Handle the response
    console.log('Messages:', response.data);
    // Process the messages as needed
  } catch (error) {
    // Handle errors
    console.error('Error fetching messages:', error.message);
  }
}

// Call the function to fetch messages
fetchMessages();
