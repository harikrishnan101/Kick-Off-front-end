import React from 'react';
import Card from 'react-bootstrap/Card';
import { BASEURL } from '../Constant/baseUrl';
import { useNavigate } from 'react-router-dom';

function Cards({ data }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} onClick={() => navigate(`/courtBooking/${data._id}`)}>
      <Card.Img
        variant="top"
        src={`${BASEURL}/CourtsImg/${data?.image}`}
        style={{ height: '200px', objectFit: 'cover' }}
        crossorigin="anonymous" // Add crossorigin attribute
      />
      <Card.Body>
        <Card.Title>{data?.name}</Card.Title>
        <Card.Text>{data?.location}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;
