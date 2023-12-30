import React, { useState } from 'react';
import { Container, Card, Form, Button, Col } from 'react-bootstrap';
import Navbarmain from './NavbarMain';
import axios from 'axios';

function CourtReg() {
  const initialFormData = {
    name: '',
    location: '',
    cost: 0,
  };

  const [registerData, setRegisterData] = useState(initialFormData);
  const [courtpic, setCourtpic] = useState();
  const [formErrors, setFormErrors] = useState({});

  const imageUpload = (e) => {
    console.log(e.target.files[0]);
    setCourtpic({ file: e.target.files[0] });
  };




  const handleRegister = () => {
    const errors = {};

    if (!registerData.name) {
      errors.name = 'Court name is required';
    }

    if (!registerData.location) {
      errors.location = 'Location is required';
    }

    if (registerData.cost <= 0) {
      errors.cost = 'Charge must be greater than 0';
    }

    if (!registerData.about) {
      errors.about = 'About your court is required';
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
    }
    let fileData = new FormData()
    fileData.append('image', courtpic.file)

    axios.post('http://localhost:4000/users/CourtRegister', fileData, { params: registerData , Headers: {
      'content-type': 'multiple/form-data',
    },
  }).then((res) => {
          alert(res.data.message);
        })
        .catch((res) => {
          alert(res.data.message);
        });
    
  };

  return (
    <>
      <div><Navbarmain /></div>
      <Container className='d-flex justify-content-center'>
        <Card className='mt-4'>
          <Col md={12}>
            <Card.Body className='px-5'>
              <h4 className="text-uppercase text-center ">
                <b>Register Your Court</b>
              </h4>
              <Form>
                <Form.Group className='mb-4 mt-2'>
                  <Form.Label>Court Name</Form.Label>
                  <Form.Control
                    placeholder='Eg: Tenz'
                    size='ml'
                    type='text'
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                    className='border-dark'
                  />
                  {formErrors.name && (
                    <div className='text-danger'>{formErrors.name}</div>
                  )}
                </Form.Group>

                <Form.Group className='mb-4 mt-2'>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    placeholder='Eg: Trivandrum'
                    size='ml'
                    type='text'
                    value={registerData.location}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, location: e.target.value })
                    }
                    className='border-dark'
                  />
                  {formErrors.location && (
                    <div className='text-danger'>{formErrors.location}</div>
                  )}
                </Form.Group>

                <Form.Group className='mb-4 mt-2'>
                  <Form.Label>Charge</Form.Label>
                  <Form.Control
                    placeholder='Eg: 1000'
                    size='ml'
                    type='number'
                    value={registerData.cost}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, cost: e.target.value })
                    }
                    className='border-dark'
                  />
                  {formErrors.cost && (
                    <div className='text-danger'>{formErrors.cost}</div>
                  )}
                </Form.Group>

                <Form.Group className='mb-4 mt-2 border-dark'>
                  <Form.Label>Upload your court image</Form.Label>
                  <Form.Control
                    placeholder=''
                    size='ml'
                    type='file'
                    onChange={imageUpload}
                    className='border-dark'
                  />
                  <Button className='btn-primary mt-3 ' style={{ marginLeft: '110px' }} onClick={handleRegister}>
                    Register
                  </Button>
                </Form.Group>


              </Form>
            </Card.Body>
          </Col>
        </Card>
      </Container>
    </>
  );
}

export default CourtReg;
