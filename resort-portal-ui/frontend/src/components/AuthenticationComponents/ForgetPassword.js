import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function ForgetPwd() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("http://localhost:8080/api/v1/auth/forget-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        password: formData.get('password'),
        email: formData.get('email')
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("success")
          navigate('/forget-pwd/otp');
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

            if (fieldError.field === 'password') {
              setPasswordError(fieldError.message);
            }
            if (fieldError.field === 'email') {
              setEmailError(fieldError.message);
            }

          });
        }
        else {
          alert("InValid input provided !!");
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
      <div className="row pt-5 mt-3">
        <div className="col-4"></div>
        <div className="col-4 shadow p-3 mb-5 bg-white rounded" style={{marginTop:"50px"}} >

          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <h3><i className="fa fa-lock fa-4x"></i></h3>
                <h2 className="text-center">Forget Password?</h2>
                {/* <p>Please Enter your Email-address to<br />Receive a Verification Code</p> */}
                <div className="panel-body">

                  <form id="register-form" autoComplete="off" className="form" method="post" onSubmit={onSubmit} >
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                      <input id="email" name="email" placeholder="Email Address" className="form-control" type="email" onFocus={onEmailFocus} />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                      <input id="password" name="password" placeholder="Password" className="form-control" type="Password" onFocus={onPasswordFocus} />
                    </div>

                    <div className="form-group mt-4 mb-4">
                      <input name="submit" className="btn btn-lg btn-primary btn-block" value="Submit" type="submit" />
                    </div>
                    {/* 
                      <input type="hidden" className="hide" name="token" id="token" value="" /> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForgetPwd;
