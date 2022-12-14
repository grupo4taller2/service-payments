const config = require("../config");
const ethers = require("ethers");
const walletService = require("./walletService");
const { tripsPaid } = require("../database/database");
const { withdrawsDB } = require("../database/database");
const usersPayments = require("./userPayments");
const mockPayments = require("../mocks/transactions_mock");
const { adminDepositDB } = require("../database/database");

async function getContract(config, wallet) {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};


const deposits = {};

async function deposit(riderUsername, amountToSend,driverUsername,tripID) {
    riderWallet = await walletService.getWallet(riderUsername);
    const basicPayments = await getContract(config, riderWallet);
    console.log(amountToSend.toString())
    try{
    tx = await mockPayments.mockDeposit(
      riderWallet.address,
      amountToSend,
      //await ethers.utils.parseEther(amountToWithdraw.toString()).toHexString(),
    );
    } catch (error){
      console.log("ROMPE EL DEPOSIT")
      console.log(error);
      return false;
    }
    const doc = {
      riderUsername: riderUsername,
      amount: amountToSend,
      driverUsername: driverUsername,
      tripID: tripID,
      createdAt: new Date()
    }
    usersPayments.saveAmountToUser(driverUsername,amountToSend);
    tripsPaid.insertOne(doc);
    return tx;
};




async function withdraw(username, amountToWithdraw, userWalletAddres) {
    //const userWallet = await walletService.getWallet(username);
    const ownerWallet = await walletService.getDeployerWallet();
    const basicPayments = await getContract(config, ownerWallet);
    let tx;
    try{
      console.log("LLEGO PIOLA");
      await usersPayments.blockWallet(username);
      tx = await mockPayments.mockSendPayment(
        userWalletAddres,
        await ethers.utils.parseEther(amountToWithdraw.toString()).toHexString(),
      );
    } catch (error){
      console.log(error);
      await usersPayments.unblockWallet(username)
      return false;
    }    // await userPayments.discountAmountToUser(req.body.username,req.body.amount);
    const doc = {
      username: username,
      amount: amountToWithdraw,
      wallet: userWalletAddres,
      createdAt: new Date()
    }
    console.log("PASE");
    withdrawsDB.insertOne(doc);
    usersPayments.discountAmountToUser(username, amountToWithdraw);
    usersPayments.unblockWallet(username);
    return tx;
};

async function firstDeposit(username,amount){
  const userWallet = await walletService.getWallet(username);
  const ownerWallet = await walletService.getDeployerWallet();
  const basicPayments = await getContract(config, ownerWallet);
  console.log("BIEN 1");
    let tx;
    try{
      console.log("BIEN 2");
      await usersPayments.blockWallet(username);
      console.log("BIEN 3");
      tx = await mockPayments.mockSendPayment(
        userWallet.address,
        await ethers.utils.parseEther(amount.toString()).toHexString(),
      );
      console.log("BIEN 3");
    } catch{
      await usersPayments.unblockWallet(username)
      return false;
    } 
    await usersPayments.unblockWallet(username)
    return tx;
};


async function adminDeposit(username, amountToWithdraw, userWalletAddres) {
  const ownerWallet = await walletService.getDeployerWallet();
  const basicPayments = await getContract(config, ownerWallet);
  let tx;
    try{
      console.log("LLEGO PIOLA");
      await usersPayments.blockWallet(username);
      tx = await mockPayments.mockSendPayment(
        userWalletAddres,
        await ethers.utils.parseEther(amountToWithdraw.toString()).toHexString(),
      );
    } catch (error){
      console.log(error);
      await usersPayments.unblockWallet(username)
      return false;
    }    // await userPayments.discountAmountToUser(req.body.username,req.body.amount);
    const doc = {
      adminUsername: username,
      amount: amountToWithdraw,
      walletDest: userWalletAddres,
      createdAt: new Date()
    }
    adminDepositDB.insertOne(doc);
    usersPayments.unblockWallet(username);
    return tx;
};




exports.deposit = deposit;
exports.withdraw = withdraw;
exports.firstDeposit = firstDeposit;
exports.adminDeposit = adminDeposit;

