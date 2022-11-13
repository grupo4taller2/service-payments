const ethers = require("ethers");
const accounts = [];
const { ridersWallets } = require("../database/database");

const getDeployerWallet =
  ({ config }) =>
  () => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    console.log("Deployer wallet" + wallet.address);
    return wallet;
  };

const createWallet =
  ({ config }) => riderUsername=>
  async () => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    // This may break in some environments, keep an eye on it
    const wallet = ethers.Wallet.createRandom().connect(provider);
    accounts.push({
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
    /*
    const doc = {
      riderUsername: riderUsername,
      walletAddres: wallet.address,
      privateKey: wallet.privateKey
    }*/
    console.log(riderUsername)
    console.log(wallet.address);
    //console.log(riderUsername);
    //ridersWallets.insertOne(doc);
    const result = {
      id: accounts.length,
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
    return result;
  };

const getWalletsData = () => () => {
  return accounts;
};

const getWalletData = () => index => {
  return accounts[index - 1];
};

const getWallet =
  ({ config }) =>
  index => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);

    return new ethers.Wallet(accounts[index - 1].privateKey, provider);
  };

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
