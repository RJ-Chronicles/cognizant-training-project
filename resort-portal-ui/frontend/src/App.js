import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
/************* All my PUblic components are here  *******************/
import Home from './components/Home'
import Nav from './components/PublicComponents/Nav'
import Login from './components/AuthenticationComponents/Login'
import Register from './components/AuthenticationComponents/Signup';
import ForgetPassword from './components/AuthenticationComponents/ForgetPassword.js';
import ValidateOtp from './components/AuthenticationComponents/ValidateOtp';
import ResetPasswordOtp from './components/AuthenticationComponents/ResetPasswordOtp';
import LoginService from "./Services/LoginService"

/************* All my User components are here  *******************/
import GuestFeedback from './components/UserComponent/GuestFeedback';
import Booking from './components/UserComponent/Booking'
import CancellationReschedule from './components/UserComponent/CancellationReschedule'
import Cancellation from './components/UserComponent/Cancellation'
import Payment from './components/UserComponent/Payment'
import GuestDashboard from './components/UserComponent/GuestDashboard'
import Reschedule from './components/UserComponent/Reschedule';

/************* All my Admin components are here  *******************/
import FeedbackList from './components/AdminComponent/FeedbackList';
import RoomList from './components/AdminComponent/RoomList';
import BookingList from './components/AdminComponent/BookingList'
import AddRoom from './components/AdminComponent/AddRoom';
import Dashboard from './components/AdminComponent/Dashboard'

function App() {
  let isLoggedInUser = LoginService.isLoggedIn();
  const role =  LoginService.getUserRole();
  //let user = localStorage.getItem('user') ? localStorage.getItem('user') : '';
  return (
    <div className="">

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
         
          {

            isLoggedInUser ?
              <>
                {
                  role === "ROLE_USER" ?
                    <>
                      <Route path='/guest-dashboard' element={<GuestDashboard />}></Route>
                      <Route path='/guest-dashboard/feedback' element={<GuestFeedback />}></Route>
                      <Route path='/guest-dashboard/booking' element={<Booking />}></Route>
                      <Route path='/guest-dashboard/user-booking-list' element={<CancellationReschedule />}></Route>
                      <Route path='/guest-dashboard/cancellation' element={<Cancellation />}></Route>
                      <Route path='/guest-dashboard/payment' element={<Payment />}></Route>
                      <Route path='/guest-dashboard/reschedule' element={<Reschedule />}></Route>
                      
                    </>
                    :

                    <>
                      <Route path='/dashboard/feedback-list' element={<FeedbackList />}></Route>
                      <Route path='/dashboard/room-list' element={<RoomList />}></Route>
                      <Route path='/dashboard/booking-list' element={<BookingList />}></Route>
                      <Route path='/dashboard/add-room' element={<AddRoom />}></Route>
                      <Route path='/dashboard' element={<Dashboard />}></Route>
                    </>
                }

              </>
              :
              <>

                <Route exact path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/register/otp" element={<ValidateOtp />}></Route>
                <Route path="/forget-pwd" element={<ForgetPassword />}></Route>
                <Route path="/forget-pwd/otp"element={<ResetPasswordOtp/>}></Route>
                <Route path="/guest-dashboard/feedback" element={<Register />}></Route>
              </>
          }





        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

        {/* <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route path='/guest-dashboard' element={<GuestDashboard />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/guest-dashboard/reschedule' element={<Reschedule />}></Route>

          <Route path='/guest-dashboard/booking' element={<Booking />}></Route>
          <Route path='/guest-dashboard/cancellation' element={<Cancellation />}></Route>
          <Route path='/guest-dashboard/user-booking-list' element={<CancellationReschedule />}></Route>
          <Route path='/guest-dashboard/feedback' element={<GuestFeedback />}></Route>
          <Route path='/guest-dashboard/payment' element={<Payment />}></Route>
          <Route path='/dashboard/feedback-list' element={<FeedbackList />}></Route>
          <Route path='/dashboard/booking-list' element={<BookingList />}></Route>
          <Route path='/dashboard/add-room' element={<AddRoom />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/register/otp" element={<ValidateOtp />}></Route>
          <Route path="/forget-pwd" element={<ForgetPassword />}></Route>
          <Route path="/forget-pwd/otp" element={<ResetPasswordOtp />}></Route> */}


  
