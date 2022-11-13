require("dotenv").config();
const network = "goerli";
const deployArtifact = require(`../deployments/${network}/BasicPayments`);
//const deployerMnemonic = process.env.MNEMONIC;
const deployerMnemonic = "bonus ceiling purity hand effort ice ill swamp lock question lazy story";
const infuraApiKey = process.env.ALCHEMY_API_KEY;

console.log(deployerMnemonic);
module.exports = {
  contractAddress: deployArtifact.address,
  contractAbi: deployArtifact.abi,
  deployerMnemonic,
  infuraApiKey,
  network,
};
