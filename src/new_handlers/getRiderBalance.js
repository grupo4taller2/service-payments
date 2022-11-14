const walletService  = require("../new_services/new_wallet");

async function riderWalletBalanceGET(req,reply) {
  const riderExists = await walletService.verifyRidersExistance(req.params.username);
    if(riderExists === false){
      reply.code(404).send({
        message: "Error. Rider Username not found",
        username: req.params.username,
      })
    }
    const body = await walletService.getRiderBalance(req.params.username);
    reply.code(200).send(body);
  }

module.exports = riderWalletBalanceGET;