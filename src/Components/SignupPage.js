import React, { useEffect, useState } from 'react';
import {  MDBCard, MDBCardBody, MDBInput, MDBContainer } from 'mdb-react-ui-kit';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupPage({ setShowLoginPage }) {
  const [login, setlogin] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    ConfirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    ConfirmPassword: '',
  });

  useEffect(() => {
    
  }, [login]);

  const validateForm = () => {
    let valid = true;
    const nameRegex = /^[A-Za-z\s]+$/; // Allow only alphabets and spaces for names
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const newErrors = { ...errors };

    if (!login.firstname.match(nameRegex)) {
      newErrors.firstname = 'Invalid first name';
      valid = false;
    } else {
      newErrors.firstname = '';
    }

    if (!login.lastname.match(nameRegex)) {
      newErrors.lastname = 'Invalid last name';
      valid = false;
    } else {
      newErrors.lastname = '';
    }

    if (!login.email.match(emailRegex)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    } else {
      newErrors.email = '';
    }

    if (!login.password.match(passwordRegex)) {
      newErrors.password = 'Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 6 characters long';
      valid = false;
    } else {
      newErrors.password = '';
    }

    if (login.ConfirmPassword !== login.password) {
      newErrors.ConfirmPassword = 'Passwords do not match';
      valid = false;
    } else {
      newErrors.ConfirmPassword = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const handlesignup = () => {
    if (validateForm()) {
      axios.post('http://localhost:4000/auth/register', login)
        .then((response) => {
          if (response.data.signUp) {
            alert('Sign up successful');
            setShowLoginPage('login');
          } else {
            toast.fail('Sign up failed');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            alert('This email is already registered');
          } else {
            console.error('Sign up failed:', error);
            alert('An error occurred during sign up');
          }
        });
    }
  };
  
  

  return (
    <MDBContainer fluid>
      
        
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '6rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-4 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Kick Off</h2>
              <p className="text-white-50 mb-5">Sign Up It's quick and easy.</p>
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                labelClass='text-white'
                label='First name'
                id='firstname'
                type='text'
                value={login.firstname}
                onChange={(e) => setlogin({ ...login, firstname: e.target.value })}
              />
              {errors.firstname && <span className="text-danger">{errors.firstname}</span>}
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                labelClass='text-white'
                label='Last name'
                id='lastname'
                type='text'
                value={login.lastname}
                onChange={(e) => setlogin({ ...login, lastname: e.target.value })}
              />
              {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                labelClass='text-white'
                label='Email'
                id='email'
                type='email'
                value={login.email}
                onChange={(e) => setlogin({ ...login, email: e.target.value })}
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                labelClass='text-white'
                label='Password'
                id='Password'
                type='password'
                value={login.password}
                onChange={(e) => setlogin({ ...login, password: e.target.value })}
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                labelClass='text-white'
                label='Confirm Password'
                id='Password2'
                type='password'
                value={login.ConfirmPassword}
                onChange={(e) => setlogin({ ...login, ConfirmPassword: e.target.value })}
              />
              {errors.ConfirmPassword && <span className="text-danger">{errors.ConfirmPassword}</span>}
              <button className='w-50 btn btn-dark' onClick={handlesignup} style={{ marginLeft: '10px' }}>Sign Up</button>
              <div>
                <p className="mb-0">Have an account? <a href="#" className="text-white-50 fw-bold" onClick={() => setShowLoginPage('login')} style={{ color: "blue" }}>Log in</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
       
      
    </MDBContainer>
  );
}

export default SignupPage;