import React from 'react'
import aboutCSS from './../About/About.module.css'

import aboutImg from './../../assets/about-bg.png'
function About() {
  return (
    <div className={`${aboutCSS.about_wrapper} section`}>
<div className={aboutCSS.about_image}>
    <img src = {aboutImg} alt ="about-img" />
</div>
<div className={aboutCSS.about_content}>
    <h2> Discover Organized <br/> Advantures the ,<br/>
    Ulitmate Travel Hack</h2>

<p>We are a team of travel enthusiasts who believe that the best way to explore the world is through organized adventures. Our mission is to provide you with unforgettable experiences that are well-planned, safe, and enjoyable. Whether you're looking for a solo trip, a family vacation, or a group adventure, we've got you covered.</p>
<div className={aboutCSS.about}>
    <p><i className="ri-building-4-line"></i>Accommodation</p>
    <p><i className="ri-car-line"></i>Transpotation allowance</p>
    <p><i className="ri-magic-line"></i>Exclusive Experience</p>
    <p><i className="ri-instance-line"></i>local recommendations</p>
    <p><i className="ri-pin-distance-line"></i>personalized trip crafting</p>
    <p><i className="ri-phone-line"></i>27/7 Support</p>
</div>

</div>
    </div>
  )
}

export default About
