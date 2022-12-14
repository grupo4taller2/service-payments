const walletService  = require("../new_services/walletService");

async function walletGET(req,reply) {
  console.log(req.params.username);

  const riderExists = await walletService.verifyUserExistance(req.params.username);
    if(riderExists === false){
      console.log("me devuelvo");
      return reply.code(404).send({
        message: "Error. Rider Username not found",
        username: req.params.username,
      })
    }
    console.log("PASEEEE");
    const walletInfo = await walletService.getWalletData(req.params.username);
    return reply.code(200).send(walletInfo);
  }

module.exports = walletGET;