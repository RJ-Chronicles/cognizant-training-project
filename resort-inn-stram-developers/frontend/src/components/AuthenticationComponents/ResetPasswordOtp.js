import React, { Component } from "react"
import OtpInput from 'react-otp-input';

import axios from 'axios'
import '../../Assets/css/Reset.css'
import { Modal, Button } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';


export default class ResetPasswordOtp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            otp: ""
        }

        this.onChangeOtp = this.onChangeOtp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeOtp = (otp) => {
        console.log("change");
        this.setState({ otp });
    }
    handleSubmit = (e) => {
        console.log("hello");
        e.preventDefault();
        let oneTimePassword = {

            otp: this.state.otp

        }
        console.log(oneTimePassword);
        axios.post("http://localhost:8080/api/v1/auth/reset-password-otp", oneTimePassword)
            .then(res => {
                if (res['status'] == 201) {
                    alert('Your New Password is created')
                    window.location.assign("/login")
                } else if (res['status'] == 400) {
                    console.log("failed")
                }
                console.log(res);
                console.log(res.data);
            })
        console.log("inside submit")
        this.setState({
            otp: ''
        })
    }
    render() {
        return (
            <div className="otpbac" >
                <h2 className=" otpbac text-center  pt-5 mt-5 ">Email Verification Code</h2>
                {/* <h1 className="text-center bg-success"></h1> */}
                <div className="row pb-5 modbon">
                    <form onSubmit={this.handleSubmit} className="pb-4 mb-4">
                        <Modal.Dialog style={{ "border": "4px black" }}>
                            <Modal.Header className="headerColors">
                                <Modal.Title className="titleColors">Enter your OTP</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className="">
                                <OtpInput
                                    otptype="number"
                                    value={this.state.otp}
                                    onChange={this.onChangeOtp}
                                    inputStyle='otpWidths'
                                    containerStyle='otpSarg'
                                    numInputs={6}
                                    separator={<span className="otpArg"></span>} />

                            </Modal.Body>

                            <Modal.Footer className="modalFoots">
                                {/* <Button variant="secondary">Close</Button> */}
                                <Button type="submit" className="subm" >Submit</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </form>
                </div>
            </div>
        )
    }
}
