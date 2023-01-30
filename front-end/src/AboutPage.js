/* global BigInt */
import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./App.css";
import "./index.css";
import { ethers } from "ethers";
import usdtabi from "./static/Abi/USDT.json";
import blockchainlotteryV2 from "./static/Abi/LotteryV2.json";

import "./AboutPage.css";

import NiralDhameliya from "./static/Niral Dhameliya.png";
import AnnaKim from "./static/Anna Kim.png";
import GrantVardanyan from "./static/Grant Vardanyan.png";
import EvgeniySivokon from "./static/Evgeniy Sivokon.png";
import OlehMiller from "./static/Oleh Miller.png";

import India from "./static/India.png";
import Ukrain from "./static/Ukrain.png";
import Israel from "./static/Israel.png";

function AboutPage() {
  const [walletType, setWalletType] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [amount, setAmount] = useState(null);
  const [networkErr, setNetworkErr] = useState(null);
  const [status, setStatus] = useState(0);
  const [pricePool, setPricePool] = useState(null);
  const [txStatus, setTxStatus] = useState(null);

  const [symbol, setSymbol] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(null);

  const walletConnect = async () => {
    try {
      if (window.tokenName == null) {
        window.tokenName = "USDT";
      }
      const WalletConnectProvider = window.WalletConnectProvider;
      var provider = new WalletConnectProvider.default({
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        // bridge: 'https://bridge.walletconnect.org',
      });
      setWalletType("WALLETCONNECT");
      console.log("Tringring QR Code");
      await provider.enable();
      console.log("TRIGER FINISH");
      const Tprovider = new ethers.providers.Web3Provider(provider);
      const Tsigner = Tprovider.getSigner();
      console.log(Tsigner);
      let Taccounts = [];
      Taccounts.push(await Tsigner.getAddress());
      console.log(Taccounts);
      setAccounts(Taccounts);
      //matic mainnet chain id = 137
      //matic testnet chain id = 80001
      //BNB Mainnet chain id = 56
      //BNB testnet chain id = 97
      console.log(provider);
      let TchainId = provider.chainId;
      console.log(TchainId);
      setChainId(TchainId);
      if (TchainId === 56) {
        console.log(TchainId);
        createLotteryContract(TchainId, blockchainlotteryV2, Tsigner);
        createTokenContract(TchainId, usdtabi, Tsigner);
      } else if (TchainId === 97) {
        console.log(TchainId);
        createLotteryContract(TchainId, blockchainlotteryV2, Tsigner);
        createTokenContract(TchainId, usdtabi, Tsigner);
      } else {
        //set chain id error
      }
    } catch (e) {
      console.log(e);
    }
  };
  const connectWallet = async () => {
    if (window.tokenName == null) {
      window.tokenName = "USDT";
    }
    try {
      console.log(
        "connectWallet tokenName==================>",
        window.tokenName
      );
      let details = navigator.userAgent;
      let regexp = /android|iphone|kindle|ipad/i;
      let _isMobileDevice = regexp.test(details);
      console.log(_isMobileDevice);
      if (_isMobileDevice) {
        if (window.ethereum) {
          console.log("WEBSITE ON MOBILE");
          console.log("window.tokenName==================>", window.tokenName);
          setWalletType("METAMASK");
          let TchainId = Number(
            await window.ethereum.request({
              method: "net_version",
            })
          );
          setChainId(TchainId);

          let Taccounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccounts(Taccounts);
          const Tprovider = new ethers.providers.Web3Provider(window.ethereum);
          const Tsigner = Tprovider.getSigner();
          //matic mainnet chain id = 137
          //matic testnet chain id = 80001
          //BNB Mainnet chain id = 56
          //BNB testnet chain id = 97

          if (TchainId === 56) {
            await createLotteryContract(TchainId, blockchainlotteryV2, Tsigner);
            await createTokenContract(TchainId, usdtabi, Tsigner);
          } else if (TchainId === 97) {
            await createLotteryContract(TchainId, blockchainlotteryV2, Tsigner);
            await createTokenContract(TchainId, usdtabi, Tsigner);
          } else {
            setNetworkErr("Switch To Binance Mainnet");
          }
        } else {
          window.location.href = "dapp://" + window.location.hostname;
        }
      }
      if (!_isMobileDevice) {
        console.log("WEBSITE ON COMPUTER");
        console.log(
          "window.tokenName==========================>",
          window.tokenName
        );
        setWalletType("METAMASK");
        let TchainId = Number(
          await window.ethereum.request({
            method: "net_version",
          })
        );
        setChainId(TchainId);

        let Taccounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(Taccounts);
        const Tprovider = new ethers.providers.Web3Provider(window.ethereum);
        const Tsigner = Tprovider.getSigner();
        //matic mainnet chain id = 137
        //matic testnet chain id = 80001
        //BNB Mainnet chain id = 56
        //BNB testnet chain id = 97

        if (TchainId === 56) {
          await createLotteryContract(TchainId, blockchainlotteryV2, Tsigner);
          await createTokenContract(TchainId, usdtabi, Tsigner);
        } else if (TchainId === 97) {
          await createLotteryContract(TchainId, blockchainlotteryV2, Tsigner);
          await createTokenContract(TchainId, usdtabi, Tsigner);
        } else {
          setNetworkErr("Switch To Binance Mainnet");
        }
      } else {
        //set Error that window.ethereum not found
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createLotteryContract = async (_chainId, _abi, _signer) => {
    console.log("Creating lottery contract");

    var _address;
    if (_chainId === 56) {
      _address = "0x6fe928971bFc1C6d2dE8e60E28c9Ec3e42EF16b0";
    } else if (_chainId === 97) {
      _address = "0x014581e0ce9751D1a62bdC6d06A5267b491C8A84";
    } else {
      setNetworkErr("Switch To Binance Mainnet");
    }

    // throw new Error("Here we stop");
    window.lottery = new ethers.Contract(_address, _abi, _signer);
    let Tamount = await window.lottery.amount();
    setAmount(Tamount);

    if (_chainId === 56 || _chainId === 97) {
      let totalPrize = await window.lottery.getTotalPrize();
      setPricePool(Number(totalPrize.toBigInt() / BigInt(10 ** 18)));
    }
  };

  const createTokenContract = async (_chainId, _abi, _signer) => {
    var _address;
    console.log("Creating Token Contract");
    if (_chainId === 56) {
      if (window.tokenName === "USDT") {
        _address = "0x55d398326f99059fF775485246999027B3197955";
      } else if (window.tokenName === "USDC") {
        _address = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
      } else if (window.tokenName === "BUSD") {
        _address = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
      } else if (window.tokenName === "DAI") {
        _address = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";
      } else if (window.tokenName === "TUSD") {
        _address = "0x14016E85a25aeb13065688cAFB43044C2ef86784";
      } else if (window.tokenName === "USDD") {
        _address = "0xd17479997F34dd9156Deef8F95A52D81D265be9c";
      }
    } else if (_chainId === 97) {
      if (window.tokenName === "USDT") {
        _address = "0x477E7AA1420a215BcE4EfadF85A577e6e1fa54A9";
      } else if (window.tokenName === "USDC") {
        _address = "0xb6C24A93323847ED06366AA8D5EBbb5c6c5da5FC";
      } else if (window.tokenName === "DAI") {
        _address = "0x34A5Ac320C2ca28C9ECf2e508D33aB6C9674Be75";
      } else if (window.tokenName === "BUSD") {
        _address = "0xE8d6183476968a1E87Ec3F65E54d275BF98a6Ba3";
      } else if (window.tokenName === "TUSD") {
        _address = "0xfF2A17B10b06e0B5C52073E6F5341D0d5a36F239";
      } else if (window.tokenName === "USDD") {
        _address = "0xDCC168239341DC3f82e16fC195fc17179fDbF07B";
      }
    } else {
      //set chain id error
    }
    window.token = new ethers.Contract(_address, _abi, _signer);
    let Tsymbol = await window.token.symbol();
    let Tbalance = await window.token.balanceOf(await _signer.getAddress());
    setSymbol(Tsymbol);
    setUsdtBalance(Number(Tbalance.toBigInt() / BigInt(10 ** 18)));
    if (_chainId === 137) {
      const prize = await window.token.balanceOf(window.lottery.address);
      setPricePool(prize.toString());
    }
  };
  return (
    <>
      <Navbar
        connectWallet={connectWallet}
        walletConnect={walletConnect}
        accounts={accounts}
        usdtBalance={usdtBalance}
        symbol={symbol}
      />
      <div className="mainAboutContainer">
        <h1 className="ourteamheading">OUR TEAM</h1>
        <div className="imagesContainer">
          <div className="imageContainer">
            <img alt="NO content FOUND" className="image" src={OlehMiller} />

            <h5 className="h5">
              <img id="flag" alt="" src={Israel} /> Oleh Miller
            </h5>
            <h5 className="h5">Producer</h5>
          </div>
          <div className="imageContainer">
            <img
              alt="no content found"
              className="image"
              src={EvgeniySivokon}
            />
            <h5 className="h5">
              <img id="flag" alt="" src={Ukrain} /> Evgeniy Syvokon
            </h5>
            <h5 className="h5">Project Coordinator</h5>
          </div>
          <div className="imageContainer">
            <img alt="no content found" className="image" src={AnnaKim} />
            <h5 className="h5">
              <img id="flag" alt="" src={Ukrain} /> Anna Kim
            </h5>
            <h5 className="h5">Digital Designer</h5>
          </div>
          <div className="imageContainer">
            <img
              alt="no content found"
              className="image"
              src={GrantVardanyan}
            />
            <h5 className="h5">
              <img id="flag" alt="" src={Ukrain} /> Grant Vardanyan
            </h5>
            <h5 className="h5">Marketing Director</h5>
          </div>
          <div className="imageContainer">
            <img
              alt="no content found"
              className="image"
              src={NiralDhameliya}
            />
            <h5 className="h5">
              <img id="flag" alt="" src={India} /> Niral Dhameliya
            </h5>
            <h5 className="h5">Blockchain Developer</h5>
          </div>
        </div>
        <h1 className="ourstoryheading">OUR Story</h1>
        <div className="storyContainer">
          <p className="story">
            Hi all, we are the guys from Diablo.bet 😈
            <p>
              Our idea to write such a smart contract appeared absolutely
              spontaneously, as a joke. The thing is that before the war in
              Ukraine all the members of our team worked in one office in Kiev,
              in a small but friendly IT company, there was a system of
              penalties and incentives in a joking but obligatory form in the
              team. For example, for delays, for using bad words, or for
              non-fulfillment of deadlines, we put off 10$ for each of them into
              "piggy bank". Thus, once or twice a week, all had fun eating
              pizza🍕, purchased for the funds of violators.
            </p>
            <br />
            <p>
              The war that began on February 24th forced us to close our office
              in Ukraine, and many employees as a relocation got the opportunity
              to scatter who knows where, many preferred to go home to their
              homeland, so India, Ukraine, Pakistan, Israel, Czech Republic, and
              even Mauritius in different time zones, began to eat different
              pizza🍕.
            </p>
            <br />
            <p>
              But the tradition of the "piggy bank" hasn't disappeared. So as a
              joke, we wrote a smart contract, the condition of which was to
              perform work assignments within a given time, if someone was late
              - the algorithm would take his money. Eventually, at one of the
              briefings at ZOOM, we came up with a cute idea. What if we could
              just write a smart contract that would redistribute the "pizza🍕"?
              And at the next online meeting, Niral Dhameliya, our main
              developer at LinkedIn, presented the smart contract he had
              written.
            </p>
            <br />
            <p>
              The rules were trivially simple, all participants dropped $10, and
              at the end of the day, the SHA256 randomizer algorithm simply
              chooses a lucky winner who gets a Pizza🍕{" "}
            </p>
            <br />
            <p>
              After a while, other people, employees, relatives, and friends
              learned about the fun blockchain lottery. The daily draw began to
              grow by leaps and bounds, $100, $150, $200, $500 ... From the joke
              in the online conference in ZOOM was a community, which discussed
              whose cryptocurrency wallet took the winnings yesterday. As the
              influx of participants, the lottery messenger started to get
              people who didn't know how to add a token to the metamask, or
              didn't understand how to choose a network at all. When the same
              questions began to repeat over and over again, it was decided to
              suspend the "Pizza🍕" project and start developing a simpler
              solution, and so Diablo.bet 😈 was born.{" "}
            </p>
            <br />
            <p>
              Now Diablo.bet is a crypto lottery written on the smart contract
              in Binance Smart Chain (bep 20), the contract code is in public
              access on the site where anyone can read it. The terms of
              participation are simple and clear. The participant binds his
              crypto wallet, then chooses a stabelcoin with which he wants to
              pay for the ticket, and by the third click buys a ticket,
              everything. From this moment on, every person who bought a ticket
              this way automatically becomes a participant of the drawing, which
              will take place every day at 00:00 (GMT) when the smart contract
              reaches its end, and one of the participants wins the whole
              lottery pool amount. The payout is automatically credited to his
              or her cryptocurrency wallet.
            </p>
            <br />
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
