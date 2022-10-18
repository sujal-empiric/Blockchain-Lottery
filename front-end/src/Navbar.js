import React from 'react'
import logo from './static/Header Logo.png'
import MetamaskButton from './static/Metamask btn.png'
import WalletConnectButton from './static/Wallet Connect btn.png'
import TronLinkButton from './static/Tron Link btn.png'
import './static/fonts/JuraMedium.ttf';

import './Navbar.css'
function Navbar(props) {

  return (
    <div className='navbarContainer'>
      <nav className='navbar'>
        <div>
          <img className='navLogo' src={logo} id="headerLogo" alt="NO IMG FOUND"></img>
        </div>
        {props.accounts?<div className='datacontainer'>
        {props.accounts ? <p className='navAccountNumber'>{props.accounts[0].slice(0, 5) + ".." + props.accounts[0].slice(-4)}</p> : null}
        {props.accounts ? <div className="usdtBalance">{props.usdtBalance} {props.symbol}</div> : null}
        </div>:null}
        
        {props.accounts ? null :
          <div className='buttonsContainer'>
            <img className='connectButtons' onClick={props.connectWallet} src={MetamaskButton} alt="NO IMG FOUND"></img>
            <img className='connectButtons' onClick={props.walletConnect} src={WalletConnectButton} alt="NO IMG FOUND"></img>
            <img id='tronButton' className='connectButtons' onClick={props.tronWebConnect} src={TronLinkButton} alt="NO IMG FOUND"></img>
          </div>}
      </nav>
    </div>
  )
}

export default Navbar