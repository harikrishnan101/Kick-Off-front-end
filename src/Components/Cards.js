import React from 'react';
import Card from 'react-bootstrap/Card';
import { BASEURL } from '../Constant/baseUrl';
import { useNavigate } from 'react-router-dom';

function Cards({ data }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} onClick={() => navigate(`/courtBooking/${data._id}`)}>
      {data.image && (
        <Card.Img
          variant="top"
          src={`${BASEURL}/Courts/${data.image}`} // Assuming the images are stored in the 'Courts' directory
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Title>{data.location}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Cards;
