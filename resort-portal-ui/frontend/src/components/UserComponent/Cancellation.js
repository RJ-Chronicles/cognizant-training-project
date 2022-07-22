import React, { useState } from 'react';
import 'mdbreact/dist/css/mdb.css';
import '../../Assets/css/Cancellation.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import BookingService from '../../Services/BookingService';
import { useLocation } from 'react-router-dom'
import pan from '../../Assets/images/pan.jpg'
// import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Cancellation() {
    const location = useLocation();
    const { from } = location.state;
    console.log(from.id)
    console.log("cancellation page")
   
    const navigate = useNavigate()
    const [isDisabled, setIsDisabled] = useState(true);
    const [checked, setChecked] = useState(false);
    const dataSubmit = () => {
        return checked ? setIsDisabled(true) : setIsDisabled(false);
    };

    const onCheckboxClick = () => {
        setChecked(!checked);
        return dataSubmit();
    };
    const deleteBooking = () => {
        console.log("Booking deleted")
        console.log(from.id)
        BookingService.deleteBooking(from.id).then(res => {
            console.log(res.data)
        })
        alert("Booking has been Cancelled!")
        navigate('/guest-dashboard/user-booking-list');
    }
    return (
        <div>
            <div className='row foi'>
                <div className='container'>
                    <form >
                        <div className='border paddtbx border-black' style={{ backgroundColor: 'aliceblue' }}>
                            <div className='cancel mt-3'>
                                <div className='col-md-6'>
                                    <h3 className='hodo'>Cancellation Policy</h3>
                                    <p >Cancellation charges are computed on per seat basis.</p>
                                    <p>Note that cancellation charges mentioned above are excluding GST.</p>
                                    <p className='mt-2 mb-3'>Your current charges according to the cancellation policy is highlighted below:</p>
                                </div>

                                <div className='border paddtb border-black d-flex flex-row' style={{ backgroundColor: 'white' }}>
                                    <div className='col-md-6'>

                                        <MDBTable>
                                            <MDBTableHead color="primary-color" textWhite >
                                                <tr >
                                                    <th className='centeraligntext'>Cancellation time</th>
                                                    <th className='centeraligntext'>Cancellation Charges</th>

                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody >
                                                <tr>
                                                    <td className='centeraligntext'>5 days before CheckIn date</td>
                                                    <td className='centeraligntext'>10%</td>

                                                </tr>
                                                <tr>
                                                    <td className='centeraligntext'>3 days before CheckIn date</td>
                                                    <td className='centeraligntext'>15% </td>

                                                </tr>
                                                <tr>
                                                    <td className='centeraligntext'>1 day before CheckIn date</td>
                                                    <td className='centeraligntext'>50%</td>

                                                </tr>
                                                <tr>
                                                    <td className='centeraligntext'>On CheckIn date</td>
                                                    <td className='centeraligntext'>90%</td>

                                                </tr>


                                            </MDBTableBody>
                                        </MDBTable>
                                        <div className="col-md-12 mt-3 d-flex flex-row">
                                            <div className="col-md-2 centeraligntext">
                                                <input type="checkbox" style={{ marginRight: '-8px' }} onClick={onCheckboxClick} className="form-check-input mt-3 " />
                                            </div>
                                            <div className="col-md-4 centeraligntext" style={{ marginLeft: '-32px', marginRight: '88px' }}>
                                                <span className="lead mt-4 ">Click to Continue</span>
                                            </div>
                                            <div className="col-md-4 centeraligntext">
                                                <button type="submit" onClick={deleteBooking} disabled={isDisabled} style={{ marginBottom: '14px' }} className="btn btn-primary btn-lg ">
                                                    Delete
                                                </button>
                                            </div>


                                        </div>

                                    </div>
                                    <div className='col-md-6'>
                                        <img src={pan} alt="pan" style={{ height: '334px', width: '520px' }} className="imgo" />
                                    </div>

                                </div>

                            </div>

                        </div>


                    </form>
                </div>

            </div>
        </div>
    )

}