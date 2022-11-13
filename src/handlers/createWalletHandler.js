function schema() {
  return {
    params: {
      username: {
        type: 'string',
        default: 'username',
    }
    },
    required: ["id"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    console.log("HOLAAAAAAAAAAA");
    console.log(req.params.username);
    const body = await walletService.createWallet(req.params.username);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
//module.exports = handler;