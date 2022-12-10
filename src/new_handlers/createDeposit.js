const walletService  = require("../new_services/walletService");
const contractInteraction = require("../new_services/new_contractInteraction")
const userPayments = require("../new_services/userPayments");

async function createDepositPOST(req,reply) {
    let responseValue = await contractInteraction.adminDeposit(req.body.admin_username, req.body.amount,req.body.walletAddress);
    console.log(responseValue);
    if(responseValue === false){
      console.log("soy false");
      return reply.status(500).send(
        {
          message: 'Error. The transaction failed',
        }
      )
    }
    
    return reply.status(202).send(responseValue);
  }

module.exports = createDepositPOST