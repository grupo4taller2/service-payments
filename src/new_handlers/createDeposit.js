const walletService  = require("../new_services/new_wallet");
const contractInteraction = require("../new_services/new_contractInteraction")

async function createDepositPOST(req,reply) {

  const riderExists = await walletService.verifyRidersExistance(req.body.rider_username);
    if(riderExists === false){
      reply.code(404).send({
        message: "Error. Rider Username not found",
        username: req.body.rider_username,
      })
    }

  
  const driverExists = await walletService.verifyDriversExistance(req.body.driver_username);
    if(driverExists === false){
      reply.code(404).send({
        message: "Error. Driver Username not found",
        username: req.body.driver_username,
      })
    }

  const verify = await walletService.verifyRiderBalance(req.body.rider_username, req.body.amount);
  if(verify === false || req.body.amount === 0){
    return reply.status(400).send(
      {
        message: 'Error. Insufficient Funds',
        username: req.body.rider_username,
      },
    );
  }

  return contractInteraction.deposit(req.body.rider_username, req.body.amount,
                                    req.body.driver_username,
                                    req.body.tripID);
  }

module.exports = createDepositPOST
