import React from 'react'
import './Footer.css'
import NeonFlames from './static/Flames.png'
import Instagram from './static/Instagram.png'
import Telegram from './static/Telegram.png'
import Twitter from './static/Twitter.png'
import MiniLogo from './static/Mini Logo.png'
function Footer() {
  return (
    <div className='FooterContainer'>
        <div className='LinkContainer'>
            <ul className='LinkList'>
                <li className='Links'>Diablo.bet <a href='https://bscscan.com/address/0x6fe928971bfc1c6d2de8e60e28c9ec3e42ef16b0' target="_blank">Smart Contract</a> & <a href='/privacy-policy'>Privacy Policy</a></li>
            </ul>
        </div>
        <div className='MainCopyLinkContainer'>
            <div className='copyrightContainer'>
                <img className='minilogo' src={MiniLogo} alt="NO IMG FOUND"></img>
                <p className='copyright'>© 2022 Diablo</p>
            </div>
            <div className='linklogoContainer'>
                <a target="_blank" href='https://instagram.com/diablo.bet'><img className='linklogos' src={Instagram} alt="NO IMG FOUND"></img></a>
                <a target="_blank" href='https://t.me/diablolottery'><img className='linklogos' src={Telegram} alt="NO IMG FOUND"></img></a>
                <a target="_blank" href='https://twitter.com/DiabloBet'><img className='linklogos' src={Twitter} alt="NO IMG FOUND"></img></a>
            </div>
        </div>
        <div>
            <img className='NeonFlames' src={NeonFlames} alt='NO IMG FOUND'></img>
        </div>
    </div>
  )
}

export default Footer   