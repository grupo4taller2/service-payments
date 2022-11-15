const walletService  = require("../new_services/new_wallet");

async function driverWalletGET(req,reply) {
    console.log(req.params.username);
    const driverExists = await walletService.verifyDriversExistance(req.params.username);
    if(driverExists === false){
      return reply.code(404).send({
        message: "Error. Driver Username not found",
        username: req.params.username,
      })
    }
    console.log("PASEEEE");
    const walletInfo = await walletService.getDriverWalletData(req.params.username);
    return reply.code(200).send(walletInfo);
  }

module.exports = driverWalletGET;