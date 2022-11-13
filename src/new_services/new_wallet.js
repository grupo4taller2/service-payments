const config = require("../config");
const ethers = require("ethers");
const accounts = [];
const { ridersWallets } = require("../database/database");
const { driversWallets } = require("../database/database");
const  { driversAmount } = require("../database/database");


async function createWalletRider(riderUsername){
  const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const doc = {
    riderUsername: riderUsername,
    walletAddres: wallet.address,
    privateKey: wallet.privateKey
  }
  ridersWallets.insertOne(doc);
  return doc;
};

async function createWalletDriver(driverUsername){
  const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const doc = {
    driverUsername: driverUsername,
    walletAddres: wallet.address,
    privateKey: wallet.privateKey
  }
  const docAmount = {
    driver_username: driverUsername,
    amount: 0,
  }
  driversWallets.insertOne(doc);
  driversAmount.insertOne(docAmount);
  return doc;
};

async function getDeployerWallet (){
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    console.log("Deployer wallet" + wallet.address);
    return wallet;
  };
/*
module.exports = createWallet;
module.exports = getDeployerWallet;
*/

async function getWalletsData(){
  return accounts;
};

async function getWalletData(username){
  return ridersWallets.findOne(username);
};

async function getRiderWallet(username){
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    console.log(username);
    const query = { riderUsername: username };
    rider_wallet_doc = await ridersWallets.findOne(query);
    console.log(rider_wallet_doc);
    const rider_wallet = {
      riderUsername: rider_wallet_doc.riderUsername,
      walletAddres: rider_wallet_doc.walletAddres,
      privateKey: rider_wallet_doc.privateKey
    }
    console.log(rider_wallet);
    console.log(rider_wallet.privateKey);
    console.log(provider);
    return new ethers.Wallet(rider_wallet.privateKey, provider);
  };


async function getDriverWallet(username){
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    console.log(username);
    const query = { driverUsername: username };
    driver_wallet = await driversWallets.findOne(query);
    return new ethers.Wallet(driver_wallet.privateKey, provider);
  };


exports.createWalletRider = createWalletRider;
exports.createWalletDriver = createWalletDriver;
exports.getDeployerWallet = getDeployerWallet;
exports.getWalletsData = getWalletsData;
exports.getWalletData = getWalletData;
exports.getRiderWallet = getRiderWallet;
exports.getDriverWallet = getDriverWallet;
