const cron = require('node-cron')
const ethers  = require('ethers')


const Provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
// const Provider = new ethers.providers.AlchemyProvider('maticmum', 'bjMe0YCNyiyfqspS91W1JtoPNzoLh19a')
console.log(Provider.connection)

const Wallet = new ethers.Wallet("85a40fe49f7371fbd89f63602d25db6aef6600cc46602eea96da35a82a607bf8",Provider)
console.log(Wallet.address)

const blockchainLotteryAddress = "0xE5D87De908a2Bb64786A38ed162CaCbCB1078344";
const blockchainLotteryAbi = require('./Abi/LotteryV2.json')
const blockchainLotteryContract = new ethers.Contract(blockchainLotteryAddress, blockchainLotteryAbi, Wallet)
console.log(process.env.REACT_APP_BLOCKCHAIN_LOTTERY_ADDRESS)


const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const news =async ()=>{
	let i = await blockchainLotteryContract.isOn()
	console.log(i)
}

// news()


// 0 55 23 * * * 
// 0 0,15,35,50 * * * *
let assigner = cron.schedule("0 55 23 * * *", async function() {
  let isOn = await blockchainLotteryContract.isOn()
  if(isOn){
    let gasprice = await Provider.getGasPrice()
    console.log("Gas Price: "+gasprice.toNumber())
    console.log(new Date().toLocaleTimeString())
    let tx = await blockchainLotteryContract.assignTicket({gasPrice:gasprice.toNumber()})
    console.log(tx)
    let reciept = await tx.wait()
    console.log("Before Wait "+new Date().toLocaleTimeString())
    
    await sleep(300000)
    console.log("After wait "+new Date().toLocaleTimeString())
    isOn = await blockchainLotteryContract.isOn()
    if(isOn===false){
      console.log(new Date().toLocaleTimeString())
      let gasprice = await Provider.getGasPrice()
      console.log("Gas Price: "+gasprice.toNumber())
      console.log(new Date().toLocaleTimeString())
      let tx = await blockchainLotteryContract.getLottery({gasPrice:gasprice.toNumber()})
      console.log(tx)
    }
  }
});

// 0 0 0 * * * 
// 0 10,25,40,55 * * * *

assigner.start()
