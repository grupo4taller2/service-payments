const config = require("../config");
const ethers = require("ethers");
const walletService = require("./walletService");
const { tripsPaid } = require("../database/database");
const { withdrawsDB } = require("../database/database");
const usersPayments = require("./userPayments");
const { adminDepositDB } = require("../database/database");



async function getContract(config, wallet) {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};


async function deposit(riderUsername, amountToSend,driverUsername,tripID) {
    riderWallet = await walletService.getWallet(riderUsername);
    const basicPayments = await getContract(config, riderWallet);
    console.log(amountToSend.toString())
    let tx;
    try {
        tx = await basicPayments.deposit({
        value: await ethers.utils.parseEther(amountToSend.toString()).toHexString()
        });
    } catch{
      return false;
    }

    tx.wait(1).then(
      receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "DepositMade") {
          //Una vez confirmada la transaccion
          //guardar, etc
          const doc = {
            riderUsername: riderUsername,
            amount: amountToSend,
            driverUsername: driverUsername,
            tripID: tripID,
            createdAt: new Date()
          }
          usersPayments.saveAmountToUser(driverUsername,amountToSend);
          tripsPaid.insertOne(doc);
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


async function withdraw(username, amountToWithdraw, userWalletAddres) {
    const ownerWallet = await walletService.getDeployerWallet();
    const basicPayments = await getContract(config, ownerWallet);
    let tx;
    try{
      await usersPayments.blockWallet(username);
      tx = await basicPayments.sendPayment(
        userWalletAddres,
        await ethers.utils.parseEther(amountToWithdraw.toString()).toHexString(),
      );
    } catch{
      await usersPayments.unblockWallet(username)
      return false;
    }
    tx.wait(1).then(
        receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "PaymentMade") {
            //Una vez confirmada la transaccion
            //guardar, etc
            const doc = {
              username: username,
              amount: amountToWithdraw,
              wallet: userWalletAddres,
              createdAt: new Date()
            }
            withdrawsDB.insertOne(doc);
            usersPayments.discountAmountToUser(username, amountToWithdraw);
            usersPayments.unblockWallet(username);
        } else {
            //falla la transaccion
            usersPayments.unblockWallet(username)
            console.error(`Payment not created in tx ${tx.hash}`);
        }
        },
        error => {
        usersPayments.unblockWallet(username)
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
    let tx;
    try{
      tx = await basicPayments.sendPayment(
        userWallet.address,
        await ethers.utils.parseEther(amount.toString()).toHexString(),
      );
    } catch{
      return false;
    }
    tx.wait(1).then(
        receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "PaymentMade") {
            //Una vez confirmada la transaccion
            //guardar, etc
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


async function adminDeposit(username, amountToWithdraw, userWalletAddres) {
  const ownerWallet = await walletService.getDeployerWallet();
  const basicPayments = await getContract(config, ownerWallet);
  let tx;
  try{
    tx = await basicPayments.sendPayment(
      userWalletAddres,
      await ethers.utils.parseEther(amountToWithdraw.toString()).toHexString(),
    );
  } catch{
    return false;
  }
  tx.wait(1).then(
      receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "PaymentMade") {
          //Una vez confirmada la transaccion
          //guardar, etc
          //guardar_transaccion del admin ???????
          const doc = {
            adminUsername: username,
            amount: amountToWithdraw,
            walletDest: userWalletAddres,
            createdAt: new Date()
          }
          adminDepositDB.insertOne(doc);
          //usersPayments.discountAmountToUser(username,amountToWithdraw);
      } else {
          //falla la transaccion
          //usersPayments.saveAmountToUser(username,amountToWithdraw);
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




exports.deposit = deposit;
exports.withdraw = withdraw;
exports.firstDeposit = firstDeposit;
exports.adminDeposit = adminDeposit;

