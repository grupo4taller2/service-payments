const walletService  = require("../new_services/walletService");
const contractInteraction = require("../new_services/new_contractInteraction")

async function createPaymentPOST(req,reply) {

  const riderExists = await walletService.verifyUserExistance(req.body.rider_username);
    if(riderExists === false){
      reply.code(404).send({
        message: "Error. Rider Username not found",
        username: req.body.rider_username,
      })
    }

  
  const driverExists = await walletService.verifyUserExistance(req.body.driver_username);
    if(driverExists === false){
      return reply.code(404).send({
        message: "Error. Driver Username not found",
        username: req.body.driver_username,
      })
    }

  let transaction = contractInteraction.deposit(req.body.rider_username, req.body.amount,
    req.body.driver_username,
    req.body.tripID);
  return transaction;
}

module.exports = createPaymentPOST
