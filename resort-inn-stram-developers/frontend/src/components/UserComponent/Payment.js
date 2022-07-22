import React, { useState } from "react";
import "../../Assets/css/payment.css";
import { useNavigate } from "react-router-dom";
import LoginService from "../../Services/LoginService";

function Payment() {
    const bookId = LoginService.getTransactionId();
    const amount = LoginService.getTransactionAmount();
    const [cardNumberError, setCardNumberError] = useState('');
    const [ccvError, setCcvError] = useState('');
    const [expiryError, setExpiryError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        console.log(formData)
        fetch("http://localhost:8080/api/v1/transaction/" + bookId + "/transaction", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: formData.get('fullName'),
                cardNumber: formData.get('cardNumber'),

                expiry: formData.get('expiry'),
                ccv: formData.get('ccv'),
                payment: amount
            }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("success")
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
                        if (fieldError.field === 'fullName') {
                            setFullNameError(fieldError.message);
                        }

                        if (fieldError.field === 'cardNumber') {
                            setCardNumberError(fieldError.message);
                        }

                        if (fieldError.field === 'expiry') {
                            setExpiryError(fieldError.message);
                        }

                        if (fieldError.field === 'ccv') {
                            setCcvError(fieldError.message);
                        }
                    });
                }
                else {
                    alert("InValid input provided !!");
                }
            })
            .catch((err) => err);
    }

    const onFullNameFocus = (e) => {
        e.preventDefault();
        setFullNameError('');
    }

    const onCardNumberFocus = (e) => {
        e.preventDefault();
        setCardNumberError('');
    }
    const onExpiryFocus = (e) => {
        e.preventDefault();
        setExpiryError('');
    }

    const onCcvFocus = (e) => {
        e.preventDefault();
        setCcvError('');
    }

    return (
        <div>
            <div className="payment">
                <div className="container">
                    <div className="card cardo px-6">
                        <p className="h8 py-3 mt-4 mb-4">Payment Details</p>
                        <div className="row gx-3">
                            <form id="po" method="POST" autoComplete="off" onSubmit={onSubmit}>
                                <div className="col-12">
                                    <div className="">
                                        <label className="text texto mb-1">Person Name</label>
                                        <input className="form-control mb-4 " type="text" placeholder="Name" onFocus={onFullNameFocus} />

                                        {
                                            fullNameError ? <span style={{ color: 'red', fontSize: '14px', marginLeft: '13rem' }}>{fullNameError}</span> : ''
                                        }

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="">
                                        <label className="text texto mb-1">Card Number</label>
                                        <input className="form-control mb-4 " type="tel" name="cardNumber" onFocus={onCardNumberFocus} />
                                        {
                                            cardNumberError ? <span style={{ color: 'red', fontSize: '14px', marginLeft: '13rem' }}>{cardNumberError}</span> : ''
                                        }
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="">
                                        <label className="text texto mb-1">Expiry</label>
                                        <input className="form-control mb-4" type="text" placeholder="MM/YYYY" onFocus={onExpiryFocus} />
                                        {
                                            expiryError ? <span style={{ color: 'red', fontSize: '14px', marginLeft: '13rem' }}>{expiryError}</span> : ''
                                        }
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="">
                                        <label className="text texto mb-1">CVV</label>
                                        <input className="form-control mb-4 " type="password" placeholder="***" onFocus={onCcvFocus} />
                                        {
                                            ccvError ? <span style={{ color: 'red', fontSize: '14px', marginLeft: '13rem' }}>{ccvError}</span> : ''
                                        }
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="">
                                        <label className="text texto mb-1">Amount</label>
                                        <input className="form-control mb-4 " name="payment" type="text" value={amount}  disabled />

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className=" " >
                                        {/* <h3 className="mt-2">Pay </h3> */}
                                        <button className="butto btn btn-primary mb-4 mt-2 " style={{ textAlign: 'center' }}>Pay</button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
