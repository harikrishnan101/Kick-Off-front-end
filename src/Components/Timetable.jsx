import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Courtmodal from './Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import '../Styles/CourtTimeTable.css';
import { TIMINGS } from '../Constant/baseUrl'

function Timetable({ data }) {
    const [openModal, setOpenModal] = useState(false);
    const [showDropDown, setshowDropDown] = useState(false);
    const [minDate, setMinDate] = useState(new Date());

    const addCourtTiming = () => {
        setOpenModal(false);
        // Implement your functionality for adding court timing
        // This could include API calls or state updates
    };

    return (
        <div className='mx-lg-4 mx-md-3 mx-sm-2 mx-1'>
            <div className='d-flex justify-content-between align-items-center mb-3 mt-4'>
                <div></div>
                <Button variant='primary' onClick={() => setOpenModal(true)}>Create Booking</Button>
            </div>
            <Table striped className='w-100'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
            <Courtmodal openModal={openModal} setOpenModal={setOpenModal}>
                <div className='d-flex flex-column add-court-timing-modal mt-5 text-center'>
                    <h4>
                        <div>{data?.name}</div>
                        <div>{data?.location}</div>
                    </h4>
                    <div className='mt-4'>
                        <label htmlFor='' className='me-5'>Starting Date</label>
                        <MDBInput wrapperClass='mb-1' type='date' min={minDate} />
                        <label htmlFor='' className='me-5'>Ending Date</label>
                        <MDBInput wrapperClass='mb-4' type='date' size='' />
                        <label htmlFor='' className='me-5'>Cost</label>
                        <MDBInput wrapperClass='mb-4' type='number' />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='' className='me-5' onClick={() => setshowDropDown(true)}>Select Timing</label>
                        {showDropDown && (
                            <div className='cus-options' onMouseLeave={() => setshowDropDown(false)}>
                                <ul>
                                    {Object.keys(TIMINGS).map((element) => (
                                        <li key={element}>{TIMINGS[element].name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary mt-2" onClick={addCourtTiming}>
                        Primary
                    </button>
                </div>
            </Courtmodal>
        </div>
    );
}

export default Timetable;
