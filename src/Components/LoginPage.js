import React, { useState } from 'react';


import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBContainer,
  MDBRow,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setuser } from '../Toolkit/userSlice';
import { useDispatch } from 'react-redux';




function LoginPage({ setShowLoginPage }) {
  const [login, setlogin] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(''); // State to store messages
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleLogin = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const emailValid = emailRegex.test(login.email);
    const passwordValid = passwordRegex.test(login.password);

    if (!emailValid || !passwordValid) {
      setMessage('Invalid email or password. Please check your input.');
      return;
    }

    try {
      const response = await axios.post('https://kick-off-api.onrender.com/auth/login', login);
      if (response?.data?.login) {
        localStorage.setItem('token', response?.data?.token);
        dispatch(setuser(response?.data?.user));
        navigate('/home');
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
       setMessage('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100 mt-3' > {/* Added mt-3 for margin-top */}
        <MDBCol col='1' >
          <MDBCard className='bg-dark text-white mx-auto' style={{ borderRadius: '6rem', maxWidth: '400px', maxHeight: '800px', marginTop: '100px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">KICK OFF
              </h2>

             
              <br></br>
              {message && <p className="text-danger">{message}</p>}
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Email'
                id='form3'
                type='email'
                onChange={(e) => setlogin({ ...login, email: e.target.value })}
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Password'
                id='form4'
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                onChange={(e) => setlogin({ ...login, password: e.target.value })}
              />
              <button
                className='btn btn-dark btn-sm'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>

              <button className='w-50 btn btn-dark' onClick={handleLogin} style={{ marginLeft: '10px' }}>LOGIN</button>
              <div>
                <p className="mb-0">Don't have an account? <a href="#" className="text-white-50 fw-bold" onClick={() => setShowLoginPage("signup")} style={{ color: "blue" }}>Sign Up</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginPage;