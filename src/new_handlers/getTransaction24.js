const transactionService = require('../new_services/transactions');

async function transactions24GET(req,reply) {
    const tx = await transactionService.getTransactions24(req.query.offset,req.query.limit);
    return reply.code(200).send(tx);
  }

module.exports = transactions24GET;