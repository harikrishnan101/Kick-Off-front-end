import React, { useEffect, useState } from 'react';
import Navbarmain from './NavbarMain';
import SingleCourtComponent from '../Components/SingleCourtComponent';
import Timetable from '../Components/Timetable';


function SingleCourtPage({}) {
  
  const [courtData,setcourtData]=useState()

  return (
    <>
      <div>
        
        <Navbarmain />
        <SingleCourtComponent setcourtData={setcourtData}/>
        <Timetable data={courtData}/>
       
      </div>
    </>
  );
}

export default SingleCourtPage;
