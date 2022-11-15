const walletService  = require("../new_services/new_wallet");

async function driversWalletPOST(req, reply) {
  const driverExists = await walletService.verifyDriversExistance(req.params.username);
    if(driverExists === true){
      return reply.code(400).send({
        message: "Error. Driver Username already in use",
        username: req.params.username,
      })
    }
   let reply_service = await walletService.createWalletDriver(req.params.username);
    return reply.code(200).send(reply_service);;
  }

module.exports = driversWalletPOST;