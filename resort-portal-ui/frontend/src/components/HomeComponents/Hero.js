import Banner1 from '../../Assets/images/banner1.jpg';
import Banner2 from '../../Assets/images/banner2.jpg';
import Banner3 from '../../Assets/images/banner3.jpg';
import React from 'react'
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div>
      <section className="banner_main">
        <div
          id="myCarousel"
          className="carousel slide banner"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="first-slide" src={Banner1} alt="First slide" />
              <div className="container"></div>
            </div>
            <div className="carousel-item">
              <img className="second-slide" src={Banner2} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="third-slide" src={Banner3} alt="Third slide" />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#myCarousel"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        
      </section>
    </div>
  );
}

export default Hero;
