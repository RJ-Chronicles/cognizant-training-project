import React, { Component } from "react";
import "../UserComponent/dashboard1.css";
import Banner1 from '../../Assets/images/banner1.jpg';
import LoginService from "../../Services/LoginService";

function Booking1() {
    const user=LoginService.getUserName();
    return (

        <section className="banner_area">
            <div className="#main_content">
                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <img className="first-slide" src={Banner1} alt="First slide" />
                        <div className="container">
                        </div>
                    </div>

                    <div className="hotel_booking_area position">

                        <h2 style={{marginTop:"100px",color:"white",marginLeft:"50px",fontWeight:"400",fontSize:"28px"}}>
                            
                            <small className="text">Welcome </small>{user}</h2>
                    </div>

                </div>
            </div>
        </section>


    )

}
export default Booking1;