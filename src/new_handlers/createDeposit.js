const walletService  = require("../new_services/new_wallet");
const contractInteraction = require("../new_services/new_contractInteraction")

async function createDepositPOST(req,reply) {

    riderWallet = await walletService.getRiderWallet(req.body.rider_username);
    return contractInteraction.deposit(req.body.rider_username, req.body.amount,
                                    req.body.driver_username,
                                    req.body.tripID);
  }

module.exports = createDepositPOST
