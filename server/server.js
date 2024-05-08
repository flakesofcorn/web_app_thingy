const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const secretKey = 'your-secret-key';

app.use(bodyParser.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware for JWT verification
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Route to handle user registration
app.post('/register', async (req, res) => {
  const { username, email, password, admin } = req.body;
  
  // Hash and salt the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  // Insert user into the database
  const sql = 'INSERT INTO users (username, email, password_hash, admin) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, hashedPassword, admin], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('User registered successfully');
    res.json({ message: 'User registered successfully' });
  });
});

// Route to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from the database by username
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Error retrieving user from database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the hashed password with the provided password
    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Passwords match, generate JWT
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, secretKey);
    res.json({ message: 'Login successful', token: token });
  });
});

// Protected route example
app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
