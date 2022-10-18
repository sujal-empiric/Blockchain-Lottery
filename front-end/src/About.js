import React from 'react'
import './About.css'  
import Dollar from './static/Dollar.png'
import Bell from './static/Bell.png'
import Lock from './static/Lock.png'
function About() {
    window.addEventListener("load", function(e) {
        var container = document.querySelector(".BoxContainer");
        var middle = container.children[Math.floor((container.children.length - 1) / 2)];
        container.scrollLeft = middle.offsetLeft +
          middle.offsetWidth / 2 - container.offsetWidth / 2;
    });
    return (
        <div className='backgroundContainer'>
            <div className='MainConetentContainer'>
                <h1 className='MainHeading'>Blockchain Lottery</h1>
                <p className='MainContent'>Blockchain Lottery is based on a smart contract deployed on Polygon mainnet. You can use your Tether Tokens to participate in Lottery.
                    Buy a Lottery ticket with a 10 USDT and Wait for the lottery to open, you'll get your lottery ticket 5 minutes before the lottery time
                    and if you are the lucky one the price Pool will be air droped at your address. as a Commission we take 0.5 USDT from your Deposite.
                    An inbuilt smart contract function determines the Lottery Winner.</p>
            </div>
            <div className='BoxContainer'>
                <div id="b-1" className='Box'>
                    <img src={Lock} alt="NO IMG FOUND" className='BoxIcon'></img>
                    <h4 className='BoxHeading'>smart contract deployed</h4>
                    <p className='BoxContent'>Blockchain Lottery is based on a smart contract deployed on Polygon mainnet. You can use your Tether Tokens to participate in the Lottery.An inbuilt smart contract function determines the Lottery Winner.</p>
                </div>
                <div id="b-2" className='Box'>
                    <img src={Dollar} alt="NO IMG FOUND" className='BoxIcon'></img>
                    <h4 className='BoxHeading'>Buy a Lottery ticket</h4>
                    <p className='BoxContent'>Buy a Lottery ticket with a 10 USDT. As a Commission, we take 0.5 USDT from your Deposit.</p>
                </div>
                <div id="b-3" className='Box'>
                    <img src={Bell} alt="NO IMG FOUND" className='BoxIcon'></img>
                    <h4 className='BoxHeading'>Wait for the lottery to open</h4>
                    <p className='BoxContent'>Wait for the lottery to open, you'll get your lottery ticket 5 minutes before the lottery time.
                    if you are the lucky one the price Pool will be air droped at your address.</p>
                </div>
            </div>
        </div>
    )
}

export default About