const walletService  = require("../new_services/walletService");
const contractInteraction = require("../new_services/new_contractInteraction")
const userPayments = require("../new_services/userPayments");

async function createWithdrawPOST(req,reply) {
  const userExists = await walletService.verifyUserExistance(req.body.username);
    if(userExists === false){
      return reply.code(404).send({
        message: "Error. Username not found",
        username: req.body.username,
      })
    }
    
    let verify = await userPayments.verifyUnclaimedMoney(req.body.username,req.body.amount);
    if(verify === false || req.body.amount === 0){
      return reply.status(400).send(
        {
          message: 'Error. Insufficient Funds or Amount is 0',
          username: req.body.username,
        },
      );
    }
    await userPayments.discountAmountToUser(req.body.username,req.body.amount);
    return contractInteraction.withdraw(req.body.username, req.body.amount,req.body.walletAddress);
  }

module.exports = createWithdrawPOST
