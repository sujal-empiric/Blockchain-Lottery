/* global BigInt */
import { useState } from "react";
import "./App.css";
import "./index.css";
import { ethers } from "ethers";
import usdtabi from "./static/Abi/USDT.json";
import blockchainlotteryV2 from "./static/Abi/LotteryV2.json";
import Navbar from "./Navbar";
import Lending from "./Lending";
import BuyButtons from "./BuyButtons";
import About from "./About";
import Footer from "./Footer";
import Errors from "./Errors";
import Selector from "./Selector";
function App() {
  const [walletType, setWalletType] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [amount, setAmount] = useState(null);
  const [fee, setFee] = useState(null)
  const [networkErr, setNetworkErr] = useState(null);
  const [status, setStatus] = useState(0);
  const [pricePool, setPricePool] = useState(null);
  const [txStatus, setTxStatus] = useState(null);

  const [symbol, setSymbol] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(null);
  // Provider and Contract Object for showing Lottery Balance
  const p = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
  );
  const c = new ethers.Contract(
    "0x03DFeB07E988bde23A69316ED8bC7732Ba40F648",
    blockchainlotteryV2,
    p
  );
  // Fetching Total token prize as Promise Object
  let totalPrize = c.getTotalPrize();
  // Resolving Total Toke Prize Promise Object
  totalPrize.then((e) => {
    // Seting total Token Prize
    setPricePool(Number(e.toBigInt() / BigInt(10 ** 18)));
  });

  // Checking if the Browser have window.ethereum object for adding event listener
  if (window.ethereum) {
    // Setting the AccountsChange event handler
    window.ethereum.on("accountsChanged", function (accounts) {
      console.log(accounts);
      setNetworkErr(null);
      connectWallet();
    });
    // Setting the ChainChange event Handler
    window.ethereum.on("chainChanged", function (accounts) {
      console.log(accounts);
      setNetworkErr(null);
      connectWallet();
    });
  }

  // walletConnect function for Wallet Connect functionality
  const walletConnect = async () => {
    try {
      // Checking the current tokenName
      if (window.tokenName == null) {
        window.tokenName = "USDT";
      }
      // Creating the WalletConnectProvider Object from the WalletConnect CDN
      const WalletConnectProvider = window.WalletConnectProvider;
      // Creating the WalletConnect Provider Object from WalletConnectProvider Class
      var provider = new WalletConnectProvider.default({
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
        },
        chainId: 56,
        bridge: "https://bridge.walletconnect.org/",
      });
      console.log("Tringring QR Code");
      await provider.enable();
      console.log("TRIGER FINISH");
      const Tprovider = new ethers.providers.Web3Provider(provider);
      provider.on("accountsChanged", (accounts) => {
        console.log(accounts);
        walletConnect();
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        console.log(chainId);
      });

      const chainId = await provider.request({ method: "eth_chainId" });
      console.log("this is chain id", chainId);
      const binanceTestChainId = "0x38";

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
      setWalletType("WALLETCONNECT");

      if (TchainId === 56) {
        console.log(TchainId);
        createLotteryContract(TchainId, blockchainlotteryV2, Tsigner);
        createTokenContract(TchainId, usdtabi, Tsigner);
      } else if (TchainId === 97) {
        console.log(TchainId);
        createLotteryContract(TchainId, blockchainlotteryV2, Tsigner);
        createTokenContract(TchainId, usdtabi, Tsigner);
      } else {
        setNetworkErr("You are on wrong chain, please change your network to binance main net")
        //set chain id error
      }
    } catch (e) {
      console.log(e);
    }
  };
  // connectWallet function for the Injected Metamask Functionality
  const connectWallet = async () => {
    // Checking if the window.ethereum is present or not
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const binanceChainId = "0x38";
      if (chainId === binanceChainId) {
        console.log("Bravo!, you are on the correct network");
      } else {
        console.log("oulalal, switch to the correct network");
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: binanceChainId }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.

          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x38",
                    chainName: "BNB Smart Chain Mainnet",
                    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                    blockExplorerUrls: ["https://bscscan.com"],
                    nativeCurrency: {
                      symbol: "BNB",
                      decimals: 18,
                    },
                  },
                ],
              });
            } catch (addError) {
              console.log(addError);
            }
          }
          console.log("Failed to switch to the network");
        }
      }
    }

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
      _address = "0x03DFeB07E988bde23A69316ED8bC7732Ba40F648";
    } else if (_chainId === 97) {
      _address = "0x882680036903d35ef0151c507A6888524b5A16CF";
    } else {
      setNetworkErr("Switch To Binance Mainnet");
    }

    // throw new Error("Here we stop");
    window.lottery = new ethers.Contract(_address, _abi, _signer);
    let Tamount = await window.lottery.amount();
    console.log('Lottery Amount==>',Tamount)
    setAmount(Tamount);
    let Tfee = await window.lottery.fee()
    window.f = Tfee
    setFee(Tfee)
    console.log('Lottery Fee==>',Tfee)
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

  const approveTokens = async () => {
    console.log(walletType);
    console.log("-==============================");
    if (window.ticketAmount === 1) {
      setTxStatus("Waiting for user to approve tokens");
      const tx = await window.token.approve(
        window.lottery.address,
        amount.toBigInt()
      );
      setTxStatus("Waiting for Transaction Confirmation");
      await tx.wait();
      setStatus(1);
      setTxStatus("Tokens Approved");
      console.log("Tokens Approved");
    } else {
      setTxStatus("Waiting for user to approve tokens");
      const tx = await window.token.approve(
        window.lottery.address,
        amount.toBigInt() * BigInt(window.ticketAmount)
      );
      setTxStatus("Waiting for Transaction Confirmation");
      await tx.wait();
      setStatus(1);
      setTxStatus("Tokens Approved");
      console.log("Tokens Approved");
    }
  };

  const buyTicket = async () => {
    try {
      if (chainId === 56 || chainId === 97) {
        console.log("MULTIPLE CALLED");
        setTxStatus("Waiting for Transaction Confirmation");
        const tx = await window.lottery.buyTickets(amount,window.ticketAmount,window.token.address,{ value: fee.mul(window.ticketAmount) });
        await tx.wait();
        setStatus(2);
        setTxStatus("Ticket Bougth Successfully");
      } 

      if (walletType === "METAMASK") {
        connectWallet();
      } else if (walletType === "WALLETCONNECT") {
        walletConnect();
      }
    } catch (e) {
      console.log(e);
      // set execution error here
      setTxStatus(e.reason);
    }
  };
  return (
    <div className="App">
      <Navbar
        connectWallet={connectWallet}
        walletConnect={walletConnect}
        accounts={accounts}
        usdtBalance={usdtBalance}
        symbol={symbol}
      />
      {networkErr ? <Errors error={networkErr}></Errors> : null}
      <Lending pricePool={pricePool} symbol={symbol}></Lending>
      {txStatus ? <Errors error={txStatus}></Errors> : null}

      {chainId === 97 || chainId === 56 ? (
        <Selector
          connectWallet={connectWallet}
          walletType={walletType}
          walletConnect={walletConnect}
        />
      ) : null}

      <BuyButtons
        approveTokens={approveTokens}
        depositeUSDT={buyTicket}
        status={status}
        walletType={walletType}
      ></BuyButtons>
      <About></About>
      <Footer></Footer>
    </div>
  );
}

export default App;
