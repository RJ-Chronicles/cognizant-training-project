import profiles from '../../Assets/images/profiles.png'
import FeedbackService from '../../Services/FeedbackService'
import React from 'react';

export default class Testimonial extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            feedbacks: []
        }
    }
    componentDidMount() {
        FeedbackService.getFeedbackByStatus().then((res) => {
            this.setState({ feedbacks: res.data });
            console.log(res.data);
        });
    }

    /*
    const[feedbacks, setFeedback] = useState();
    useEffect(() => {
       getFeedbacks()
     },[]);

     const getFeedbacks = ()=>{
        FeedbackService.getFeedbacks().then((response)=>{
            setFeedback(response.data);
           console.log(response.data);
       });
     };
     */
    render() {
        return (
            <>
                <section className="home-testimonial">
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-center testimonial-pos">
                            <div className="col-md-12 pt-4 d-flex justify-content-center">
                                <h3>Testimonials</h3>
                            </div>
                            <div className="col-md-12 d-flex justify-content-center">
                                <h2>Explore the Customers experience</h2>
                            </div>
                        </div>
                        <section className="home-testimonial-bottom">
                            <div className="container testimonial-inner">
                                <div className="row d-flex justify-content-center">
                                    {
                                        this.state.feedbacks.map(
                                            feedback =>
                                                <div className="col-md-4 style-3 shadow-sm p-3 mb-5 bg-white rounded">
                                                    <div className="tour-item " id={feedback.id}>
                                                        <div className="tour-desc bg-white">
                                                            <div className="tour-text color-grey-3 text-center">&ldquo;{feedback.body}&rdquo;</div>
                                                            <div className="d-flex justify-content-center pt-2 pb-2"><img className="tm-people" src={profiles} alt="profiles" /></div>
                                                            <div className="link-name d-flex justify-content-center">{feedback.guest_name}</div>
                                                            <div className="link-position d-flex justify-content-center">Customer</div>
                                                        </div>
                                                    </div>
                                                </div>
                                        )
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </>
        )
    }
}
    //export default Feedback;
