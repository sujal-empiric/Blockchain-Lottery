const cron = require("node-cron");
const ethers = require("ethers");

const Provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed3.binance.org/");

console.log(Provider.connection);

const Wallet = new ethers.Wallet("PRIVATE KEY", Provider);
console.log(Wallet.address);

const blockchainLotteryAddress = "0x6fe928971bFc1C6d2dE8e60E28c9Ec3e42EF16b0";
const blockchainLotteryAbi = require("./Abi/LotteryV2.json");
const blockchainLotteryContract = new ethers.Contract(blockchainLotteryAddress,blockchainLotteryAbi,Wallet);


async function main() {
    // const estimation = (await blockchainLotteryContract.estimateGas.assignTicket()).toNumber()
    // console.log(estimation)
    // const tx = await blockchainLotteryContract.assignTicket({gasLimit:estimation+10000})
    // console.log(tx)
    // await tx.wait()
    // const estimation = (await blockchainLotteryContract.estimateGas.getLottery()).toNumber()
    // console.log(estimation)
    // const tx = await blockchainLotteryContract.getLottery({gasLimit:estimation+20000})
    // console.log(tx)
    // await tx.wait()

    console.log(new Date().toTimeString())

}

main()
