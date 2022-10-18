import './BuyButtons.css'
import ApproveTokenGIF from './static/Approve Token Button GIF.gif'
import ApproveTokenBLUE from './static/Approve Token Button BLUE.png'
import ApproveTokenMobileBLUE from './static/Approve Token Mobile BLUE.png'
import ApproveTokenMobileRED from './static/Approve Token Mobile RED.png'
import BuyTicketGIF from './static/Buy Ticket Button GIF.gif'
import BuyTicketPINK from './static/Buy Ticket Button RED.png'
import BuyTicketBLUE from './static/Buy Ticket Button BLUE.png'
import BuyTicketMobileBLUE from './static/Buy Ticket Mobile BLUE.png'
import BuyTicketMobileRED from './static/Buy Ticket Mobile RED.png'
import { useEffect, useState } from 'react'
function BuyButtons(props) {
  const [isMobileDevice, setIsMobileDevice] = useState(null)  
  useEffect(() => {
    let details = navigator.userAgent
    let regexp = /android|iphone|kindle|ipad/i;
    let _isMobileDevice = regexp.test(details);
    setIsMobileDevice(_isMobileDevice)
  },[])
  window.addEventListener("resize", function(){
    let details = navigator.userAgent
    let regexp = /android|iphone|kindle|ipad/i;
    let _isMobileDevice = regexp.test(details);
    setIsMobileDevice(_isMobileDevice)
  });
  var approve 
  var buy 
  if (isMobileDevice) {
    if(props.status===0){
      approve = ApproveTokenMobileRED
      buy = BuyTicketMobileRED
    }else if(props.status===1){
      approve = ApproveTokenMobileBLUE
      buy = BuyTicketMobileRED
    }else if(props.status===2){
      approve = ApproveTokenMobileBLUE
      buy = BuyTicketMobileBLUE
    }else{
      approve = ApproveTokenMobileBLUE
      buy = BuyTicketMobileBLUE
    }
  } else {
    if(props.status===0){
      approve = ApproveTokenGIF
      buy = BuyTicketPINK
    }else if(props.status===1){
      approve = ApproveTokenBLUE
      buy = BuyTicketGIF
    }else if(props.status===2){
      approve = ApproveTokenBLUE
      buy = BuyTicketBLUE
    }else{
      approve = ApproveTokenBLUE
      buy = BuyTicketBLUE
    }
  }
  return (
    <div className='buttonContainer'>
        <img className='buttons' alt='NO IMG FOUND' onClick={props.approveTokens} src={approve}></img>
        <img id='depositeBtn' className='buttons' alt='NO IMG FOUND' onClick={props.depositeUSDT} src={buy}></img>
    </div>
  )
}

export default BuyButtons