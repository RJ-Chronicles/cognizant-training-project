
import dish1 from '../../Assets/images/dish1.png';
import dish2 from '../../Assets/images/dish2.png';
import dish3 from '../../Assets/images/dish3.png';
import dish4 from '../../Assets/images/dish4.png';
import dish5 from '../../Assets/images/dish5.png';
import dish6 from '../../Assets/images/dish6.png';
import {Link} from 'react-router-dom';
function Dishes() {
  return (
    <div>
      <div className="our_room">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Our Special Dishes</h2>
                
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={dish1} alt="#" />
                  </figure>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={dish2} alt="#" />
                  </figure>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={dish3} alt="#" />
                  </figure>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={dish4} alt="#" />
                  </figure>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={dish5} alt="#" />
                  </figure>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={dish6} alt="#" />
                  </figure>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dishes;
