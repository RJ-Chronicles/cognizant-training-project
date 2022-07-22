import React from "react";

import RoomService from "../../Services/RoomService";
import LoginService from "../../Services/LoginService";
import { Link } from 'react-router-dom';
export default class OurRoom extends React.Component {

    constructor(props) {
        super(props)
        this.isLogin = LoginService.isLoggedIn();
        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        RoomService.getRooms().then((res) => {
            this.setState({ rooms: res.data });
            console.log(res.data);
        });
    }

    render() {
        return (

            <div>
                <div className="our_room">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="titlepage">
                                    <h2>Our Room</h2>
                                    {/* <p>Lorem Ipsum available, but the majority have suffered </p> */}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {
                                this.state.rooms.map(room =>
                                    <div className="col-md-4 col-sm-6" id={room.id}>
                                        <div id="serv_hover" className="room">
                                            <div className="room_img">
                                                <figure><img src={require('../../Assets/images/room4.jpg')} alt="#" /></figure>
                                            </div>
                                            <div className="bed_room">
                                                <h3>Bed Room</h3>
                                                <p>{room.roomDescription} </p>
                                                <h5 className="price">${room.dailyCharge}<small>/night</small></h5>

                                                <a href={this.isLogin? "/guest-dashboard/booking" : "/login"} id="button" >Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

