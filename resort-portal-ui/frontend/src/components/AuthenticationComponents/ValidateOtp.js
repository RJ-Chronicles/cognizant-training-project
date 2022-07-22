import React, { Component } from "react"
import OtpInput from 'react-otp-input';
import '../../Assets/css/validateOtp.css';
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';
// import UserRegister from "./UserRegister";
// import {Link} from 'react-router-dom'

export default class ValidateOtp extends Component {

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
        axios.post("http://localhost:8080/api/v1/auth/otp-validation", oneTimePassword)
            .then(res => {
                if (res['status'] = 201) {
                    alert('User has Registered Successfully')
                    window.location.assign("/login")
                } else if (res['status'] = 400) {
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
            <div className="otpback" >
                <h2 className=" otpback text-center  pt-5 mt-5">Email Verification Code</h2>
                {/* <h1 className="text-center bg-success"></h1> */}
                <div className="row pb-5 modbo">
                    <form onSubmit={this.handleSubmit} className="pb-4 mb-4">
                        <Modal.Dialog style={{ "border": "4px black" }}>
                            <Modal.Header className="headerColor">
                                <Modal.Title className="titleColor">Enter your OTP</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className="">
                                <OtpInput
                                    otptype="number"
                                    value={this.state.otp}
                                    onChange={this.onChangeOtp}
                                    inputStyle='otpWidth'
                                    containerStyle='otpMarg'
                                    numInputs={6}
                                    separator={<span className="otpSinMarg"></span>} />

                            </Modal.Body>

                            <Modal.Footer className="modalFoot">
                                {/* <Button variant="secondary">Close</Button> */}
                                <Button type="submit" className="sub" >Submit</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </form>
                </div>
            </div>
        )
    }
}
