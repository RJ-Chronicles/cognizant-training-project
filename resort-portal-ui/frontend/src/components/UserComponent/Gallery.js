import Room1 from '../../Assets/images/room1.jpg';
import Room2 from '../../Assets/images/room2.jpg';
import Room3 from '../../Assets/images/room3.jpg';
import Room4 from '../../Assets/images/room4.jpg';
import Room5 from '../../Assets/images/room5.jpg';
import Room6 from '../../Assets/images/room6.jpg';
// import {Link} from 'react-router-dom';

function Gallery() {
  return (
    <div>
      <div className="our_room">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Gallery</h2>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={Room1} alt="#" />
                  </figure>
                </div>

              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={Room2} alt="#" />
                  </figure>
                </div>

              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={Room3} alt="#" />
                  </figure>
                </div>

              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={Room4} alt="#" />
                  </figure>
                </div>

              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={Room5} alt="#" />
                  </figure>
                </div>

              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={Room6} alt="#" />
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

export default Gallery;
