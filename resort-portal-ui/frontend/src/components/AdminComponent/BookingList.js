import React from 'react'
import BookingService from '../../Services/BookingService';
import NotFound from './NotFound';
import '../../Assets/css/BookingList.css'

export default class BookingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: []

        }
        this.deleteBooking = this.deleteBooking.bind(this);

        this.acceptBooking = this.acceptBooking.bind(this);
    }
    deleteBooking(id) {
        console.log("Booking deleted")
        console.log("Booking deleted  :          " + id)
        BookingService.deleteBooking(id).then(res => {
            this.setState({ booking: this.state.booking.filter(book => book.id !== id) });
        })
    }
    acceptBooking(id) {
        console.log("Booking accepted")
        console.log("Feedback accepted")
        console.log("Feedback accepted  :          " + id)
        BookingService. adminAcceptRejectBooking(id).then(res => {
            this.setState({ booking: this.state.booking })//.filter( feed => feed.id !== id)});
        })
    }

    componentDidMount() {
        BookingService.getBookings().then((res) => {
            this.setState({ booking: res.data });
            console.log(res.data);
        });

    }
    render() {
        return (
            <>
                <div className='container'style={{marginTop:'10px'}}>
                    <h2 className="text-center mt-5 bookHeadig">Booking List</h2>
                    <br></br>
                    <div className="row">
                        {this.state.booking.length === 0 ?
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
                                        this.state.booking.map(
                                            book =>
                                                <tr key={book.id}>
                                                    <td>{book.id}</td>
                                                    <td> {book.checkIn} </td>
                                                    <td> {book.checkOut}</td>
                                                    <td> {book.address}</td>
                                                    <th> {book.status}</th>
                                                    <td>
                                                        <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBooking(book.id)} className="btn btn-danger "><i className="fa fa-trash btdan" aria-hidden="true"></i> </button>
                                                        {
                                                            book.status === "Pending" ?

                                                                <button style={{ margin: 4 }} onClick={() => this.acceptBooking(book.id)} className="btn btn-info"><i className="fa fa-check-square btdan" aria-hidden="true" ></i> </button>
                                                                :
                                                                <button style={{ margin: 4 }} disabled={true} onClick={() => this.acceptBooking(book.id)} className="btn btn-info"><i className="fa fa-check-square btdan" aria-hidden="true" ></i> </button>
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