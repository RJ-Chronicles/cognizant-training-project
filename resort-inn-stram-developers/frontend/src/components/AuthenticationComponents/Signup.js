import React, { useState } from "react"
import '../../Assets/css/signUp.css'
import regis from '../../Assets/images/regis.jpg'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [contactError, setContactError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        fetch("http://localhost:8080/api/v1/auth/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: formData.get('fullName'),
                contact: formData.get('contact'),

                password: formData.get('password'),
                email: formData.get('email')
            }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("success")
                    navigate('/register/otp');
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

                        if (fieldError.field === 'contact') {
                            setContactError(fieldError.message);
                        }

                        if (fieldError.field === 'email') {
                            setEmailError(fieldError.message);
                        }

                        if (fieldError.field === 'password') {
                            setPasswordError(fieldError.message);
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

    const onContactFocus = (e) => {
        e.preventDefault();
        setContactError('');
    }
    const onEmailFocus = (e) => {
        e.preventDefault();
        setEmailError('');
    }

    const onPasswordFocus = (e) => {
        e.preventDefault();
        setPasswordError('');
    }

    return (
        <div>
            <section className="">
                <div className="container " style={{ backgroundColor: 'black' ,marginTop:'100px' ,height: '766px'}}>
                    <div className="row d-flex justify-content-center align-items-center ">
                        <div className="col">
                            <div className=" card-registration cardReg my-4 ">
                                <div className="row g-0">
                                    <div className="col-xl-6 d-none d-xl-block">
                                        <div className="cad  border bord1">
                                            <img src={regis} alt="register" style={{ height: '721px' }} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6">

                                        <div className="cad border bord1">
                                            <form id="stripe-login" method="POST" autoComplete="off" onSubmit={onSubmit} >
                                                
                                                <div className=" p-md-4 text-black bordrad">

                                                    <header><center><h2 style={{
                                                        backgroundColor: '#784f40',
                                                        fontFamily: 'Franklin Gothic Medium',
                                                        color: 'white',
                                                        borderRadius: '6px',
                                                        height: '74px',
                                                        paddingTop: '22px'
                                                    }} >Register to Comfort Inn</h2></center></header>

                                                    <div className=" row align-items-center pt-4 pb-2 ">

                                                        <div className="form-group col md-3 ps-5">
                                                            <label className="formlabel " htmlFor="fullName">FullName:</label>
                                                        </div>
                                                        <div className=" col-sm-8 ">

                                                            <input type="text"

                                                                id="fullName"
                                                                name="fullName"
                                                                onFocus={onFullNameFocus}
                                                                className="form-control form-control-md"
                                                                placeholder="Enter fullName" />
                                                            {
                                                                fullNameError ? <span style={{ color: 'red', fontSize: '15px' }}>{fullNameError}</span> : ''
                                                            }

                                                        </div>
                                                    </div>

                                                    <div className=" row align-items-center pt-2 pb-2 ">
                                                        <div className="form-group col md-3 ps-5">
                                                            <label className="formlabel" htmlFor="email">Email ID:</label>
                                                        </div>
                                                        <div className="col-sm-8 ">
                                                            <input type="email"
                                                                id="email" name="email"
                                                                onFocus={onEmailFocus}
                                                                className="form-control form-control-md"
                                                                placeholder="Enter emailid" />
                                                            {
                                                                emailError ? <span style={{ color: 'red', fontSize: '15px' }}>{emailError}</span> : ''
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="row align-items-center pt-2 pb-2 ">
                                                        <div className="form-group col md-3 ps-5">
                                                            <label className="formlabel" htmlFor="contact">Contact:</label>
                                                        </div>
                                                        <div className="col-sm-8 ">
                                                            <input type="contact"

                                                                id="contact" name="contact"
                                                                className="form-control form-control-md"
                                                                placeholder="Enter contact"
                                                                onFocus={onContactFocus} />
                                                            {
                                                                contactError ? <span style={{ color: 'red', fontSize: '15px' }}>{contactError}</span> : ''
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center pt-2 pb-2">
                                                        <div className="form-group  col md-3 ps-5">
                                                            <label className="formlabel" htmlFor="password">Password:</label>
                                                        </div>
                                                        <div className="col-sm-8 ">
                                                            <input type="password"
                                                                id="password"
                                                                name="password"
                                                                className="form-control form-control-md"
                                                                placeholder="Enter password"
                                                                onFocus={onPasswordFocus} />
                                                            {
                                                                passwordError ? <span style={{ color: 'red', fontSize: '15px' }}>{passwordError}</span> : ''
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="row align-items-center pt-1 pb-6">
                                                        <div className="form-group col md-3 ps-5 " >
                                                            <label className="formlabel" htmlFor="confirmpassword">Confirm Password:</label>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <input type="password"
                                                                id="confirmpassword" name="confirmpassword"
                                                                className="form-control form-control-md"
                                                                placeholder="Enter confirm password"
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="form-outline  ">

                                                        <center><input type="submit" name="Register"
                                                            className="btn btn-primary butt" /></center>
                                                    </div>
                                                    <div className="form-outline ">
                                                        <center>Already Registered?<a href="./login"> Login</a></center>
                                                    </div>

                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

