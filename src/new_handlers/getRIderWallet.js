const walletService  = require("../new_services/new_wallet");

async function walletGET(req,reply) {
  console.log(req.params.username);

  const riderExists = await walletService.verifyRidersExistance(req.params.username);
    if(riderExists === false){
      console.log("me devuelvo");
      return reply.code(404).send({
        message: "Error. Rider Username not found",
        username: req.params.username,
      })
    }
    console.log("PASEEEE");
    const walletInfo = await walletService.getRiderWalletData(req.params.username);
    return reply.code(200).send(walletInfo);
  }

module.exports = walletGET;