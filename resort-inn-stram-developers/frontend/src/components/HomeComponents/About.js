import AboutImg from '../../Assets/images/about.png'
import { Link } from 'react-router-dom';
function About() {
  return (
    <div>
      <div className="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="titlepage">
                <h2>About Us</h2>
                <p>
                Overall modern business and tourism development philosophy is geared towards tourists,  guests  and  
                constomer and satisfying their needs and desires. Modern hospitality  is  distinguished  from  
                other related activities in the sphere of providing accommodation  by  means  of  continuous maintenance 
                of the quality of services and introduction  of new  types of services that are  not  characteristic  of  
                the  hospitality business.Survival of the hotel industry in the demanding and 
                 dynamic market and raising the level of competitiveness depends on improving the quality of hotel products  and  services. 
               {" "}
                </p>
                <a className="read_more" >
                  <Link to="/"> Read More</Link>
                  {/* <a href="/login">Book Now</a> */}
                </a>
              </div>
            </div>
            <div className="col-md-7">
              <div className="about_img">
                <figure>
                  <img src={AboutImg} alt="#" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
