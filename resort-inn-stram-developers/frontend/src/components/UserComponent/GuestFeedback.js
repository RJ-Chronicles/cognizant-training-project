import React, { Component } from "react";
import entertain from '../../Assets/images/entertain.jpg';
import kids from '../../Assets/images/kids.jpg';
import wifi from '../../Assets/images/wifi.jpg';
import BorderWrapper from 'react-border-wrapper'
import '../../Assets/css/style.css'
import 'react-star-rating/dist/css/react-star-rating.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BackgroundSlider from 'react-background-slider'
import { Carousel } from 'react-responsive-carousel';
import first from '../../Assets/images/first.jpg';
import second from '../../Assets/images/second.jpg';
import third from '../../Assets/images/third.jpg';
import FeedbackService from '../../Services/FeedbackService';
import '../../Assets/css/Rate.css';

export default class GuestFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guest_name: "",
      rating: "",
      body: ""


    };
    this.onchangeFullName = this.onchangeFullName.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeFeedback = this.onChangeFeedback.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onchangeFullName(e) {
    this.setState({
      guest_name: e.target.value
    })
  }

  onChangeRating(e) {
    this.setState({
      rating: e.target.value
    })
  }
  onChangeFeedback(e) {
    this.setState({
      body: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const guestFeedback = {
      guest_name: this.state.guest_name,
      rating: this.state.rating,
      body: this.state.body
    }
    console.log(guestFeedback)
    console.log()
    FeedbackService.submitFeedback(guestFeedback).then(res => {
      console.log("submitted :  " + res.data);
    })
  }
  render() {
    return (
      <div>
        <div className="">
          <div className="row heightcss">

          </div>
        </div>

        <div className="container" >
          <BackgroundSlider style={{ height: '120%' }}
            images={[first, second, third]}
            duration={3000} transition={2}
          />
          <div className="row heightback">

            <div className="col">
              <div className="form dalo daloheight" >
                <div className="form-body">
                  <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={6100}>
                    <div className="card cardHeight">
                      <img src={entertain} alt="entertainment" width="100px" height="150px" />
                      <div className="card-body">
                        <h3 className="card-title" style={{ color: 'purple' }}>Entertainment</h3>
                        <p className="card-text cardfont">Great resorts offer guests entertainment on some nights, which does not require guests to leave the resort.
                          This is great for mingling with other guests and locals and in some instances, getting a taste of the country's culture.
                          Examples of some types of entertainment include live bands, dancing, karaoke and many others.</p>
                      </div>
                    </div>

                    <div className="card cardHeight">
                      <img src={kids} alt="kids" width="100px" height="150px" />
                      <div className="card-body">
                        <h3 className="card-title" style={{ color: 'orange' }}>Kids Clubs</h3>
                        <p className="card-text cardfont">Kids Clubs are wonderful adults traveling with young children.
                          While family time is important, adults may still require a little alone time or wish to attend an event or
                          function which is not appropriate htmlFor children. Also, children may get bored with the adults and want to play with other children.
                          In this, Younger guests can play together, watch movies, do arts and crafts and many other activities until their parents or guardians return.
                        </p>
                      </div>
                    </div>

                    <div className="card cardHeight">
                      <img src={wifi} alt="wifi" width="100px" height="150px" />
                      <div className="card-body">
                        <h3 className="card-title" style={{ color: 'brown' }}>Free Wi-Fi</h3>
                        <p className="card-text cardfont">Free Wi-Fi is a wonderful luxury to stay in touch with family and friends, share updates on your trip,
                          do research on the resort and country and so on. This adds a measure of convenience which most guests highly appreciate.</p>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="col text-center col-lg-14 mar20 ">

                <BorderWrapper className="feedwholecolor backwhite">
                  <>
                    <h2 className="text-center feedFont ">Feedback</h2>
                    <br />
                    <form className="feed" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <h4><label htmlFor="fullName">Full Name:</label></h4>
                        <input type="text" className="form-control" id="guest_name" name="guest_name" value={this.state.guest_name} onChange={this.onchangeFullName} placeholder="Enter Full Name" />
                      </div><br></br>
                      <div className="form-group">
                        <h4><label className="heightstar" htmlFor="ratings">Rating:</label></h4>

                        <div className="row">
                          <div className="rating" id="rating" name="rating" value={this.state.rating} onChange={this.onChangeRating}>

                            <input type="radio" name="rating" value="5" id="5" /><label htmlFor="5">☆</label>
                            <input type="radio" name="rating" value="4" id="4" /><label htmlFor="4">☆</label>
                            <input type="radio" name="rating" value="3" id="3" /><label htmlFor="3">☆</label>
                            <input type="radio" name="rating" value="2" id="2" /><label htmlFor="2">☆</label>
                            <input type="radio" name="rating" value="1" id="1" /><label htmlFor="1">☆</label>
                          </div>
                        </div>
                        {/* <div className="col text-center rate" id="rating" name="rating" value={this.state.rating} onChange={this.onChangeRating}> */}
                        {/* <input className="form-control"  id="rating" name="rating"value={this.state.rating} onChange={this.onChangeRating} />
                            <Rate /> */}

                      </div>

                      <br></br>
                      <div className="form-group" >
                        <h4><label htmlFor="feedback" className="form-label">Enter the Feedback:</label></h4>
                        <textarea className="form-control heighttext" type="text" rows="5" id="body" name="body" placeholder="What's your experience?" value={this.state.body} onChange={this.onChangeFeedback} ></textarea>
                      </div>
                      <br></br>
                      <center><button type="submit" className="btn btn-danger subt" >Submit</button></center>
                    </form>
                  </>
                </BorderWrapper>

              </div>
            </div>
          </div>
        </div>
        {/* 
      <Footer /> */}
      </div>
    )
  }
}

