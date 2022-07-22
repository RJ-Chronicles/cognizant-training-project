import '../../Assets/css/nav.css'
import LoginService from '../../Services/LoginService';

function Nav() {
    const isLoginUser = LoginService.isLoggedIn();

    const role = LoginService.getUserRole();
    console.log(role);
    console.log("Login value :  " + isLoginUser)

    function handleLogout() {
        console.log("Logut clicked")
        localStorage.removeItem('token');

        localStorage.removeItem('role');
        window.location.assign = "/";
    }
    return (
        <div className="mars-nav-bar">
            <nav className="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
                <div className="container">
                    <a href="/" className="navbar-brand">
                        &nbsp;
                        COMFORT INN
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div id="navbarCollapse" className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="/" className="nav-link active">
                                    Home
                                </a>
                            </li>

                            {
                                isLoginUser ?
                                    <>
                                        {
                                            role === "ROLE_USER" ?
                                                <>
                                                    <li className="nav-item">
                                                        <a href="/guest-dashboard" className="nav-link active">
                                                            Dashboard
                                                        </a>
                                                    </li>

                                                    <li className="nav-item">
                                                        <a href="/guest-dashboard/booking" className="nav-link active">
                                                            Booking
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="/guest-dashboard/user-booking-list" className="nav-link active">
                                                            List
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="/guest-dashboard/feedback" className="nav-link active">
                                                            Feedback
                                                        </a>
                                                    </li>

                                                    <li className="nav-item">
                                                        <a href="" onClick={handleLogout} className="nav-link active">
                                                            Logout
                                                        </a>
                                                    </li>
                                                </>

                                                :

                                                <>
                                                    <li className="nav-item">
                                                        <a href="/dashboard" className="nav-link active">
                                                            Dashboard
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="/dashboard/room-list" className="nav-link active">
                                                            Room
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="/dashboard/feedback-list" className="nav-link active">
                                                            Feedback
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="" onClick={handleLogout} className="nav-link active">
                                                            Logout
                                                        </a>
                                                    </li>

                                                </>
                                        }





                                    </>

                                    :
                                    <>
                                        <li className="nav-item">
                                            <a href="/login" className="nav-link active">
                                                Login
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/register" className="nav-link active">
                                                SignUp
                                            </a>
                                        </li>

                                    </>
                            }

                        </ul>
                    </div>



                </div>

            </nav>

        </div>
    )
}
export default Nav;
