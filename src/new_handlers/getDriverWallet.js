const walletService  = require("../new_services/new_wallet");

async function driverWalletGET(req,reply) {
    const driverExists = await walletService.verifyDriversExistance(req.params.username);
    if(driverExists === false){
      reply.code(404).send({
        message: "Error. Driver Username not found",
        username: req.params.username,
      })
    }
    const walletInfo = await walletService.getDriverWalletData(req.params.username);
    reply.code(200).send(walletInfo);
  }

module.exports = driverWalletGET;