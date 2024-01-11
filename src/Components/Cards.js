import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BASEURL } from '../Constant/baseUrl';
import { useNavigate } from 'react-router-dom';

function Cards({data}) {
  
  const navigate=useNavigate()
  return (
    <Card style={{ width: '18rem' }} onClick={() => navigate(`/courtBooking/${data._id}`)} >
      <Card.Img variant="top" src={`${BASEURL}/venderCourts/${data?.image}`}   style={{ height: '200px', objectFit: 'cover' }}  />
      <Card.Body>
        <Card.Title>{data?.name}</Card.Title>
        <Card.Title>{data?.location}</Card.Title>
        
      </Card.Body>
    </Card>
  );
}

export default Cards;