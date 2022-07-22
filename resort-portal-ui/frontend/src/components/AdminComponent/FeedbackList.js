import React from 'react'
import FeedbackService from '../../Services/FeedbackService';
import NotFound from './NotFound';
import '../../Assets/css/FeedbackList.css'

let status = true;
class FeedbackList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feedback: []
        }
        this.deleteFeedback = this.deleteFeedback.bind(this);
        this.acceptFeedback = this.acceptFeedback.bind(this);
    }

    deleteFeedback(id) {
        console.log("Feedback deleted")
        console.log("Feedback deleted  :          " + id)
        FeedbackService.deleteFeedback(id).then(res => {
            this.setState({ feedback: this.state.feedback.filter(feed => feed.id !== id) });
        })
    }
    acceptFeedback(id) {
        console.log("Feedback accepted")
        console.log("Feedback accepted  :          " + id)
        FeedbackService.acceptFeedback(id).then(res => {
            this.setState({ feedback: this.state.feedback })//.filter( feed => feed.id !== id)});
        })

    }
    componentDidMount() {
        FeedbackService.getFeedback().then((res) => {
            this.setState({ feedback: res.data });
            console.log(res.data);
        });
    }
    render() {
        return (
            <>
                <div className='container' style={{marginTop:'100px'}}>
                    <h2 className="text-center mt-5 feedy">Feedback List</h2>
                    <br></br>
                    <div className="row">
                        {this.state.feedback.length === 0 ?
                            <NotFound message="Feedback not Found" />
                            :
                            <table className="table table-striped table-bordered">

                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th> Name</th>
                                        <th> Rating</th>
                                        <th> Feedback</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.feedback.map(
                                            feed =>
                                                <tr key={feed.id}>
                                                    <td >{feed.id}</td>
                                                    <td> {feed.guest_name} </td>
                                                    <td> {feed.rating}</td>
                                                    <th>{feed.body}</th>
                                                    <th>{feed.status}</th>

                                                    <td>
                                                        <button type="button" className=" btn btn-danger" style={{ marginLeft: "10px" }} onClick={() => this.deleteFeedback(feed.id)} ><i className="fa fa-trash btnhigs" aria-hidden="true"></i></button>
                                                        {feed.status === "Pending" ?
                                                            <button type="button" className=" buttin btn btn-success" style={{ margin: 4 }} onClick={() => this.acceptFeedback(feed.id)}><i className="fa fa-check-square btnhigs" aria-hidden="true" ></i> </button>
                                                            :
                                                            <button type="button" disabled={true} className="btn btn-success" style={{ margin: 4 }} onClick={() => this.acceptFeedback(feed.id)}><i className="fa fa-check-square btnhigs" aria-hidden="true" ></i> </button>
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
export default FeedbackList;