import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Courtmodal from './Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import '../Styles/CourtTimeTable.css';
import { TIMINGS } from '../Constant/baseUrl'
import AxiosInstance from '../Configure/AxiosInstance';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner component

function Timetable({ data }) {
    const [openModal, setOpenModal] = useState(false);
    const [showDropDown, setshowDropDown] = useState(false);
    const { id } = useParams();
    const [minDate, setMinDate] = useState(new Date());
    const [minEndDate,setminEndDate]=useState();
    const [selectedTimings, setselectedTimings] = useState([]);
    const [filterTimings, setfilterTimings] = useState(TIMINGS);
    const [courtTiming, setcourtTiming] = useState({
        startDate: null,
        endDate: "",
        cost: ""
    });

    const [loading, setLoading] = useState(true); // State for loading indicator
    const [tableData, setTableData] = useState([]); // State to store table data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const latestUpdateDateResponse = await AxiosInstance.get('/users/getLatestUpdateDate', { params: { courtId: id } });
                const latestDate = new Date(latestUpdateDateResponse.data.minDate);
                latestDate.setDate(latestDate.getDate() + 1);
                setMinDate(latestDate.toISOString().split('T')[0]);

                const courtTimeDataResponse = await AxiosInstance.get('/users/getCourtTimeData', { params: { courtId: id } });
                setTableData(courtTimeDataResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false when data fetching is complete
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (courtTiming.startDate) {
            let newMin = new Date(courtTiming.startDate).toISOString().split('T')[0];
            setMinDate(newMin);
        } else {
            setminEndDate(minDate);
        }
    }, [courtTiming.startDate, minDate]);

    const addNewTime = (element, index) => {
        const check = selectedTimings.filter((timeObj) => timeObj.id === element.id);

        if (check.length > 0) {
            return;
        } else {
            setselectedTimings([...selectedTimings, element]);
        }

        const filteredData = filterTimings.filter((timeObj) => timeObj.id !== element.id);
        setfilterTimings(filteredData);
    };

    const addCourtTiming = async () => {
        setOpenModal(false);

        try {
            await AxiosInstance({
                method: 'post',
                url: '/users/addCourtTiming',
                data: {
                    date: courtTiming,
                    schedules: selectedTimings,
                    cost: courtTiming.cost,
                    courtId: id
                }
            });
            alert('Slot added Successfully');
        } catch (error) {
            setOpenModal(false);
            alert("Slot added failed");
        }
    };

    return (
        <div className='mx-lg-4 mx-md-3 mx-sm-2 mx-1 '>
            <div className='d-flex justify-content-between align-items-center mb-3 mt-4'>
                <div></div>
                <Button variant='primary' onClick={() => setOpenModal(true)}>Create Booking</Button>
            </div>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Table striped className='w-100'>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Date</th>
                            <th>Slots</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data, index) => (
                            <tr key={data._id}>
                                <td>{index + 1}</td>
                                <td>{data._id}</td>
                                {data?.slotsData?.map((element) => (
                                    <span className='bg-warning border-2 mx-2 rounded-1'>{element.slot.name}</span>
                                ))}
                               
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Courtmodal openModal={openModal} setOpenModal={setOpenModal}>
                <div className='d-flex flex-column add-court-timing-modal mt-5 text-center'>
                    <h4>
                        <div>{data?.name}</div>
                        <div>{data?.location}</div>
                    </h4>
                    <div className='mt-4'>
                        <label htmlFor='' className='me-5'>Starting Date</label>
                        <MDBInput wrapperClass='mb-1' type='date' min={minDate} onChange={(e) => setcourtTiming({ ...courtTiming, startDate: new Date(e.target.value) })} />
                        <label htmlFor='' className='me-5'>Ending Date</label>
                        <MDBInput wrapperClass='mb-4' type='date' size='' min={minEndDate} onChange={(e) => setcourtTiming({ ...courtTiming, endDate: new Date(e.target.value) })} />
                        <label htmlFor='' className='me-5'>Cost</label>
                        <MDBInput wrapperClass='mb-4' type='number' onChange={(e) => setcourtTiming({ ...courtTiming, cost: parseInt(e.target.value) })} />
                    </div>
                    <div className='mt-5'>
                        <div htmlFor='' className='me-5' onClick={() => setshowDropDown(true)}>Select Timing</div>
                        {showDropDown && (
                            <div className='cus-options' onMouseLeave={() => setshowDropDown(false)}>
                                <ul>
                                    {filterTimings.map((element, index) => (
                                        <li onClick={() => addNewTime(element, index)} key={element.id}>{element.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {selectedTimings.map((element) => (
                    <span className='border border-1 mx-2' key={element.id}>{element.name} </span>
                ))}
                <div className="text-center">
                    <button type="button" className="btn btn-primary mt-2" onClick={addCourtTiming}>Book</button>
                </div>
            </Courtmodal>
        </div>
    );
}

export default Timetable;
