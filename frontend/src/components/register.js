import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './loginPage';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const RegisterForm = ({ redirect }) => {
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
    admin: true
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error('registration failed:', error);
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
                name="UserName"
                placeholder="Username"
                value={formData.UserName}
                onChange={handleChange}
              />
              <Form.Control
                type="text"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
              />
              <Form.Control
                type="Password"
                name="Password"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm={4} className="d-none d-sm-block">
            <p></p>
          </Col>
          <hr className="w-100" />
          <Col sm={2} className="text-right">

            <Button variant='success' type='submit'>Register</Button>
          </Col>
          <Col sm={2} className="text-left">

            <Button variant='secondary' type='submit' onClick={redirect}>Login</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RegisterForm;
