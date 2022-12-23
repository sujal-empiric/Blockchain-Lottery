const cron = require("node-cron");
const ethers = require("ethers");

const Provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed3.binance.org/"
);

console.log(Provider.connection);

const Wallet = new ethers.Wallet("PRIVATE KEY", Provider);
console.log(Wallet.address);

const blockchainLotteryAddress = "0x6fe928971bFc1C6d2dE8e60E28c9Ec3e42EF16b0";
const blockchainLotteryAbi = require("./Abi/LotteryV2.json");
const blockchainLotteryContract = new ethers.Contract(
  blockchainLotteryAddress,
  blockchainLotteryAbi,
  Wallet
);

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const news = async () => {
  let i = await blockchainLotteryContract.isOn();
  console.log(i);
};

// news()

// 0 55 23 * * *
// 0 0,15,35,50 * * * *
let assigner = cron.schedule("0 55 23 * * *", async function () {
  console.log(
    "========================> Starting Lottery <==============================="
  );
  console.log(new Date().toDateString(), new Date().toTimeString());
  let isOn = await blockchainLotteryContract.isOn();
  if (isOn) {
    console.log(
      "========================> Assign Ticket <==============================="
    );

    // Gas Price for Assign Ticket
    let gasprice = await Provider.getGasPrice();
    console.log("Assign Ticket Gas Price: " + gasprice.toNumber());

    // Gas Estimation for Assign Ticket
    const oneEstimation = (
      await blockchainLotteryContract.estimateGas.assignTicket()
    ).toNumber();
    console.log(
      "Assign Ticket Gas Estimation: " +
        oneEstimation +
        " + 10000 = " +
        (oneEstimation + 10000)
    );

    let tx = await blockchainLotteryContract.assignTicket({
      gasLimit: oneEstimation + 10000,
      gasPrice: gasprice.toNumber(),
    });

    console.log(new Date().toTimeString());
    console.log("Assign Ticket TX hash: " + tx.hash);

    await tx.wait();

    console.log("Waiting for 5 Minutes");
    await sleep(300000);

    console.log(
      "========================> Get Lottery <==============================="
    );
    isOn = await blockchainLotteryContract.isOn();
    if (isOn === false) {
      let gasprice = await Provider.getGasPrice();
      console.log("Get Lottery Gas Price: " + gasprice.toNumber());

      const twoEstimation = (
        await blockchainLotteryContract.estimateGas.getLottery()
      ).toNumber();
      console.log(
        "Get Lottery Gas Estimation: " +
          twoEstimation +
          " + 20000 = " +
          (twoEstimation + 20000)
      );

      let tx = await blockchainLotteryContract.getLottery({
        gasLimit: twoEstimation + 20000,
        gasPrice: gasprice.toNumber(),
      });

      console.log(new Date().toTimeString());
      console.log("Get Lottery TX hash: " + tx.hash);
      await tx.wait();
      console.log(
        "========================> Ending Lottery <==============================="
      );
    }
  }
});

// 0 0 0 * * *
// 0 10,25,40,55 * * * *

assigner.start();
