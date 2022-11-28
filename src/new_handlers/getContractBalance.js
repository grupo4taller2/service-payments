const walletService  = require("../new_services/walletService");

async function contractBalanceGET(req,reply) {

    const balance = await walletService.getContractBalance();
    console.log(balance);
    return reply.code(200).send(balance);
  }

module.exports = contractBalanceGET;