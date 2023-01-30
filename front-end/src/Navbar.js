import React from 'react'
import logo from './static/Header Logo.png'
import MetamaskButton from './static/Metamask btn.png'
import WalletConnectButton from './static/Wallet Connect btn.png'
import './static/fonts/JuraMedium.ttf';


import './Navbar.css'
import { Link } from 'react-router-dom';
function Navbar(props) {
  
  return (
    <div className='navbarContainer'>
      <nav className='navbar'>
        <div>
        <Link to="/">
          <img className='navLogo' src={logo} id="headerLogo" alt="NO IMG FOUND"></img>
        </Link>
        </div>
        {props.accounts?<div className='datacontainer'>
        {props.accounts ? <p className='navAccountNumber'>{props.accounts[0].slice(0, 5) + ".." + props.accounts[0].slice(-4)}</p> : null}
        {props.accounts ? <div className="usdtBalance">{props.usdtBalance} {props.symbol}</div> : null}
        </div>:null}
        
        {props.accounts ? null :
          <div className='buttonsContainer'>
            <div className='connectButtons blinkA' onClick={props.connectWallet}>CONNECT<br/>METAMASK</div>
            <div className='connectButtons blinkB' onClick={props.walletConnect}>WALLET<br/>CONNECT</div>
          </div>}
      </nav>
    </div>
  )
}

export default Navbar