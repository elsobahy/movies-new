import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import axios from 'axios';
import './login.css';

export default function Login({ saveUserData }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [validErrors, setValidErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",  
    password: ""
  });

  function getData(e) {
    let newData = { ...formData };
    newData[e.target.name] = e.target.value;
    setFormData(newData);
  }

  function handleLogin(e) {
    e.preventDefault();
    let checkErrors = handleValidation();
    
    if (checkErrors?.error) {
      setValidErrors(checkErrors.error.details);
    } else {
      axios.post('https://hawas.runasp.net/api/v1/Login', formData)
        .then((res) => {
            
          localStorage.setItem("my-token", res.data.jwt);
          saveUserData();
          setValidErrors([]);
          navigate('/home');
          setErrors("");
        })
        .catch((err) => {
          setErrors(err.response?.data?.message || "An error occurred");
          setValidErrors([]);
        });
    }
  }

  function handleValidation() {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    
    return schema.validate(formData, { abortEarly: false });
  }

  return (
    <div className='container w-75 text-start mx-auto mt-5'>
      <h3 className='text-center'>Login Now</h3>
      {errors && <h6 className='alert alert-danger'>{errors}</h6>}
      {validErrors.length > 0 && validErrors.map((error, index) => (
        <h6 key={index} className='alert alert-danger'>{error.message}</h6>
      ))}
      <form onSubmit={handleLogin}>
        <label htmlFor='email' className='form-label'>Email :</label>
        <input
          type='email'
          className='form-control mb-3'
          id='email'
          name="email"
          value={formData.email}
          onChange={getData} />
        
        <label htmlFor='password' className='form-label'>Password :</label>
        <input
          type='password'
          className='form-control mb-3'
          id='password'
          name="password"
          value={formData.password}
          onChange={getData} />
        
        <button type='submit' className='btn btn-info'>Login</button>
      </form>
    </div>
  );
}
