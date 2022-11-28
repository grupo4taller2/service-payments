const walletService  = require("../new_services/walletService");
const contractInteraction = require("../new_services/new_contractInteraction")
const userPayments = require("../new_services/userPayments");

async function createDepositPOST(req,reply) {
    
    return contractInteraction.adminDeposit(req.body.admin_username, req.body.amount,req.body.walletAddress);
  }

module.exports = createDepositPOST