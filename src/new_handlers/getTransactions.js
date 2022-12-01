const transactionService = require('../new_services/transactions');

async function transactionsGET(req,reply) {
    console.log("OFFSET")
    console.log(req.query.offset)
    console.log("LIMIT")
    console.log(req.query.limit)
    const tx = await transactionService.getTransactions(req.query.offset,req.query.limit);
    return reply.code(200).send(tx);
  }

module.exports = transactionsGET;