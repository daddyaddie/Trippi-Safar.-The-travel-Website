import React from 'react'
import footerCSS from './../Footer/Footer.module.css'
function Footer() {
  return (
    <div className= {`${footerCSS.Footer_wrapper} section`}>
<div className={footerCSS.top_container}>
    <div className={footerCSS.logo}>
        <a href="#">Trippi-Safar</a>
    </div>
    <div className={footerCSS .social}>
        <i className='ri-facebook-line'></i>
        <i className='ri-instagram-line'></i>
        <i className='ri-twitter-x-line'></i>
        <i className='ri-youtube-line'></i>
    </div>
</div>
<div className={footerCSS .bottom_container}>
    <div className={footerCSS.footerLinks}>
<h3>About Travel</h3>
<ul>
    <li><a href="#">About US</a></li>
    <li><a href="#">Our History</a></li>
    <li><a href="#"> Reviews</a></li>
    <li><a href="#"> Destinations</a></li>
    <li><a href="#"> Careers</a></li>
</ul>
</div>
    <div className={footerCSS.footerLinks}>
<h3>Destinations</h3>
<ul>
    <li><a href="#">USA</a></li>
    <li><a href="#">Latin Amerika</a></li>
    <li><a href="#"> Asia</a></li>
    <li><a href="#"> Europe</a></li>
    <li><a href="#"> Africa</a></li>
</ul>
</div>
    <div className={footerCSS.footerLinks}>
<h3>Support</h3>
<ul>
    <li><a href="#">FAQ</a></li>
    <li><a href="#">Contact</a></li>
    <li><a href="#"> Request</a></li>
    <li><a href="#"> Booking Conditions</a></li>
    <li><a href="#"> Recommendation</a></li>
</ul>
</div>
    <div className={footerCSS.footerLinks}>
<h3>Our NewsLetter</h3>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, quod.</p>
<div className={footerCSS.inputWrapper}>
    <input type="email"placeholder='Enter your mail' />
    <button>Subscribe</button>
</div>
</div>
    </div>
    </div>
  )
}

export default Footer
