import React from "react";
import { Link } from 'react-router-dom';
import "../../Assets/css/home.css";
import { useNavigate } from "react-router-dom";
import LoginService from "../../Services/LoginService";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
   
    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        console.log(formData)
        fetch("http://localhost:8080/api/v1/auth/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);

                    alert("Login success")

                    return response.json()
                }
                else {
                    console.log("inside the else part")
                    return response.json()
                }

            })
            .then((data) => {
                console.log(data);
                if (data.jwtAuthResponse) {
                  
                    console.log("inside the jwt : ")
                    const user = {
                        "name": data.fullName,
                        "email": data.email,
                        "id": data.id,
                        "contact": data.contact,
                        "role": data.role[0].name,
                        "token": data.jwtAuthResponse.accessToken
                    }
               
                    console.log("My role is " + user.role);
                    console.log("jwt token : " + data.jwtAuthResponse.accessToken);
                 

                    localStorage.setItem("token", data.jwtAuthResponse.accessToken)
                    localStorage.setItem("role", user.role);
                    localStorage.setItem("id",data.id);
                    console.log(localStorage.getItem('id'));
                    localStorage.setItem("email",user.email);
                    localStorage.setItem("contact",user.contact);
                    localStorage.setItem("name", user.name);
                    
                    console.log(localStorage.getItem("token"))
                    localStorage.setItem('user', user);
                    console.log(localStorage.getItem("role"));

                    if (user.role === "ROLE_USER") {
                        navigate('/guest-dashboard');
                    }
                    else{
                        navigate('/dashboard');
                    }
                }

                else if (data.fieldErrors) {
                    data.fieldErrors.forEach(fieldError => {
                        if (fieldError.field === 'email') {
                            setEmailError(fieldError.message);
                        }

                        if (fieldError.field === 'password') {
                            setPasswordError(fieldError.message);
                        }
                    });
                }
                else {
                    
                    // toast.error("Login failed!!", {
                    //     position: "bottom-center"
                    // })
                }
            })
            .catch((err) => err);
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

            <div className="row " id="dn">
                <div className="col-4" ></div>
                <div className="col-4 shadow p-3 mb-5 mt-5 bg-white rounded ">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h3 className="text-center"><i className="fa fa-user" aria-hidden="true"></i></h3>
                            <h2 className="text-center">Login Here..</h2>
                            <form id="stripe-login" method="POST" autoComplete="off" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="fn1">Email address</label>
                                    <div className="input-group">
                                        <input type="text" name="email" className="frm1" id="exampleInputEmail1" placeholder="Enter email" onFocus={onEmailFocus} />
                                        {
                                            emailError ? <span style={{ color: 'red', fontSize: '12px' }}>{emailError}</span> : ''
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1 " className="fn1">Password</label>
                                    <div className="input-group">
                                        <input type="password" name="password" className="frm1" id="exampleInputPassword1" onFocus={onPasswordFocus} placeholder="Password" />
                                        {
                                            passwordError ? <span style={{ color: 'red', fontSize: '12px' }}>{passwordError}</span> : ''
                                        }
                                    </div>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" style={{ marginTop: '0.6rem' }} />
                                    <label className="form-check-label" htmlFor="exampleCheck1" style={{ paddingLeft: "10px", fontSize: '15px' }}>Remember Me</label>
                                </div>
                                <input type="submit" name="Login" className="btn btn-primary mt-2" id="lgn" value="Login" />
                            </form>
                            <p className="text-sm-left" style={{ fontSize: '18px' }}><Link to='/forget-pwd'>Forget password?</Link></p>
                            <div className="text-center mt-4">
                                <span className="d-block mobile-text sm1" style={{ fontSize: '18px' }}>Don't have an Account?</span>
                                <span className="font-weight-bold text-danger cursor">
                                    <Link to='/register' className="sm1" style={{ fontSize: '15px' }}>Create your New Account Now</Link>
                                </span>
                            </div>
                        </div>

                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}


export default Login;