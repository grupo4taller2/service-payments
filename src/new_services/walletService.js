const config = require("../config");
const ethers = require("ethers");
const accounts = [];
const { walletsDB } = require("../database/database");
const { usersBalanceDB } = require("../database/database");

async function createWallet(username){
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    // This may break in some environments, keep an eye on it
    const wallet = ethers.Wallet.createRandom().connect(provider);
    const doc = {
      username: username,
      walletAddres: wallet.address,
      privateKey: wallet.privateKey
    }
    const doc_balance = {
        username: username,
        amount: 0,
        status: 'unblock',
    }
    const docReturn = {
      username: username,
      walletAddres: wallet.address,
    }
    await walletsDB.insertOne(doc);
    await usersBalanceDB.insertOne(doc_balance);
    return docReturn;
};

async function verifyUserExistance(username){
    const query = { username: username };
    wallet = await walletsDB.findOne(query);
    console.log(wallet);
    if(wallet === null){
      console.log("SOY FALSO")
      return false;
    } else{
      return true;
    }
};


async function getWallet(username){
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    console.log(username);
    const query = { username: username };
    wallet_doc = await walletsDB.findOne(query);
    console.log(wallet_doc);
    return new ethers.Wallet(wallet_doc.privateKey, provider);
};

async function getDeployerWallet (){
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    console.log("Deployer wallet" + wallet.address);
    return wallet;
};



async function getUserUnclaimedMoney(username){
    query = {username: username};
    const balance = await usersBalanceDB.findOne(query);
    const doc = {
      username: balance.username,
      amount: balance.amount,
    }
    return doc;
}

async function getUserBalance(username){
    userWallet = await getWallet(username);
    const balance = await userWallet.getBalance();
    etherBalance = await ethers.utils.formatEther(balance.toString());
    balanceNumber = parseFloat(etherBalance);
    const doc = {
      balance: balanceNumber,
    }
    return doc;
  }

async function getWalletData(username){
    const wallet = await walletsDB.findOne({username:username});
    const userBalance = await getUserBalance(username);
    const doc = {
      username: wallet.username,
      walletAddres: wallet.walletAddres,
      balance: userBalance.balance,
    }
    console.log(doc);
    return doc;
};


async function getContractBalance(){
  const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
  const balance = await provider.getBalance(config.contractAddress);
  etherBalance = await ethers.utils.formatEther(balance.toString());
    balanceNumber = parseFloat(etherBalance);
    const doc = {
      balance: balanceNumber,
    }
  return doc;
}


exports.createWallet = createWallet;
exports.verifyUserExistance = verifyUserExistance;
exports.getWallet = getWallet;
exports.getDeployerWallet = getDeployerWallet;
exports.getWalletData = getWalletData;
exports.getUserUnclaimedMoney = getUserUnclaimedMoney;
exports.getContractBalance = getContractBalance;
