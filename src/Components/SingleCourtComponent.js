import React, { useEffect, useState } from 'react';
import AxiosInstance from '../Configure/AxiosInstance';
import { useParams } from 'react-router-dom';
import { BASEURL } from '../Constant/baseUrl';
import '../Styles/SingleCourt.css';
import { Button } from 'react-bootstrap';

function SingleCourtComponent({setcourtData}) {
  const [singleCourt, setSingleCourt] = useState(null); // Initialize state with null or initial state value
  const { id } = useParams();
  console.log(id, 'log use params');

  useEffect(() => {
    try {
      AxiosInstance.get('/users/getSingleCourtData', { params: { courtId: id } })
        .then((res) => {
          setSingleCourt(res.data.data);
          setcourtData(res.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [id]); // Include 'id' in the dependency array to re-run effect when 'id' changes

  return (
    <div className='SingleCourt'>
      {singleCourt && (
        <>
          <img
            className='SingleCourtimage'
            src={`${BASEURL}/CourtsImg/${singleCourt.image}`}
            alt=''
          />
          <h3 className='court-name'>{singleCourt.name}</h3>
          <div className='booking-container'>
            {/* Centered Booking Button */}
            
          </div>
        </>
      )}
    </div>
  );
}

export default SingleCourtComponent;
