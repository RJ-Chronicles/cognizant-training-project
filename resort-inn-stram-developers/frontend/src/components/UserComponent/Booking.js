import React, { useState, useEffect } from "react";
// import "../../Assets/css/Rooms1.css";
import { useNavigate } from "react-router-dom";
import BookingService from "../../Services/BookingService";
// import banner1 from "../../Assets/images/banner1.jpg"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LoginService from "../../Services/LoginService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Booking() {

    const [checkInError, setCheckInError] = useState('');
    const [checkOutError, setCheckOutError] = useState('');
    const [roomIdError, setRoomIdError] = useState('');
    const [currentRoom, setCurrentRoom] = useState()
    const [addressError, setAddressError] = useState('');
    const [roomData, setRoomData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        // window.location.reload(reload)
        // reload=false;
        fetch("http://localhost:8080/api/v1/rooms/roomId")
            .then(response => response.json())

            .then(data => setRoomData(data))
        // console.log(roomData[0].id + "roomid")

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        console.log(formData.get('checkIn'));
        fetch("http://localhost:8080/api/v1/booking/" + LoginService.getUserId() + "/booking", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                checkIn: formData.get('checkIn'),
                checkOut: formData.get('checkOut'),

                roomId: formData.get('roomId'),
                address: formData.get('address'),

            }),
        })
            .then((response) => {
                if (response.ok) {
                    toast("Booking Saved!", {
                        position: "bottom-center"
                    })
                    return response.json()

                }
                else {
                    console.log("inside the else part")

                    return response.json()
                }

            })

            .then((data) => {
                console.log(data);
                if (data.bookingId && data.amount) {
                    const id = data.bookingId;
                    const amount = data.amount;
                    localStorage.setItem("BookingId", id)
                    localStorage.setItem("transactionAmount", amount)
                    console.log("BookingId  " + id);
                    navigate('/guest-dashboard/payment');

                }

                if (data.fieldErrors) {
                    console.log(data.fieldErrors)
                    data.fieldErrors.forEach(fieldError => {
                        if (fieldError.field === 'checkIn') {
                            setCheckInError(fieldError.message);
                        }

                        if (fieldError.field === 'checkOut') {
                            setCheckOutError(fieldError.message);
                        }

                        if (fieldError.field === 'roomId') {
                            setRoomIdError(fieldError.message);
                        }

                        if (fieldError.field === 'address') {
                            setAddressError(fieldError.message);
                        }

                    });
                }
                else {
                    toast("Booking Exist for given date", {
                        position: "bottom-center"
                    })
                }
            })
            .catch((err) => err);
    }

    const onCheckInFocus = (e) => {
        e.preventDefault();
        setCheckInError('');
    }

    const onCheckOutFocus = (e) => {
        e.preventDefault();
        setCheckOutError('');
    }
    // const onRoomIdFocus = (e) => {
    //     e.preventDefault();
    //     setRoomIdError('');
    // }

    const onAddressFocus = (e) => {
        e.preventDefault();
        setAddressError('');
    }


    return (
        <div>

            <div id="booking" className="section " style={{ marginTop: "100px" }}>

                <h2 className="text-center mt-3" style={{ color: "red", fontWeight: "normal" }}>Make your reservation</h2>
            </div>

            <div className="row">
                <div className="col-md-3"></div>

                <div className="col-md-6 mt-1 mb-3 shadow p-3 mb-5 bg-white rounded">

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>CheckIn</Form.Label>
                            <Form.Control placeholder="Enter CheckIn date" type="date" name="checkIn" onFocus={onCheckInFocus} />
                            {
                                checkInError ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{checkInError}</span> : ''
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>CheckOut</Form.Label>

                            <Form.Control placeholder="Enter CheckOut date" type="date" name="checkOut" onFocus={onCheckOutFocus} />
                            {
                                checkOutError ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{checkOutError}</span> : ''
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>RoomId</Form.Label>
                            <select
                               className="select form-control " name="roomId"
                                onChange={(event) => setCurrentRoom(event.currentTarget.value)}
                                value={currentRoom}
                            >
                                <option value="">Select value...</option>
                                {roomData.map((rooms) => (
                                    <option key={rooms.id} value={rooms.id}>
                                        {rooms.id}
                                    </option>
                                ))}
                            </select>
                            {/* <select className="select form-control " name="roomId" >
                                {
                                    roomData.map(function(result){
                                        return <option keys = {result.id}
                                        value = { result.id}>
                                            {
                                            "room " + result.id
                                        }
                                        </option>
                                    })
                                }
                             
                            </select> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="address" placeholder="Enter you Address" name="address" onFocus={onAddressFocus} />

                            {
                                addressError ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{addressError}</span> : ''
                            }
                        </Form.Group>
                        <Button variant="primary" type="submit" className="btn btn-lg mt-2">
                            Book Now
                        </Button>
                    </Form>

                </div>
                <div className="col-md-3"></div>

            </div>
        </div>

    )
}


export default Booking;