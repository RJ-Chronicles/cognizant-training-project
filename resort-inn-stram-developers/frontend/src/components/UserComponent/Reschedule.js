import React,  {useState }  from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useLocation } from 'react-router-dom' 

function Reschedule(){
    const location = useLocation();
    const { from } = location.state;
    const [checkInError, setCheckInError] = useState('');
    const [checkOutError, setCheckOutError] = useState('');
    const [roomIdError, setRoomIdError] = useState('');
    const [addressError, setAddressError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
       console.log(formData)
        fetch("http://localhost:8080/api/v1/booking/"+ from.id +"/reschedule", {
            method: "PUT",
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
                    alert("Your Booking has been Updated")
                    navigate('/guest-dashboard');
                }
                else {
                    console.log("inside the else part")
                    return response.json()
                }

            })

            .then((data) => {
                console.log(data);

                if (data.fieldErrors) {
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
                    alert("InValid input provided !!");
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
    const onRoomIdFocus = (e) => {
        e.preventDefault();
        setRoomIdError('');
    }

    const onAddressFocus = (e) => {
        e.preventDefault();
        setAddressError('');
    }
        return (
            <div>
  
                <div id="booking" className="section " style={{ marginTop: "100px" }}>

                    <h2 className="text-center mt-4" style={{color:"brown",fontWeight:"normal"}}>Reschedule</h2>
                </div>

                <div className="row">
                    <div className="col-md-3"></div>

                    <div className="col-md-6 mt-1 mb-3 shadow p-3 mb-5 bg-white rounded">

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 " controlId="formBasicEmail">
                                <Form.Label>CheckIn</Form.Label>
                                <Form.Control placeholder="Enter CheckIn date" type="date" name="checkIn" onFocus={onCheckInFocus} />
                                {
                                            checkInError ? <span style={{ color: 'red', fontSize: '12px',textAlign:'center' }}>{checkInError}</span> : ''
                                        }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>CheckOut</Form.Label>
                                <Form.Control placeholder="Enter CheckOut date" type="date" name="checkOut" onFocus={onCheckOutFocus} />
                                {
                                            checkOutError ? <span style={{ color: 'red', fontSize: '12px',textAlign:'center' }}>{checkOutError}</span> : ''
                                        }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>RoomId</Form.Label>
                                <select className="select form-control " name="roomId" onFocus={onRoomIdFocus} >
                                    <option value="0">Select</option>
                                    <option value="1">Room1</option>
                                    <option value="2">Room2</option>
                                    <option value="3">Room3</option>
                                </select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="address" placeholder="Enter you Address" name="address" onFocus={onAddressFocus}  />
                                   
                                    {
                                            addressError ? <span style={{ color: 'red', fontSize: '12px',textAlign:'center' }}>{addressError}</span> : ''
                                        }
                            </Form.Group>
                            <Button variant="primary" type="submit" className="btn btn-lg mt-2">
                                Update Booking
                            </Button>
                        </Form>

                    </div>
                    <div className="col-md-3"></div>

                </div>
            </div>

        )   
}
export default Reschedule;