import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import axios from 'axios';
import './register.css';

export default function Register() {
     const navigate = useNavigate();
     const [errors, setErrors] = useState("");
     const [validErrors, setValidErrors] = useState([]);
     const [formData, setFormData] = useState({
        userName: "",          
        dateOfBirth: "",            
        email: "",  
        password: "",
        rePassword: ""
    });

    function getData(e) {
        let newData = { ...formData };
        newData[e.target.name] = e.target.value;
        setFormData(newData);
    }

    function handleRegister(e) {
        e.preventDefault();
        let checkErrors = handleValidation();
        if (checkErrors?.error) {
          setValidErrors(checkErrors.error.details);
        } else {
          axios.post('https://hawas.runasp.net/api/v1/Register', formData)
          .then((res) => {
              setValidErrors([]);
              navigate('/login');
          })
          .catch((err) => {
              setErrors(err.response?.data?.message || 'Registration failed.');
              setValidErrors([]);
          });
        }
    }

   function handleValidation() {
      let schema = Joi.object({
          userName: Joi.string().alphanum().min(3).max(30).required(),
          dateOfBirth: Joi.string().isoDate().required(),
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
          password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
          rePassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password')
            .messages({ 'any.only': '{{#label}} does not match' })
      });

      return schema.validate(formData, { abortEarly: false });
  }

    return (
        <div className='container w-75 text-start mx-auto mt-5'>
            <h3 className='text-center'>Register Now</h3>
            {errors && <h6 className='alert alert-danger'>{errors}</h6>}
            {validErrors.length > 0 && validErrors.map((error, index) => (
                <h6 key={index} className='alert alert-danger'>{error.message}</h6>
            ))}
            <form onSubmit={handleRegister}>
                <label htmlFor='userName' className='form-label'>Username :</label>
                <input
                    type='text'
                    className='form-control mb-3'
                    id='userName'
                    name="userName"
                    onChange={getData} />
                
                <label htmlFor='dateOfBirth' className='form-label'>Date of Birth :</label>
                <input
                    type='date'
                    className='form-control mb-3'
                    id='dateOfBirth'
                    name="dateOfBirth"
                    onChange={getData} />
                
                <label htmlFor='email' className='form-label'>Email :</label>
                <input
                    type='email'
                    className='form-control mb-3'
                    id='email'
                    name="email"
                    onChange={getData} />
                
                <label htmlFor='password' className='form-label'>Password :</label>
                <input
                    type='password'
                    className='form-control mb-3'
                    id='password'
                    name="password"
                    onChange={getData} />
                
                <label htmlFor='rePassword' className='form-label'>Confirm Password :</label>
                <input
                    type='password'
                    className='form-control mb-3'
                    id='rePassword'
                    name="rePassword"
                    onChange={getData} />
                
                <button type='submit' className='btn btn-info'>Register</button>
            </form>
        </div>
    );
}
