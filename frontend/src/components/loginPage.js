import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

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
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="px-5 py-5">
          <Col sm={12}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </Form.Group>
          </Col>
          <Col sm={4} className="d-none d-sm-block">
            <p></p>
          </Col>
          <hr className="w-100" />
          <Col sm={2} className="text-right">

            <Button variant='success' type='submit'>Login</Button>
          </Col>
          <Col sm={2} className="text-left">

            <Button variant='secondary' type='submit' onClick={redirect}>Register</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LoginForm;
