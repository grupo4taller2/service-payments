const walletService  = require("../new_services/new_wallet");

async function walletGET(req,reply) {
  const riderExists = await walletService.verifyRidersExistance(req.params.username);
    if(riderExists === false){
      reply.code(404).send({
        message: "Error. Rider Username not found",
        username: req.params.username,
      })
    }
    const walletInfo = await walletService.getRiderWalletData(req.params.username);
    reply.code(200).send(walletInfo);
  }

module.exports = walletGET;