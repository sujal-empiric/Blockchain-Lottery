import React from 'react'
import './Footer.css'
import NeonFlames from './static/Flames.png'
import Instagram from './static/Instagram.png'
import Web from './static/Web.png'
import Twitter from './static/Twitter.png'
import YouTube from './static/YouTube.png'
import MiniLogo from './static/Mini Logo.png'
function Footer() {
  return (
    <div className='FooterContainer'>
        <div className='LinkContainer'>
            <ul className='LinkList'>
                <li className='Links'>About</li>
                <li className='Links'>Feature</li>
                <li className='Links'>Pricing</li>
                <li className='Links'>Careers</li>
                <li className='Links'>Help</li>
                <li className='Links'>Privacy Policy</li>
            </ul>
        </div>
        <div className='MainCopyLinkContainer'>
            <div className='copyrightContainer'>
                <img className='minilogo' src={MiniLogo} alt="NO IMG FOUND"></img>
                <p className='copyright'>© 2022 Diablo</p>
            </div>
            <div className='linklogoContainer'>
                <img className='linklogos' src={Instagram} alt="NO IMG FOUND"></img>
                <img className='linklogos' src={Web} alt="NO IMG FOUND"></img>
                <img className='linklogos' src={Twitter} alt="NO IMG FOUND"></img>
                <img className='linklogos' src={YouTube} alt="NO IMG FOUND"></img>
            </div>
        </div>
        <div>
            <img className='NeonFlames' src={NeonFlames} alt='NO IMG FOUND'></img>
        </div>
    </div>
  )
}

export default Footer   