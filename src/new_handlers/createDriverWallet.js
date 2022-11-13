const walletService  = require("../new_services/new_wallet");

async function driversWalletPOST(req, reply) {
   let reply_service = await walletService.createWalletDriver(req.params.username);
    return reply.code(200).send(reply_service);;
  }

module.exports = driversWalletPOST;