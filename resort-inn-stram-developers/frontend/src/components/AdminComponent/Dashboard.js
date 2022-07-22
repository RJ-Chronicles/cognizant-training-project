import { useEffect, useState } from 'react'
import LoginService from "../../Services/LoginService";
import BookingList from './BookingList'
import '../../Assets/css/dash.css'

function Dashboard() {
  const user = LoginService.getUserName();
  // const reload= true;
  console.log(user);
  let [edata, setEdata] = useState([])


  // 3. Create out useEffect function
  useEffect(() => {
    // window.location.reload(reload)
    // reload=false;
    fetch("http://localhost:8080/api/v1/transaction/dashboard")
      .then(response => response.json())

      .then(data => setEdata({
        "bookingCount": data.bookingCount,
        "guestCount": data.guestCount,
        "transactionAmountTotal": data.transactionAmountTotal
      }))

  }, [])
  return (
    <div className="" >
      <h2 className="text-center" style={{ marginTop: "110px" }}>

        <small className="text" >Welcome {user} </small></h2>

      <div className='container'>
        <div class="row mt-4">

          <div class="col-md-6 col-xl-4" >
            <div class="card mb-3 widget-content ">
              <div class="widget-content-wrapper text-black" >
                <div class="widget-content-left ps-4">
                  <div class="widget-heading">Transaction</div>
                  <div class="widget-subheading">Total Transaction</div>
                </div>
                <div class="widget-content-right ps-4">
                  <div class="widget-numbers text-black"><span>{edata.transactionAmountTotal}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-4">
            <div class="card mb-3 widget-content bg-arielle-smile">
              <div class="widget-content-wrapper text-black">
                <div class="widget-content-left ps-4">
                  <div class="widget-heading">Booking</div>
                  <div class="widget-subheading">Total Booking Count</div>
                </div>
                <div class="widget-content-right ps-4">
                  <div class="widget-numbers text-black"><span>{edata.bookingCount}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-4">
            <div class="card mb-3 widget-content bg-grow-early">
              <div class="widget-content-wrapper text-black">
                <div class="widget-content-left ps-4">
                  <div class="widget-heading">Guest</div>
                  <div class="widget-subheading">Total Guest Count</div>
                </div>
                <div class="widget-content-right ps-4">
                  <div class="widget-numbers text-black"><span>{edata.guestCount}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingList />
    </div>


  )

}
export default Dashboard;