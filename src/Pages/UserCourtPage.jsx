import React, { useEffect, useState } from 'react';
import Navbarmain from './NavbarMain';
import SingleCourtComponent from '../Components/SingleCourtComponent';
import AxiosInstance from '../Configure/AxiosInstance';
import { useParams } from 'react-router-dom';
import TimeSlot from './TimeSlot';

function UserCourtPage() {
  const { id } = useParams();
  const [courtData, setCourtData] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); 
  const [timeSchedules, setTimeSchedules] = useState([]);

  const getSlotData = () => {
    let currentHour =
      new Date().toISOString().split("T")[0] === selectedDate
        ? new Date().getHours()
        : -1;
    AxiosInstance.get('/users/getslotData', {
      params: {
        date: selectedDate,
        courtId: id,
        currentHour: currentHour
      }
    }).then((resp) => {
      
      
      setTimeSchedules(resp.data); 
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  useEffect(() => {
    getSlotData();
  }, [selectedDate, id]);

  return (
    <>
      <div>
        <Navbarmain />
        <SingleCourtComponent setcourtData={setCourtData} />
        <label >Select the date</label>
        <input
          type='date'
          min={new Date().toISOString().split('T')[0]}
          value={selectedDate}
          className='rounded'
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className='btn btn-primary' onClick={getSlotData}>OK</button>
      </div>

      <div className='d-flex flex-wrap gap-5 p-1 justify-content-center mt-3'>
        {timeSchedules?.map((slot) => (
          <TimeSlot key={slot.id} slot={slot} />
        ))}
        {/* <TimeSlot slot={{name:"1am - 2am"}}/> */}
      </div>
    </>
  );
}

export default UserCourtPage;
