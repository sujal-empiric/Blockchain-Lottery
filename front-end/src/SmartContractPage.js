/* global BigInt */
import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./App.css";
import "./index.css";
import { ethers } from "ethers";
import usdtabi from "./static/Abi/USDT.json";
import blockchainlotteryV2 from "./static/Abi/LotteryV2.json";

import SmartContractQR from "./static/SmartContractQR.svg";

import "./SmartContractPage.css";

function SmartContractPage() {
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
      <div className="mainContractContainer">
        <h1 className="smartContractText">Smart Contract</h1>
        <p className="smartContactDetail">
          Everyone can check out our smart contract by clicking{" "}
          <a
            className="here a"
            href="https://bscscan.com/address/0x6fe928971bfc1c6d2de8e60e28c9ec3e42ef16b0"
            target="_blank"
          >
            here.
          </a>{" "}
          <br /> Or scan the QR from your device.
        </p>
        <div>
          <img className="QRCode" src={SmartContractQR}></img>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SmartContractPage;
