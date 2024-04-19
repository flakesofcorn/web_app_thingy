import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Row, Col } from 'react-bootstrap';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      console.log("qwe", response.data);
      localStorage.setItem("token", response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <Row>
        <Col>
          {/* Use the Link component to navigate to the registration form */}
          <Link to="/register">Register</Link>
        </Col>
      </Row>
    </form>
  );
};

export default LoginForm;
