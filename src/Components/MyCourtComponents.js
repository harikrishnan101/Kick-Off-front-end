import React, { useEffect, useState } from 'react';
import CourtData from './CourtData';
import AxiosInstance from '../Configure/AxiosInstance';

function MyCourtComponents() {
    const [myCourtsData, setmyCourtsData] = useState([]);

  
    useEffect(() => {
        try {
            AxiosInstance.get('/users/getMyCourtData').then((res) => {
                setmyCourtsData(res.data.data)
            })
                .catch((err) => {
                    
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className='row d-flex justify-content-center gap-4'>
            {myCourtsData.map(court => (
                <CourtData key={court.id} data={court} />
            ))}
        </div>
    );
}

export default MyCourtComponents;
