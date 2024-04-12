import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { BASEURL } from '../Constant/baseUrl';
import { Navigate, useNavigate } from 'react-router-dom';

function CourtData({data}) {
 
  const navigate=useNavigate()
  const openCourt=() => {
    navigate(`/openCourtEdit/${data._id}`);
};
  return (
    <>
      <Card style={{ width:'18rem'}} onClick={()=>openCourt()}>
        <Card.Img
          variant="top"
          src={`${BASEURL}/CourtsImg/${data?.image}`}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title><b> Court Name :{data.name}</b></Card.Title>
          <Card.Text>
          <b> Location: {data.location}</b>
          </Card.Text>
          
        </Card.Body>
      </Card>

      
    </>
  );
}

export default CourtData;
