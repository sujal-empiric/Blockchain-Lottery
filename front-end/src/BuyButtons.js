import "./BuyButtons.css";
import ApproveTokenGIF from "./static/Approve Token Button GIF.gif";
import ApproveTokenBLUE from "./static/Approve Token Button BLUE.png";
import ApproveTokenMobileBLUE from "./static/Approve Token Mobile BLUE.png";
import ApproveTokenMobileRED from "./static/Approve Token Mobile RED.png";
import BuyTicketGIF from "./static/Buy Ticket Button GIF.gif";
import BuyTicketPINK from "./static/Buy Ticket Button RED.png";
import BuyTicketBLUE from "./static/Buy Ticket Button BLUE.png";
import BuyTicketMobileBLUE from "./static/Buy Ticket Mobile BLUE.png";
import BuyTicketMobileRED from "./static/Buy Ticket Mobile RED.png";
import { useEffect, useState } from "react";
function BuyButtons(props) {
  const [isMobileDevice, setIsMobileDevice] = useState(null);
  useEffect(() => {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let _isMobileDevice = regexp.test(details);
    setIsMobileDevice(_isMobileDevice);
  }, []);
  window.addEventListener("resize", function () {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let _isMobileDevice = regexp.test(details);
    setIsMobileDevice(_isMobileDevice);
  });
  var approve;
  var buy;
  if (isMobileDevice) {
    if (props.status === 0) {
      approve = ApproveTokenMobileRED;
      buy = BuyTicketMobileRED;
    } else if (props.status === 1) {
      approve = ApproveTokenMobileBLUE;
      buy = BuyTicketMobileRED;
    } else if (props.status === 2) {
      approve = ApproveTokenMobileBLUE;
      buy = BuyTicketMobileBLUE;
    } else {
      approve = ApproveTokenMobileBLUE;
      buy = BuyTicketMobileBLUE;
    }
  } else {
    if (props.status === 0) {
      approve = ApproveTokenGIF;
      buy = BuyTicketPINK;
    } else if (props.status === 1) {
      approve = ApproveTokenBLUE;
      buy = BuyTicketGIF;
    } else if (props.status === 2) {
      approve = ApproveTokenBLUE;
      buy = BuyTicketBLUE;
    } else {
      approve = ApproveTokenBLUE;
      buy = BuyTicketBLUE;
    }
  }
  
  return (
    <div className="buttonContainer">
      {isMobileDevice ? (
        <>
          {props.walletType==null?<>
              <div className="mainbtns">
                Approve Tokens
              </div>
              <div className="mainbtns">
                Buy
                <br />
                Ticket
              </div>
            </>:null}
 
          {props.status == 0 && props.walletType!==null ? (
            <>
              <div onClick={props.approveTokens} className="blink red">
                Approve Tokens
              </div>
              <div onClick={props.depositeUSDT} className="red">
                Buy
                <br />
                Ticket
              </div>
            </>
          ) : null}
          {props.status == 1 ? (
            <>
              <div onClick={props.approveTokens} className="blue">
                Approve Tokens
              </div>
              <div onClick={props.depositeUSDT} className="blink red">
                Buy
                <br />
                Ticket
              </div>
            </>
          ) : null}
          {props.status == 2 ? (
            <>
              <div onClick={props.approveTokens} className="blue">
                Approve Tokens
              </div>
              <div onClick={props.depositeUSDT} className="blue">
                Buy
                <br />
                Ticket
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          <img
            className="buttons"
            alt="NO IMG FOUND"
            onClick={props.approveTokens}
            src={approve}
          ></img>
          <img
            id="depositeBtn"
            className="buttons"
            alt="NO IMG FOUND"
            onClick={props.depositeUSDT}
            src={buy}
          ></img>
        </>
      )}
    </div>
  );
}

export default BuyButtons;
