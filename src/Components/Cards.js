import React from 'react';
import Card from 'react-bootstrap/Card';
import { BASEURL } from '../Constant/baseUrl';
import { useNavigate } from 'react-router-dom';

function Cards({ data }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} onClick={() => navigate(`/courtBooking/${data._id}`)}>
      <img
        variant="top"
        src={`${BASEURL}/CourtsImg/${data?.image}`} // Assuming the images are stored in the 'CourtsImg' directory
        style={{ height: '200px', objectFit: 'cover', width: '100%' }} // Add width: '100%' to ensure the image fills the card width
        alt={data.name} // Provide an alt attribute for accessibility
      />
      <Card.Body>
        <Card.Title>{data?.name}</Card.Title>
        <Card.Text>{data?.location}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;
