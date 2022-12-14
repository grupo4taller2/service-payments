const walletService  = require("../new_services/walletService");

async function driverEarnedMoneyGET(req,reply) {
  const driverExists = await walletService.verifyUserExistance(req.params.username);
    if(driverExists === false){
      return reply.code(404).send({
        message: "Error. Driver Username not found",
        username: req.params.username,
      })
    }
    const body = await walletService.getUserUnclaimedMoney(req.params.username);
    return reply.code(200).send(body);
  }

module.exports = driverEarnedMoneyGET;