const walletService  = require("../new_services/new_wallet");
const contractInteraction = require("../new_services/new_contractInteraction")
const driversPayments = require("../new_services/driverPayments");

async function createWithdrawPOST(req,reply) {
  const driverExists = await walletService.verifyDriversExistance(req.body.driver_username);
    if(driverExists === false){
      return reply.code(404).send({
        message: "Error. Driver Username not found",
        username: req.body.driver_username,
      })
    }
    
    let verify = await driversPayments.verifyFunds(req.body.driver_username,req.body.amount);
    if(verify === false || req.body.amounT === 0){
      return reply.status(400).send(
        {
          message: 'Error. Insufficient Funds',
          username: req.body.driver_username,
        },
      );
    }
    return contractInteraction.withdraw(req.body.driver_username, req.body.amount);
  }

module.exports = createWithdrawPOST
