import React from 'react';
import "../UserComponent/dashboard1.css";
import Dishes from '../UserComponent/Dishes';
import Gallery from '../UserComponent/Gallery';
import Booking1 from '../UserComponent/Booking1';
import LoginService from "../../Services/LoginService";
import Login from "../AuthenticationComponents/Login";

function GuestDashboard() {
    const user = localStorage.getItem('user').role;

    return (
        <div>
            <Booking1 />
            <Dishes />
            <Gallery />
        </div>
    )
};

export default GuestDashboard;