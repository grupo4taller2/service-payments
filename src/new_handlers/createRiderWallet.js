const walletService  = require("../new_services/new_wallet");

async function ridersWalletPOST(req, reply) {
   let reply_service = await walletService.createWalletRider(req.params.username);
    return reply.code(200).send(reply_service);;
  }

module.exports = ridersWalletPOST;