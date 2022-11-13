const walletService  = require("../new_services/new_wallet");

async function walletGET(req,reply) {
    const body = await walletService.getWalletData(req.params.id);
    reply.code(200).send(body);
  }

module.exports = walletGET;