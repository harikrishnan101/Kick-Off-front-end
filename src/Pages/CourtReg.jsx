import React, { useState } from 'react';
import { Container, Card, Form, Button, Col } from 'react-bootstrap';
import Navbarmain from './NavbarMain';
import axios from 'axios';
import AxiosInstance from '../Configure/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function CourtReg() {
  const initialFormData = {
    name: '',
    location: '',
    userId: '',
  };

  const [registerData, setRegisterData] = useState(initialFormData);
  const [courtpic, setCourtpic] = useState();
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const imageUpload = (e) => {
    console.log(e.target.files[0]);
    setCourtpic({ file: e.target.files[0] });
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        // Alphanumeric and space validation
        errorMessage = /^[A-Za-z\s]+$/.test(value) ? '' : 'Invalid Court Name';
        break;
      case 'location':
        // Alphanumeric and space validation
        errorMessage = /^[A-Za-z\s]+$/.test(value) ? '' : 'Invalid Location';
        break;
      case 'cost':
        // Numeric validation
        errorMessage = /^\d+$/.test(value) ? '' : 'Invalid Cost';
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors, [fieldName]: errorMessage });
  };

  const handleChange = (fieldName, value) => {
    setRegisterData({ ...registerData, [fieldName]: value });
    validateField(fieldName, value);
  };

  const handleRegister = () => {
    const errors = {};

    // Required field validation
    if (!registerData.name) {
      errors.name = 'Court name is required';
    }

    if (!registerData.location) {
      errors.location = 'Location is required';
    }

    if (registerData.cost <= 0) {
      errors.cost = 'Charge must be greater than 0';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Save data (You can implement the logic here to save the data)

      // Reset form fields to initial values
      setRegisterData(initialFormData);
      setCourtpic(null);
      setFormErrors({});

      // Show success alert
      alert('Success');
      navigate('/MyCourts');

      // Image upload logic
      if (courtpic) {
        let fileData = new FormData();
        fileData.append('image', courtpic.file);

        AxiosInstance.post('/users/CourtRegister', fileData, { params: registerData }, {
          headers: {
            'content-type': 'multiple/form-data',
          },
        })
          .then((res) => {
            alert(res.data.message);
          })
          .catch((res) => {
            alert(res.data.message);
          });
      }
    }
  };

  return (
    <>
      <div>
        <Navbarmain />
      </div>
      <Container className='d-flex justify-content-center'>
        <Card className='mt-4'>
          <Col md={12}>
            <Card.Body className='px-5'>
              <h4 className="text-uppercase text-center ">
                <b>Register Your Court</b>
              </h4>
              <Form>
                {/* ... Your existing Form.Group components ... */}

                {/* Court Name */}
                <Form.Group className='mb-4 mt-2'>
                  <Form.Label>Court Name</Form.Label>
                  <Form.Control
                    placeholder='Eg: Tenz'
                    size='ml'
                    type='text'
                    value={registerData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className='border-dark'
                  />
                  {formErrors.name && (
                    <div className='text-danger'>{formErrors.name}</div>
                  )}
                </Form.Group>

                {/* Location */}
                <Form.Group className='mb-4 mt-2'>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    placeholder='Eg: Trivandrum'
                    size='ml'
                    type='text'
                    value={registerData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className='border-dark'
                  />
                  {formErrors.location && (
                    <div className='text-danger'>{formErrors.location}</div>
                  )}
                </Form.Group>

                {/* Charge */}    
                

                {/* ... Your existing Form.Group for image upload ... */}
                <Form.Group className='mb-4 mt-2 border-dark'>
                  <Form.Label>Upload your court image</Form.Label>
                  <Form.Control
                    placeholder=''
                    size='ml'
                    type='file'
                    onChange={imageUpload}
                    className='border-dark'
                  />
                  {courtpic && (
                    <div className='text-success mt-2'>
                      Image uploaded: {courtpic.file.name}
                    </div>
                  )}
                </Form.Group>

                {/* Register Button */}
                <Form.Group className='mb-4 mt-2 border-dark'>
                  <Button
                    className='btn-primary mt-3'
                    style={{ marginLeft: '110px' }}
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Col>
        </Card>
      </Container>
      <Footer/>
    </>
  );
}

export default CourtReg;
