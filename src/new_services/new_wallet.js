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
  const docReturn = {
    riderUsername: riderUsername,
    walletAddres: wallet.address,
  }
  ridersWallets.insertOne(doc);
  return docReturn;
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
    driverUsername: driverUsername,
    amount: 0,
  }

  const docReturn = {
    driverUsername: driverUsername,
    walletAddres: wallet.address,
  }
  driversWallets.insertOne(doc);
  driversAmount.insertOne(docAmount);
  return docReturn;
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

async function getRiderWalletData(username){
  const riderWallet = await ridersWallets.findOne({riderUsername:username});
  const riderBalance = await getRiderBalance(username);
  const doc = {
    riderUsername: riderWallet.riderUsername,
    walletAddres: riderWallet.walletAddres,
    balance: riderBalance.balance,
  }
  console.log(doc);
  return doc;
};

async function getDriverWalletData(username){
  const driverWallet = await driversWallets.findOne({driverUsername:username});
  const driverBalance = await getDriverBalance(username);
  const doc = {
    driverUsername: driverWallet.driverUsername,
    walletAddres: driverWallet.walletAddres,
    balance: driverBalance.balance,
  }
  console.log(doc);
  return doc;
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
    return new ethers.Wallet(rider_wallet.privateKey, provider);
  };


async function getDriverWallet(username){
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    console.log(username);
    const query = { driverUsername: username };
    driver_wallet = await driversWallets.findOne(query);
    return new ethers.Wallet(driver_wallet.privateKey, provider);
  };


async function getRiderBalance(username){
  riderWallet = await getRiderWallet(username);
  const balance = await riderWallet.getBalance();
  etherBalance = await ethers.utils.formatEther(balance.toString());
  balanceNumber = parseFloat(etherBalance);
  const doc = {
    balance: balanceNumber,
  }
  return doc;
}



async function getDriverBalance(username){
  driverWallet = await getDriverWallet(username);
  const balance = await driverWallet.getBalance();
  etherBalance = await ethers.utils.formatEther(balance.toString());
  balanceNumber = parseFloat(etherBalance);
  const doc = {
    balance: balanceNumber,
  }
  return doc;
}


async function verifyRiderBalance(username, amount){
  console.log("VERIFYYYYYYY")
  riderWallet = await getRiderWallet(username);
  const balance = await riderWallet.getBalance();
  etherBalance = await ethers.utils.formatEther(balance.toString());
  balanceNumber = parseFloat(etherBalance);
  if(amount > balanceNumber){
    return false;
  }else{
    return true;
  }
}

async function verifyDriversExistance(username){
  const query = { driverUsername: username };
  driver_wallet = await driversWallets.findOne(query);
  if(driver_wallet === null){
    return false;
  } else{
    return true;
  }
}


async function getDriverEarnedMoney(username){
  query = {driverUsername: username};
  const balance = await driversAmount.findOne(query);
  const doc = {
    username: balance.driverUsername,
    amount: balance.amount,
  }
  return doc;
}


async function verifyRidersExistance(username){
  const query = { riderUsername: username };
  rider_wallet = await ridersWallets.findOne(query);
  console.log(rider_wallet);
  if(rider_wallet === null){
    console.log("SOY FALSO")
    return false;
  } else{
    return true;
  }
}




exports.createWalletRider = createWalletRider;
exports.createWalletDriver = createWalletDriver;
exports.getDeployerWallet = getDeployerWallet;
exports.getWalletsData = getWalletsData;
exports.getRiderWalletData = getRiderWalletData;
exports.getRiderWallet = getRiderWallet;
exports.getDriverWallet = getDriverWallet;
exports.getRiderBalance = getRiderBalance;
exports.verifyRiderBalance = verifyRiderBalance;
exports.getDriverWalletData = getDriverWalletData;
exports.verifyDriversExistance = verifyDriversExistance;
exports.verifyRidersExistance = verifyRidersExistance;
exports.getDriverEarnedMoney = getDriverEarnedMoney;
