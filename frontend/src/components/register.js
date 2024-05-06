import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './loginPage';
import { Link } from 'react-router-dom';

const RegisterForm = ({ login }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', { formData });
      console.log(response.data); // Assuming the response contains authentication token or status
    } catch (error) {
      console.error('registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
      <Link to="/login.js"><button>
        Login
      </button>
      </Link>
    </form>
  );
};

export default RegisterForm;
