const config = require("../config");
const ethers = require("ethers");
const walletService = require("./walletService");
const { tripsPaid } = require("../database/database");
const usersPayments = require("./userPayments");



async function getContract(config, wallet) {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};


const deposits = {};

async function deposit(riderUsername, amountToSend,driverUsername,tripID) {
  console.log("LLEGO WACHINGGGG");
    riderWallet = await walletService.getWallet(riderUsername);
    const basicPayments = await getContract(config, riderWallet);
    console.log(amountToSend.toString())
    const tx = await basicPayments.deposit({
      value: await ethers.utils.parseEther(amountToSend.toString()).toHexString()
    
      
    });

    tx.wait(1).then(
      receipt => {
        console.log("PAPAPAPPAPASPPS");
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "DepositMade") {
          //Una vez confirmada la transaccion
          //guardar, etc
          deposits[tx.hash] = {
            senderAddress: firstEvent.args.sender,
            amountSent: firstEvent.args.amount,
          };
          const doc = {
            riderUsername: riderUsername,
            amount: amountToSend,
            driverUsername: driverUsername,
            tripID: tripID
          }
          usersPayments.saveAmountToUser(driverUsername,amountToSend);
          //driversPayments.saveAmountToDriver(driverUsername,amountToSend);
          tripsPaid.insertOne(doc);
        } else {
          //falla la transaccion
          console.log("AYUDA ROMPIIIIIIII");
          console.error(`Payment not created in tx ${tx.hash}`);
        }
      },
      error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);
        
        console.error("message");
        console.error(message);
      },
    );
    console.log("LLEGO ACCCAAASSSA")
    return tx;
};




async function withdraw(username, amountToWithdraw, userWalletAddres) {
    //const userWallet = await walletService.getWallet(username);
    const ownerWallet = await walletService.getDeployerWallet();
    const basicPayments = await getContract(config, ownerWallet);
    const tx = await basicPayments.sendPayment(
        userWalletAddres,
        await ethers.utils.parseEther(amountToWithdraw.toString()).toHexString(),
    );
    tx.wait(1).then(
        receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "PaymentMade") {
            //Una vez confirmada la transaccion
            //guardar, etc
            deposits[tx.hash] = {
            senderAddress: firstEvent.args.sender,
            amountSent: firstEvent.args.amount,
            };
            //usersPayments.discountAmountToUser(username,amountToWithdraw);
        } else {
            //falla la transaccion
            usersPayments.saveAmountToUser(username,amountToWithdraw);
            console.error(`Payment not created in tx ${tx.hash}`);
        }
        },
        error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);

        console.error("message");
        console.error(message);
        },
    );
    return tx;
};

async function firstDeposit(username,amount){
  const userWallet = await walletService.getWallet(username);
  const ownerWallet = await walletService.getDeployerWallet();
    const basicPayments = await getContract(config, ownerWallet);
    const tx = await basicPayments.sendPayment(
        userWallet.address,
        await ethers.utils.parseEther(amount.toString()).toHexString(),
    );
    tx.wait(1).then(
        receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "PaymentMade") {
            //Una vez confirmada la transaccion
            //guardar, etc
            deposits[tx.hash] = {
            senderAddress: firstEvent.args.sender,
            amountSent: firstEvent.args.amount,
            };
        } else {
            //falla la transaccion
            console.error(`Payment not created in tx ${tx.hash}`);
        }
        },
        error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);

        console.error("message");
        console.error(message);
        },
    );
    return tx;
};




const getDepositReceipt =
  ({}) =>
  async depositTxHash => {
    return deposits[depositTxHash];
  };

exports.deposit = deposit;
exports.withdraw = withdraw;
exports.firstDeposit = firstDeposit;

