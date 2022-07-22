import React from 'react';
import '../../Assets/css/CancellationReschedule.css'
import BookingService from "../../Services/BookingService";
import NotFound from '../AdminComponent/NotFound';
import moment from 'moment'
import { Link } from 'react-router-dom';
import LoginService from '../../Services/LoginService';
import { toast } from 'react-toastify';

export default class CancellationReschedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingList: []

        }
        this.deleteBooking = this.deleteBooking.bind(this);

        this.acceptBooking = this.acceptBooking.bind(this);
    }
    deleteBooking(id) {
        console.log("Booking deleted")
        console.log("Booking deleted  :          " + id)
        BookingService.deleteBooking(id).then(res => {
            this.setState({ bookingList: this.state.bookingList.filter(book => book.id !== id) });
        })
    }
    acceptBooking(id) {
        console.log("Booking accepted")
        toast("Booking Accepted")
        console.log("Booking accepted  :          " + id)
        BookingService.updateBooking(id).then(res => {
            this.setState({ bookingList: this.state.bookingList })//.filter( feed => feed.id !== id)});
        })
    }

    componentDidMount() {
        BookingService.getBookingBasedOnGuestId(LoginService.getUserId()).then((res) => {
            this.setState({ bookingList: res.data });
            console.log(res.data);
        });

    }
    render() {
        return (
            <>
                <div className='container ' style={{ marginTop: "100px" }}>
                    <h2 className="text-center mt-5 bookHeading " >Booking List</h2>
                    <br></br>
                    <div className="row">
                        {this.state.bookingList.length === 0 ?
                            <NotFound message="Booking Not Found" />
                            :
                            <table className="table table-striped table-bordered">

                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th> Check In</th>
                                        <th> Check Out</th>
                                        <th> Address</th>
                                        <th> Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.bookingList.map(
                                            book =>
                                                <tr key={book.id}>
                                                    <td className='tdStyle'>{book.id}</td>
                                                    <td className='tdStyle'> {book.checkIn} </td>
                                                    <td className='tdStyle'> {book.checkOut}</td>
                                                    <td className='tdStyle'> {book.address}</td>
                                                    <th className='tdStyle'> {book.status}</th>
                                                    <td>
                                                        <button className="btn btn-danger buttnStyle">
                                                            <Link to='/guest-dashboard/cancellation' style={{ color: 'white' }} state={{ from: { id: book.id } }}>Cancel</Link></button>
                                                        {

                                                            moment().isBefore(moment(book.checkIn)) ?
                                                                // book.status==="Pending"?

                                                                <button className="btn btn-info buttnStylo">
                                                                    <Link to='/guest-dashboard/reschedule' style={{ color: 'white' }} state={{ from: { id: book.id } }}>Reschedule </Link></button>
                                                                :
                                                                <button style={{ margin: 4, fontSize: '1.2rem', borderRadius: '3px' }} disabled={true} onClick={() => this.acceptBooking(book.id)} className="btn btn-info">Reschedule</button>
                                                        }
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
