import React from 'react'
import navCSS from './../Nav/Nav.module.css'
function Nav() {
  const menu = React.useRef();
const MenuHandler = () => {
menu.current.classList.toggle(navCSS.activeMenu);
}
  return (
    <div className  = {navCSS.Nav_wrapper}>
<div className = {navCSS.logo}>
  <a href="#">Trippi-<span>Safar</span></a></div>
  <ul ref={menu}>
    <li><a href="#">Home</a></li>
    <li><a href="#">Trips</a></li>
    <li><a href="#">Destinations</a></li>
    <li><a href="#">Searches</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Popular Destination</a></li>
  </ul>
<div className={navCSS.nav_btns}>
  <div className={navCSS.search_wrapper}>
<i className='ri-search-line'></i>
  <input type="text" placeholder='Search Places' />
  </div>

  <button className={navCSS.signup_btn}>Sign Up</button>
<i className='ri-menu-2-line' onClick={MenuHandler} id ={navCSS.bars} ></i>

</div>

    </div>
  )
}

export default Nav
