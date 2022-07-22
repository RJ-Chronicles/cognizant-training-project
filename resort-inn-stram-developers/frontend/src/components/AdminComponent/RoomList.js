import React from 'react'
import RoomService from '../../Services/RoomService';
import NotFound from './NotFound';
import { Link } from 'react-router-dom'
import '../../Assets/css/roomList.css'

export default class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []

        }
        this.deleteRoom = this.deleteRoom.bind(this);

        this.acceptRoom = this.acceptRoom.bind(this);
    }
    deleteRoom(id) {
        console.log("room deleted")
        console.log("room deleted  :          " + id)
        RoomService.deleteRoom(id).then(res => {
            this.setState({ rooms: this.state.rooms.filter(rooms => rooms.id !== id) });
        })
    }
    acceptRoom(id) {
        console.log("room accepted")

        console.log("room accepted  :          " + id)
        RoomService.updateRoom(id).then(res => {
            this.setState({ rooms: this.state.rooms })//.filter( feed => feed.id !== id)});
        })
    }

    componentDidMount() {
        RoomService.getRooms().then((res) => {
            this.setState({ rooms: res.data });
            console.log(res.data);
        });

    }
    render() {
        return (
            <>
                <div className='container' style={{ marginTop: '100px' }}>
                    <div className=''><button className="align-left lineHeigh"><Link to='/dashboard/add-room' className='linHeigh'>Add Room</Link></button></div>
                    <h2 className="text-center mt-2 bookHeadi ">RoomList</h2>
                    <br></br>
                    <div className="row">
                        {this.state.rooms.length === 0 ?
                            <NotFound message="Room Not Found" />
                            :
                            <table className="table table-striped table-bordered">

                                <thead>
                                    <tr>
                                        <th>Id</th>

                                        <th> DailyCharges</th>
                                        {/* <th> ImagePath</th> */}
                                        <th>RoomDescription</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.rooms.map(
                                            room =>
                                                <tr key={room.id}>
                                                    <td className='tdStyle'>{room.id}</td>

                                                    <td className='tdStyle'> {room.dailyCharge}</td>
                                                    {/* <td>{room.imagePath}</td> */}
                                                    <td className='tdStyle'>{room.roomDescription}</td>


                                                    <td>
                                                        <button style={{ marginLeft: "4px" }} onClick={() => this.deleteRoom(room.id)} className="btn btn-danger ">
                                                            <i className="fa fa-trash binColor" aria-hidden="true"></i> </button>
                                                        {/* {
                                                            room.status === "Pending" ?

                                                                <button style={{ margin: 2 }} onClick={() => this.acceptRoom(room.id)} className="btn btn-info">
                                                                    <i className="fa fa-check-square binColor" aria-hidden="true" ></i> </button>
                                                                :
                                                                <button style={{ margin: 4 }} disabled={true} onClick={() => this.acceptRoom(room.id)} className="btn btn-info binInfo">
                                                                    <i className="fa fa-check-square binColor" aria-hidden="true" ></i> </button>
                                                        } */}
                                                    </td>
                                                </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        }

                    </div>

                </div>
            </>
        )
    }
}