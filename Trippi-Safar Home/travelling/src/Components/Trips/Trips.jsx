import React from 'react'
import TripCSS from './../Trips/Trips.module.css'

import trip01 from './../../assets/Trips01.jpg'
import trip02 from './../../assets/Trips02.jpg'
import trip03 from './../../assets/Trips03.jpg'
import trip04 from './../../assets/Trips04.jpg'
import trip05 from './../../assets/Trips05.jpg'
import trip06 from './../../assets/Trips06.jpg'
import trip07 from './../../assets/Trips07.jpg'
import trip08 from './../../assets/Trips08.jpg'
function Trips() {
  return (
    <div className={`${TripCSS.trip_wrapper} section`}>
<h2> Popular Trips</h2>
<div className = {TripCSS.cards}>

<div className = {TripCSS.card}>
<img src = {trip01} alt = "" />
<div className={TripCSS.TripContent}>
    <div className={TripCSS.rating}>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-line"></i>
        <i className="ri-star-line"></i>
    </div>
    <h3>Africa Adventure</h3>
    <div className={TripCSS.TripDetails}>
        <span><i className="ri-calender-line"></i>5 Days</span>
        <span><i className="ri-map-pin-line"></i>3 Places</span>
        <span><i className="ri-flag-line"></i>Africa</span>
    </div>
    <div className={TripCSS.Pricing}>
      <span className={TripCSS.price}>₹99,999</span>
      <button className={TripCSS.book}>Book Now</button>
    </div>
</div>
</div>

<div className = {TripCSS.card}>
<img src = {trip02} alt = "" />
<div className={TripCSS.TripContent}>
    <div className={TripCSS.rating}>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-half-fill"></i>
        <i className="ri-star-line"></i>
    </div>
    <h3>Australia Panorma </h3>
    <div className={TripCSS.TripDetails}>
        <span><i className="ri-calender-line"></i>6 Days</span>
        <span><i className="ri-map-pin-line"></i>4 Places</span>
        <span><i className="ri-flag-line"></i>New Zealand</span>
    </div>
    <div className={TripCSS.Pricing}>
      <span className={TripCSS.price}>₹85,500</span>
      <button className={TripCSS.book}>Book Now</button>
    </div>
</div>
</div>

<div className = {TripCSS.card}>
<img src = {trip03} alt = "" />
<div className={TripCSS.TripContent}>
    <div className={TripCSS.rating}>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
    </div>
    <h3>Australia Panorma </h3>
    <div className={TripCSS.TripDetails}>
        <span><i className="ri-calender-line"></i>8 Days</span>
        <span><i className="ri-map-pin-line"></i>6 Places</span>
        <span><i className="ri-flag-line"></i>Switzerland</span>
    </div>
    <div className={TripCSS.Pricing}>
      <span className={TripCSS.price}>₹1,10,000</span>
      <button className={TripCSS.book}>Book Now</button>
    </div>
</div>
</div>

<div className = {TripCSS.card}>
<img src = {trip04} alt = "" />
<div className={TripCSS.TripContent}>
    <div className={TripCSS.rating}>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-half-fill"></i>
        <i className="ri-star-half-fill"></i>
    </div>
    <h3>North America Explorer</h3>
    <div className={TripCSS.TripDetails}>
        <span><i className="ri-calender-line"></i>7 Days</span>
        <span><i className="ri-map-pin-line"></i>5 Places</span>
        <span><i className="ri-flag-line"></i>North America</span>
    </div>
    <div className={TripCSS.Pricing}>
      <span className={TripCSS.price}>₹72,000</span>
      <button className={TripCSS.book}>Book Now</button>
    </div>
</div>
</div>

<div className = {TripCSS.card}>
<img src = {trip05} alt = "" />
<div className={TripCSS.TripContent}>
    <div className={TripCSS.rating}>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-line"></i>
    </div>
    <h3>India Explorer</h3>
    <div className={TripCSS.TripDetails}>
        <span><i className="ri-calender-line"></i>6 Days</span>
        <span><i className="ri-map-pin-line"></i>4 Places</span>
        <span><i className="ri-flag-line"></i>India</span>
    </div>
    <div className={TripCSS.Pricing}>
      <span className={TripCSS.price}>₹95,000</span>
      <button className={TripCSS.book}>Book Now</button>
    </div>
</div>
</div>

<div className = {TripCSS.card}>
<img src = {trip06} alt = "" />
<div className={TripCSS.TripContent}>
    <div className={TripCSS.rating}>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-half-fill"></i>
        <i className="ri-star-line"></i>
    </div>
    <h3>France Discovery</h3>
    <div className={TripCSS.TripDetails}>
        <span><i className="ri-calender-line"></i>5 Days</span>
        <span><i className="ri-map-pin-line"></i>3 Places</span>
        <span><i className="ri-flag-line"></i>France</span>
    </div>
    <div className={TripCSS.Pricing}>
      <span className={TripCSS.price}>₹80,000</span>
      <button className={TripCSS.book}>Book Now</button>
    </div>
</div>
</div>

<div className = {TripCSS.card}>
<img src = {trip07} alt = "trip01" />
<div className={TripCSS.TripContent}>
    <div className={TripCSS.rating}>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-half-fill"></i>
        <i className="ri-star-line"></i>
    </div>
    <h3>Japan Journey</h3>
    <div className={TripCSS.TripDetails}>
        <span><i className="ri-calender-line"></i>7 Days</span>
        <span><i className="ri-map-pin-line"></i>5 Places</span>
        <span><i className="ri-flag-line"></i>Japan</span>
    </div>
    <div className={TripCSS.Pricing}>
      <span className={TripCSS.price}>₹1,25,000</span>
      <button className={TripCSS.book}>Book Now</button>
    </div>
</div>
</div>

<div className = {TripCSS.card}>
<img src = {trip08} alt = "trip01" />
<div className={TripCSS.TripContent}>
    <div className={TripCSS.rating}>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-fill"></i>
        <i className="ri-star-half-fill"></i>
    </div>
    <h3>Australia Panorma </h3>
    <div className={TripCSS.TripDetails}>
        <span><i className="ri-calender-line"></i>10 Days</span>
        <span><i className="ri-map-pin-line"></i>8 Places</span>
        <span><i className="ri-flag-line"></i>Australia</span>
    </div>
    <div className={TripCSS.Pricing}>
      <span className={TripCSS.price}>₹1,40,000</span>
      <button className={TripCSS.book}>Book Now</button>
    </div>
</div>
</div>
</div>
    </div>
  )
}

export default Trips
