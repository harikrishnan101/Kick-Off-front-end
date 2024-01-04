import React, { useEffect, useState } from 'react';
import CourtData from './CourtData';
import AxiosInstance from '../Configure/AxiosInstance';

function MyCourtComponents() {
    const [myCourtsData, setmyCourtsData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await AxiosInstance.get('/users/getMyCourtData');
    //             setmyCourtsData(response.data.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, []); // Pass an empty dependency array to trigger the effect only once
    useEffect(() => {
        try {
            AxiosInstance.get('/users/getMyCourtData').then((res) => {
                setmyCourtsData(res.data.data)
            })
                .catch((err) => {
                    console.log(err);
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
