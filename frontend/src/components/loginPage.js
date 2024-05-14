import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

const LoginForm = ({ redirect, changelogged }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      console.log("qwe", response.data.token);
      if (response.data.message === "Login successful") {
        localStorage.setItem("token", response.data.token);
        window.location.reload();
      }

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
        <button onClick={redirect}></button>
        </Col>
      </Row>
    </form>
  );
};

export default LoginForm;
