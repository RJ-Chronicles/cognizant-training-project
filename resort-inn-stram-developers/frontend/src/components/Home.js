import React from "react";
import "../Assets/css/home.css";

import Contact from "./HomeComponents/Contact";
import About from "./HomeComponents/About";
import Testimonial from "./HomeComponents/Testimonial";
import OurRoom from "./HomeComponents/OurRoom";
import Hero from "./HomeComponents/Hero";
import Footer from "./PublicComponents/Footer"

// import Footer from "./HomeComponents/Footer";

function Home() {
  return (
    <div>
     
      <Hero />
      <About />
      <OurRoom />
      <Contact />
      <Testimonial />
      <Footer/>
    </div>
  );
}

export default Home;
