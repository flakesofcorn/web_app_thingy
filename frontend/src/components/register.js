import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './loginPage';
import { Link } from 'react-router-dom';

const RegisterForm = ({ login }) => {
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
    admin: false
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
        value={formData.UserName}
        onChange={handleChange}
      />
      <input
        type="Email"
        name="Email"
        placeholder="Email"
        value={formData.Email}
        onChange={handleChange}
      />
      <input
        type="Password"
        name="Password"
        placeholder="Password"
        value={formData.Password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
      {/* <Link to=""><button>
        Login
      </button>
      </Link> */}
    </form>
  );
};

export default RegisterForm;
