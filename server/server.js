const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 5000;

// Serve React static files
app.use(express.static('build'));

// CORS middleware
app.use(cors());

// Proxy HTTP requests to C# backend
app.use('/api', createProxyMiddleware({ target: 'http://web', changeOrigin: true }));

// Create a WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Proxy WebSocket connections to C# backend
wss.on('connection', function connection(ws) {
  const signalRProxy = new WebSocket('');
  
  signalRProxy.on('open', function open() {
    ws.on('message', function incoming(message) {
      signalRProxy.send(message);
    });

    signalRProxy.on('message', function incoming(data) {
      ws.send(data);
    });
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
