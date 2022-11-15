const walletService  = require("../new_services/new_wallet");

async function driverEarnedMoneyGET(req,reply) {
  const driverExists = await walletService.verifyDriversExistance(req.params.username);
    if(driverExists === false){
      return reply.code(404).send({
        message: "Error. Driver Username not found",
        username: req.params.username,
      })
    }
    const body = await walletService.getDriverEarnedMoney(req.params.username);
    return reply.code(200).send(body);
  }

module.exports = driverEarnedMoneyGET;