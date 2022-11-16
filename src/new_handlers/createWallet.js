const walletService  = require("../new_services/walletService");
const contractInteraction = require("../new_services/new_contractInteraction")

async function ridersWalletPOST(req, reply) {
  const riderExists = await walletService.verifyUserExistance(req.params.username);
    if(riderExists === true){
      return reply.code(400).send({
        message: "Error. Rider Username already in use",
        username: req.params.username,
      })
    }
   let reply_service = await walletService.createWallet(req.params.username);
    let transaction = contractInteraction.firstDeposit(req.params.username, 0.03);
    return reply.code(200).send(reply_service);;
  }

module.exports = ridersWalletPOST;