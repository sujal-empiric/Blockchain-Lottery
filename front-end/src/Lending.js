import React, { useState } from "react";
import moment from 'moment-timezone'
import "./Lending.css";
import MainLogo from "./static/Diablo.gif";
import "./static/fonts/JockeyOne-Regular.ttf";
function Lending(props) {
    const [time, setTime] = useState(null);
    const updateTime = () => {
        // console.log(moment().tz("UTC").format('h:mm:ss'));
        // const time1 = moment().tz("UTC").subtract(moment(0,'HH'))
        const time1 = moment(moment().tz('GMT').date()+1).tz('GMT').subtract(moment().tz("GMT"))
        // console.log(moment({ hour:0, minute:0 }).format('H:mm:ss'))
        setTime(time1.format('HH:mm:ss'))
    };
    setInterval(updateTime);
    return (
        <div className="LendingContainer">
                <img id="mainLogo" src={MainLogo} alt="NO IMG FOUND"></img>
                <div className="infoContainer">
                    <div id="headingContainer">
                        <h1 id="headingText" className="margin5">Blockchain<br/>Lottery</h1>
                    </div>
                    <div id="pricepoolContainer">
                        <h1 id="pricepoolText">{props.pricePool}$</h1>
                    </div>
                    <div>
                        <div className="timeInfo">
                            <p className="plainWhite margin5">Time To Roll </p>
                            <p className="neonRed margin5" >{time}</p>
                        </div>
                        <div className="timeInfo">
                            <p className="plainWhite margin5">Daily Lottery </p>
                            <p className="neonRed margin5"> 00:00 GMT</p>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Lending;
