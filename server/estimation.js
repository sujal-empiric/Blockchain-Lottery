const cron = require("node-cron");
const ethers = require("ethers");

const Provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s3.binance.org:8545/"
);

console.log(Provider.connection);

const Wallet = new ethers.Wallet("3424f52cb95e7f4cd039116a354ac4fa39a678d3b56f90d55cfbfaff407e73ea", Provider);
console.log(Wallet.address);

const blockchainLotteryAddress = "0x882680036903d35ef0151c507A6888524b5A16CF";
const blockchainLotteryAbi = require("./Abi/LotteryV2.json");
const blockchainLotteryContract = new ethers.Contract(
  blockchainLotteryAddress,
  blockchainLotteryAbi,
  Wallet
);

async function main() {
  for(var i = 0;i<10;i++){
    var tx = await blockchainLotteryContract.setIsOn(false)
    await tx.wait()
    tx = await blockchainLotteryContract.getLottery()
    await tx.wait()
    console.log(i)
  }
}

main();
