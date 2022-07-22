import React, { Component } from "react";
import RoomService from "../../Services/RoomService";

export default class AddRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyCharge: '',
            roomDescription: '',
            // imagePath: ''
        };
        this.onchangeDailyCharge = this.onchangeDailyCharge.bind(this);

        this.onChangeRoomDescription = this.onChangeRoomDescription.bind(this);
        // this.onChangeImagePath = this.onChangeImagePath.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onchangeDailyCharge(e) {
        this.setState({
            dailyCharge: e.target.value
        })
    }

    onChangeRoomDescription(e) {
        this.setState({
            roomDescription: e.target.value
        })
    }

    // onChangeImagePath(e) {
    //     this.setState({
    //         imagePath: e.target.value
    //     })
    // }

    handleSubmit(e) {
        e.preventDefault();
        const room = {
            dailyCharge: this.state.dailyCharge,

            roomDescription: this.state.roomDescription,
            // imagePath: this.state.imagePath
        }
        console.log(room)
        console.log()
        RoomService.createNewRoom(room).then(res => {
            console.log("record added  :  " + res.data);
           window.location.assign('/dashboard/room-list')
        })
    }
    render() {
        return (
            <>
                <div>
                    <div className="row" id="dn" style={{ marginTop: "140px" }}>
                        <div className="col-4"></div>
                        <div className="col-4 shadow p-3 mb-5 bg-white rounded">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    {/* <h3 className="text-center"><i className="fa fa-user" aria-hidden="true"></i></h3> */}
                                    <h2 className="text-center mb-2"  style={{color:"purple",fontWeight:"normal"}}>Add New Room</h2>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputDailyCharges" className="fn1">Daily Charges</label>
                                            <div className="input-group">
                                                <input type="number" className="frm1" id="exampleInputDailyCharges" placeholder="Enter the Daily Charges" value={this.state.dailyCharge} onChange={this.onchangeDailyCharge} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputDescription" className="fn1">Room Description</label>
                                            <div className="input-group">
                                                <input type="textarea" className="frm1" id="exampleInputDescription" placeholder="Enter the Room Description" value={this.state.roomDescription} onChange={this.onChangeRoomDescription} />
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="exampleInputPhoto" className="fn1">Image Path</label>
                                            <div className="input-group">
                                                <input type="file" className="frm1" id="exampleInputPhoto" placeholder="No file chosen" value={this.state.imagePath} onChange={this.onChangeImagePath} />
                                            </div>
                                        </div> */}

                                        <button type="submit" className="btn btn-primary mt-3" id="lgn">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}