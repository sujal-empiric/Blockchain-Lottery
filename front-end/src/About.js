import React from 'react'
import './About.css'
import Dollar from './static/Dollar.png'
import Bell from './static/Bell.png'
import Lock from './static/Lock.png'
function About() {
    window.addEventListener("load", function (e) {
        var container = document.querySelector(".BoxContainer");
        var middle = container.children[Math.floor((container.children.length - 1) / 2)];
        container.scrollLeft = middle.offsetLeft +
            middle.offsetWidth / 2 - container.offsetWidth / 2;
    });
    return (
        <div className='backgroundContainer'>
            <div className='MainConetentContainer'>
                <h1 className='MainHeading'>Blockchain Lottery</h1>
                <p className='MainContent'>Diablo.bet is a crypto lottery based on a smart contract
                    in Binance Smart Chain <br/> (BEP 20), the contract code is
                    publicly available on the site and anyone can read it.
                    The terms of participation are simple and transparent. 
                    Participant connect his cryptocurrency wallet,
                    then chooses stablecoin with which he wants to pay for
                    a ticket on the network (BEP 20) and by the third click
                    buys a ticket 🎫 with a certain number, and that's it.
                    From that moment everyone who bought a ticket this
                    way automatically becomes a participant of the
                    drawing.</p>
            </div>
            <div className='BoxContainer'>
                <div id="b-1" className='Box'>
                    <img src={Lock} alt="NO IMG FOUND" className='BoxIcon'></img>
                    <h4 className='BoxHeading'>smart contract deployed</h4>
                    <p className='BoxContent'>The lottery takes
                    place every day at
                    00:00 GMT (Greenwich
                    Time), at which time
                    the smart contract
                    reaches its
                    conclusion, and with a
                    SHA256 randomizer
                    selects the lucky
                    ticket whose owner
                    wins the total value.</p>
                </div>
                <div id="b-2" className='Box'>
                    <img src={Dollar} alt="NO IMG FOUND" className='BoxIcon'></img>
                    <h4 className='BoxHeading'>Buy a Lottery ticket</h4>
                    <p className='BoxContent'>In addition to the network
                        fee (BEP 20) an additional
                        fee of 0.00048976531 BNB per
                        transaction is charged.
                    </p>
                </div>
                <div id="b-3" className='Box'>
                    <img src={Bell} alt="NO IMG FOUND" className='BoxIcon'></img>
                    <h4 className='BoxHeading'>Wait for the lottery to open</h4>
                    <p className='BoxContent'>Despite the utmost
                    honesty in our team's
                    intentions to create
                    the world's fairest
                    lottery, we
                    recommend not using
                    your "primary"
                    cryptocurrency wallet
                    to interact with any
                    smart contracts on
                    the internet, including
                    ours.</p>
                </div>
            </div>
        </div>
    )
}

export default About