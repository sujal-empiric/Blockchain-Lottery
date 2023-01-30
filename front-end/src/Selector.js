
import React from "react";
import './Selector.css'
function Selector(props) {
    const selectToken = async (e)=>{
        console.log(e.target.value)
        window.tokenName = e.target.value
        if(props.walletType=="WALLETCONNECT"){
            props.walletConnect()
        }else{
            props.connectWallet()
        }
    }
    const selectTicketAmount = (e)=>{
        window.ticketAmount = Number(e.target.value)
    }
    return (
        <div className="selector-container">
            <select className="tokenSelector" onChange={selectToken}>
                <option value="USDT">USDT</option>
                <option value="USDC">USDC</option>
                <option value="BUSD">BUSD</option>
                <option value="DAI">DAI</option>
                <option value="TUSD">TUSD</option>
                <option value="USDD">USDD</option>
            </select>
            <input className="input" type="number" onChange={selectTicketAmount} placeholder="Enter amount to bet"/>
            
        </div>
    );
}

export default Selector;
