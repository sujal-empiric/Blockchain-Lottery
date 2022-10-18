/* global BigInt */
import {useState} from "react";
import "./App.css";
import {ethers} from "ethers";
import usdtabi from "./static/Abi/USDT.json";
import blockchainlotteryV1 from "./static/Abi/LotteryV1.json";
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

    const [status, setStatus] = useState(0);
    const [networkErr, setNetworkErr] = useState(null);
    const [isOn, setIsOn] = useState(null);
    const [pricePool, setPricePool] = useState(null);
    const [ticketNumber, setTicketNumber] = useState(-1);
    const [txStatus, setTxStatus] = useState(null);

    const [lastWinner, setLastWinner] = useState(null);

    const [symbol, setSymbol] = useState(null);
    const [usdtBalance, setUsdtBalance] = useState(null);
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", function (accounts) {
            console.log(accounts);
            connectWallet();
        });

        window.ethereum.on("chainChanged", function (accounts) {
            console.log(accounts);
            connectWallet();
        });
    }
    const tronWebConnect = async () => {
        if (window.tronWeb) {
            setWalletType("TRON");
            console.log("new" + window.tronWeb.defaultAddress.base58);
            // eslint-disable-next-line
            if (window.tronWeb.defaultAddress.base58 == false) {
                setAccounts(["0x000000"]);
                setNetworkErr("UnlockWallet");
            } else {
                setAccounts([window.tronWeb.defaultAddress.base58]);
                setNetworkErr(null);
            }
            let _BlockchainLotteryAddress =
                "TUWmgMu4PWCCiLDFQ6gmAFVRBjZQywKfrD";
            window.lottery = await window.tronWeb
                .contract(blockchainlotteryV1)
                .at(_BlockchainLotteryAddress);
            console.log(window.lottery);
            setAmount((await window.lottery.amount().call()).toNumber());
            let _tempUsdtAddress = await window.lottery.USDTAddress().call();
            let tempUsdtAddress =
                window.tronWeb.address.fromHex(_tempUsdtAddress);
            window.usdt = await window.tronWeb
                .contract(usdtabi.abi)
                .at(tempUsdtAddress);

            let tempdecimals = await window.usdt.decimals().call();
            // let tempdecimals = 6

            let tempSymbol = await window.usdt.symbol().call();
            setSymbol(tempSymbol);

            let tempPricePool = await window.usdt
                .balanceOf(_BlockchainLotteryAddress)
                .call();
            console.log(tempPricePool.toNumber() / 10 ** tempdecimals);
            setPricePool(tempPricePool.toNumber() / 10 ** tempdecimals);

            let tempUSDTBalance = await window.usdt
                .balanceOf(window.tronWeb.defaultAddress.base58)
                .call();
            console.log(tempUSDTBalance.toNumber() / 10 ** tempdecimals);
            setUsdtBalance(tempUSDTBalance.toNumber() / 10 ** tempdecimals);

            console.log(window.lottery);
            let _lastWinner = await window.lottery.lastWinner().call();
            setLastWinner(_lastWinner.toNumber());

            let _isOn = await window.lottery.isOn().call();
            console.log(_isOn);
            setIsOn(_isOn);
            if (_isOn) {
                setTicketNumber(-1);
            } else {
                let _participants = await window.lottery
                    .getAllParticipants()
                    .call();
                console.log(_participants);

                let _participantsTicket = await window.lottery
                    .addressAndTickets(window.tronWeb.defaultAddress.base58)
                    .call();
                let alltickets = await window.lottery.getAllTickets().call();
                console.log(alltickets);

                if (
                    // eslint-disable-next-line
                    _participants.indexOf(window.tronWeb.defaultAddress.hex) ==
                    -1
                ) {
                    console.log("setting -1 due to no participants");
                    setTicketNumber(-1);
                } else {
                    for (var i = 0; i < alltickets.length; i++) {
                        // eslint-disable-next-line
                        if (alltickets[i].toNumber() == _participantsTicket) {
                            console.log("setting number");
                            setTicketNumber(_participantsTicket.toNumber());
                            break;
                        } else {
                            console.log("setting -1 ");
                            setTicketNumber(-1);
                        }
                    }
                }
            }
        }
    };
    const walletConnect = async () => {
        try {
            if(window.tokenName==null){
                window.tokenName="USDT"
            }
            const WalletConnectProvider = window.WalletConnectProvider;
            var provider = new WalletConnectProvider.default({
                rpc: {
                    1: "https://cloudflare-eth.com/",
                    137: "https://polygon-rpc.com/",
                    80001: "https://matic-mumbai.chainstacklabs.com/",
                    56: "https://bsc-dataseed.binance.org/",
                    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
                },
                // bridge: 'https://bridge.walletconnect.org',
            });
            setWalletType("WALLETCONNECT");
            console.log("Tringring QR Code")
            await provider.enable();
            console.log("TRIGER FINISH")
            const Tprovider = new ethers.providers.Web3Provider(provider);
            const Tsigner = Tprovider.getSigner();
            console.log(Tsigner);
            let Taccounts = [];
            Taccounts.push(await Tsigner.getAddress());
            console.log(Taccounts)
            setAccounts(Taccounts);
            //matic mainnet chain id = 137
            //matic testnet chain id = 80001
            //BNB Mainnet chain id = 56
            //BNB testnet chain id = 97
            console.log(provider)
            let TchainId = provider.chainId;
            console.log(TchainId)
            setChainId(TchainId);
            if (TchainId === 137) {
                
                console.log(TchainId);
                createLotteryContract(TchainId, blockchainlotteryV1, Tsigner);
                createTokenContract(TchainId, usdtabi, Tsigner);
            } else if (TchainId === 80001) {
                console.log(TchainId);
                createLotteryContract(TchainId, blockchainlotteryV1, Tsigner);
                createTokenContract(TchainId, usdtabi, Tsigner);
            } else if (TchainId === 56) {
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
        if(window.tokenName==null){
            window.tokenName="USDT"
        }
        try {
            console.log("connectWallet tokenName==================>",window.tokenName)
            let details = navigator.userAgent;
            let regexp = /android|iphone|kindle|ipad/i;
            let _isMobileDevice = regexp.test(details);
            console.log(_isMobileDevice);
            if (_isMobileDevice) {
                if (window.ethereum) {
                    console.log("WEBSITE ON MOBILE")
                    console.log("window.tokenName==================>",window.tokenName)
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
                    const Tprovider = new ethers.providers.Web3Provider(
                        window.ethereum
                    );
                    const Tsigner = Tprovider.getSigner();
                    //matic mainnet chain id = 137
                    //matic testnet chain id = 80001
                    //BNB Mainnet chain id = 56
                    //BNB testnet chain id = 97

                    if (TchainId === 137) {
                        await createLotteryContract(
                            TchainId,
                            blockchainlotteryV1,
                            Tsigner
                        );
                        await createTokenContract(TchainId, usdtabi, Tsigner);
                    } else if (TchainId === 80001) {
                        await createLotteryContract(
                            TchainId,
                            blockchainlotteryV1,
                            Tsigner
                        );
                        await createTokenContract(TchainId, usdtabi, Tsigner);
                    } else if (TchainId === 56) {
                        await createLotteryContract(
                            TchainId,
                            blockchainlotteryV2,
                            Tsigner
                        );
                        await createTokenContract(TchainId, usdtabi, Tsigner);
                    } else if (TchainId === 97) {
                        await createLotteryContract(
                            TchainId,
                            blockchainlotteryV2,
                            Tsigner
                        );
                        await createTokenContract(TchainId, usdtabi, Tsigner);
                    } else {
                        //set Error that window.ethereum not found
                    }
                } else {
                    window.location.href = "dapp://" + window.location.hostname;
                }
            }
            if (!_isMobileDevice) {
                console.log("WEBSITE ON COMPUTER")
                console.log("window.tokenName==========================>",window.tokenName)
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
                const Tprovider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const Tsigner = Tprovider.getSigner();
                //matic mainnet chain id = 137
                //matic testnet chain id = 80001
                //BNB Mainnet chain id = 56
                //BNB testnet chain id = 97

                if (TchainId === 137) {
                    await createLotteryContract(
                        TchainId,
                        blockchainlotteryV1,
                        Tsigner
                    );
                    await createTokenContract(TchainId, usdtabi, Tsigner);
                } else if (TchainId === 80001) {
                    await createLotteryContract(
                        TchainId,
                        blockchainlotteryV1,
                        Tsigner
                    );
                    await createTokenContract(TchainId, usdtabi, Tsigner);
                } else if (TchainId === 56) {
                    createLotteryContract(
                        TchainId,
                        blockchainlotteryV2,
                        Tsigner
                    );
                    await createTokenContract(TchainId, usdtabi, Tsigner);
                } else if (TchainId === 97) {
                    await createLotteryContract(
                        TchainId,
                        blockchainlotteryV2,
                        Tsigner
                    );
                    await createTokenContract(TchainId, usdtabi, Tsigner);
                } else {
                    //set chain id error
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
        if (_chainId === 137) {
            _address = "0x903F507A8b2887492aBA0fcEcc654b9981e4Cb58";
        } else if (_chainId === 80001) {
            _address = "0xC330332351858518Ff61C7d4930780B0d260EDEe";
        } else if (_chainId === 56) {
            _address = "null";
        } else if (_chainId === 97) {
            _address = "0xE5D87De908a2Bb64786A38ed162CaCbCB1078344";
        } else {
            //set chain id error
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
        console.log("Creating Token Contract")
        if (_chainId === 137) {
            _address = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
        } else if (_chainId === 80001) {
            _address = "0xc1ef3d10d02F27Fe16052Aa463DB2C27a7604660";
        } else if (_chainId === 56) {
            if (window.tokenName === "USDT") {
                _address = "0x55d398326f99059fF775485246999027B3197955";
            } else if (window.tokenName === "USDC") {
                _address = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
            } else if (window.tokenName === "BUSD") {
                _address = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
            } else if (window.tokenName === "DAI") {
                _address = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";
            } else if (window.tokenName === "USDP") {
                _address = "0xb3c11196A4f3b1da7c23d9FB0A3dDE9c6340934F";
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
            } else if (window.tokenName === "USDP") {
                _address = "0x0D4DbFe3919c74209a4B34F0003d2D75A927Ab44";
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
        if (walletType === "TRON") {
            setTxStatus("Waiting for user to approve tokens");
            window.usdt.approve(window.lottery.address, amount).send();
            setStatus(1);
            setTxStatus("Tokens Approved");
        } else {
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
        }
    };

    const buyTicket = async () => {
        try {
            if (walletType === "TRON") {
                setTxStatus("Waiting for Transaction Confirmation");

                window.lottery.depositeUSDT(amount).send();
                setStatus(2);
                setTxStatus("Ticket Bougth Successfully");
            } else {
                if (chainId === 137 || chainId === 80001) {
                    const tx = await window.lottery.depositeUSDT(amount);
                    setTxStatus("Waiting for Transaction Confirmation");
                    await tx.wait();
                    console.log("Ticket is successfully bought by the user");
                    setStatus(2);
                    setTxStatus("Ticket Bougth Successfully");
                }
                if (chainId === 56 || chainId === 97) {
                    console.log(window.ticketAmount);
                    if (window.ticketAmount === 1) {
                        console.log("SINGLE CALLED");
                        const tx = await window.lottery.buyTicket(
                            amount,
                            window.token.address
                        );
                        setTxStatus("Waiting for Transaction Confirmation");
                        await tx.wait();
                        setTxStatus("Ticket Bougth Successfully");
                        console.log(
                            "Ticket is successfully bought by the user"
                        );
                        setStatus(2);
                    } else {
                        console.log("MULTIPLE CALLED");
                        setTxStatus("Waiting for Transaction Confirmation");
                        const tx = await window.lottery.primeUserBuyTicket(
                            amount,
                            window.ticketAmount,
                            window.token.address
                        );
                        await tx.wait();
                        setStatus(2);
                        setTxStatus("Ticket Bougth Successfully");
                    }
                }
            }
            if (walletType === "METAMASK") {
                connectWallet();
            } else if (walletType === "WALLETCONNECT") {
                walletConnect();
            } else if (walletType === "TRON") {
                tronWebConnect();
            }
        } catch (e) {
            console.log(e.reason);
            // set execution error here
            setTxStatus(e.reason);
        }
    };
    return (
        <div className="App">
            <Navbar
                connectWallet={connectWallet}
                walletConnect={walletConnect}
                tronWebConnect={tronWebConnect}
                accounts={accounts}
                usdtBalance={usdtBalance}
                symbol={symbol}
            />
            {networkErr ? <Errors error={networkErr}></Errors> : null}
            <Lending
                pricePool={pricePool}
                ticketNumber={ticketNumber}
                lastWinner={lastWinner}
                symbol={symbol}
                isOn={isOn}
            ></Lending>
            {txStatus ? <Errors error={txStatus}></Errors> : null}

            {chainId === 97 || chainId === 56 ? (
                <Selector connectWallet={connectWallet} />
            ) : null}

            <BuyButtons
                approveTokens={approveTokens}
                depositeUSDT={buyTicket}
                status={status}
            ></BuyButtons>
            <About></About>
            <Footer></Footer>
        </div>
    );
}

export default App;
