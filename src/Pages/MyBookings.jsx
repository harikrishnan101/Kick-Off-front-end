import React, { useEffect } from 'react';
import AxiosInstance from '../Configure/AxiosInstance';
import Navbarmain from './NavbarMain';
import BookingCard from '../Components/BookingCard';

function MyBookings() {

  useEffect(() => {
    getMyBookings();
  }, []);

  const getMyBookings = () => {
    AxiosInstance.get('/users/getMyBookings')
      .then((resp) => {
        console.log('Response:', resp.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error.message);
        if (error.response) {
          console.error('Server responded with status code:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      });
  };

  return (
    <>
      <Navbarmain />
      <BookingCard/>
    </>
  );
}

export default MyBookings;
