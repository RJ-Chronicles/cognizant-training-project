import React from "react";
import './footer.css'
import { NavLink } from "react-router-dom";

function Footer() {
   return (

      <div className="stram-footer">
         <footer className="footer">
            <div className="container">
               <ul className="list-inline mb-0 text-center">
                  <li className="list-inline-item">
                     <a href=""><span className="fa fa-twitter"></span></a>
                  </li>

                  <li className="list-inline-item">
                     <a href=""><span className="fa fa-google-plus"></span></a>
                  </li>

                  <li className="list-inline-item">
                     <a href=""><span className="fa fa-instagram"></span></a>
                  </li>

                  <li className="list-inline-item">
                     <a href=""><span className="fa fa-envelope-o"></span></a>
                  </li>
               </ul>
            </div>
            <p className="lead" style = {{color : "#FFFFFF"}}>
               © Copyright 2022 by Stram Developers. All rights reserved.
            </p>
         </footer>
      </div>
   )
}

export default Footer;