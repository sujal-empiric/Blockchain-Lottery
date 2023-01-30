import React from "react";
import logo from './static/Header Logo.png'
import Footer from "./Footer";
import './PrivacyPolicy.css'
import { Link } from "react-router-dom";
function PrivacyPolicy() {
  return (
    <>
      <div className="navbarContainer">
        <nav className="navbar">
          <div>
            <Link to="/">

            <img
              className="navLogo"
              src={logo}
              id="headerLogo"
              alt="NO IMG FOUND"
              ></img>
              </Link>
          </div>
          <div>
            <h1 className="heading">Privacy Policy</h1>
          </div>
        </nav>
      </div>
      <div className="privacyContainer">
        <p className="privacyText">This privacy policy has been compiled to inform and serve those customers of Diablo.bet who may be concerned about exactly how their personal information may be used online. Please read this privacy policy carefully in order to obtain a clear and accurate understanding of how we collect, use, protect and/or otherwise handle your personal and personally identifiable information according to our guidelines.<br/><br/>

Information Collected
When using or ordering from our website, we may ask you for a number of personal information. Whenever you interact with our site and service, the servers at Diablo.bet will also keep an activity log. This is unique and will include information such as your IP address, time and date of access, the pages visited and used, language used, and the type of browser you are using. Generally speaking, the only way we collect personal information is if you provide it to us on a voluntary basis (such as initiating a transaction).<br/><br/>

Means of Collecting & Processing Data.
In addition to collecting much of your personal data and information when you initiate a transaction, we may receive personal information from other online vendors and service providers that may have referred you to our site. Third party providers may also be used for support, to process online transactions and help maintain your online accounts. In addition, we will have access to all of this information in order to handle order and transaction processing. This information is also used to provide you with a number of promotional offers and information regarding new or existing Diablo.bet products and services. This information is only disclosed to our staff and third parties involved in completing your transactions.<br/><br/>

How We Use Your Information
The information which is collected and that you have provided is normally used to process your transactions and providing customer support as needed. We may also choose to use the information for any other business purpose related to operating the site, program, products and services offered by Diablo.bet<br/><br/>

From time to time, it may also be necessary to share some of your information with affiliates, agents and/or subsidiaries for the purposes of technical support and the processing of transactions. We may also invite you to participate in surveys or contests. This is totally voluntary and you have the choice whether or not to disclose any personal information, which could include any of the items listed above. By accepting any prize or winnings, you are authorizing the use of your name and likeness for advertising and promotional purposes. There will be no additional compensation for said use, unless prohibited by law. We may also decide to use your personal information to provide you with information on our other products, services and promotions. We will not sell, lease, share or rent your personal information unless specified in this Privacy Policy.
<br/><br/>
Exceptions To Personal Information Disclosure
We may disclose your personal information if required to do so by law or any legal authority. If this action is needed to conform to applicable laws or complying with any legal process served on us, to protect and defend our rights and property, or to act in order to protect the personal safety of our users or the public. In the case of a future sale, bankruptcy or closure of the company, we are legally entitled to share or sell all of your personal information and all other information you have provided to us.
<br/><br/>
Use of Cookeis
We do use cookies, small text files stored on your computer that record your preferences, to track your use of the Diablo.bet website. This information and data received through the use of cookies is intended to help improve the overall service and make things easier and more convenient for you. Users do have the ability to choose whether to accept or decline cookies by changing their browser settings. However, please note that by declining cookies, some of the more interactive features of the website may not be fully experienced or work properly.
<br/><br/>
Information Security
DIablo.bet site has taken active measures to secure and protect the security of all your information. Every piece of data and information obtained is immediately stored in a password protected database. The database itself is secured behind an active, state of the art firewall which supports SSL Version 3 and 128 bit encryption.
<br/><br/>
Protection of Minors
This website is not intended for anyone under the age of 18 or their legal age of consent in their own country of residence. Anyone who chooses to use this website or associated services is certifying and representing they are over the age of 18.
<br/><br/>
Location of Information
Any information collected on this website or through any third party affiliate or agent may be stored and/or processed in any country in which we or our affiliates, subsidiaries or agents maintain any type of facility. By using this service, you agree to any transfer of information outside your own country of residence.
<br/><br/>
Third Party Websites, Links & Practices
It is possible that users might follow links to or from our DIablo.bet website. This could lead to information being provided to third parties. As these are all sites independent of DIablo.bet, we cannot ensure or guarantee the protection of this information in any way. Those third party companies are not bound by this Privacy Policy in any way. If there is ever a question in this regard, please check the Privacy Policy of the third party. We will neither assume nor be held accountable for any practices, actions or policies of any third parties just as we cannot be considered responsible for any content or policies used by third party websites.
<br/><br/>
Disclaimer of Legal Responsibility
We are not responsible for ay event(s) outside our direct control. Furthermore, this service is offered on an "AS-IS" and "AS-AVAILABLE" basis, without liability of any kind. There is also no guarantee that this site will operate in an error-free manner regarding the privacy and protection of your personal information. This means we will not be held responsible for any indirect, incidental, consequential or punitive damages related to the use of or release of any personal information.
<br/><br/>
Consent to Privacy Statement
By using our service and website, you are agreeing to be bound by all the terms and provisions of this Privacy Policy. This is our full, entire and exclusive Privacy Statement which supersedes any earlier version. Our Terms and Conditions of Use (which can be found at: T&C) do take precedence should there be any conflicting provision found within this Privacy Policy. Furthermore, we retain the right to update this Privacy Policy at any time. Please periodically review this statement. Your continued use of this site and service constitutes your agreement and acceptance of this Privacy Policy and any updates.
<br/><br/>
If you have any questions or concerns about our Privacy Policy, Terms of Use, or how we handle personal information, please contact us.</p>
      </div>
        <Footer/>
    </>
  );
}

export default PrivacyPolicy;
