const walletService  = require("../new_services/new_wallet");

async function ridersWalletPOST(req, reply) {
  const riderExists = await walletService.verifyRidersExistance(req.params.username);
    if(riderExists === true){
      return reply.code(400).send({
        message: "Error. Rider Username already in use",
        username: req.params.username,
      })
    }
   let reply_service = await walletService.createWalletRider(req.params.username);
    return reply.code(200).send(reply_service);;
  }

module.exports = ridersWalletPOST;