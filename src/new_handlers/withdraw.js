const walletService  = require("../new_services/new_wallet");
const contractInteraction = require("../new_services/new_contractInteraction")
const driversPayments = require("../new_services/driverPayments");

async function createWithdrawPOST(req,reply) {

    let verify = await driversPayments.verifyFunds(req.body.driver_username,req.body.amount);
    if(verify === false){
      return;
    }
    return contractInteraction.withdraw(req.body.driver_username, req.body.amount);
  }

module.exports = createWithdrawPOST
