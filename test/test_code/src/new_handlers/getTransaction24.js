const transactionService = require('../new_services/transactions');

async function transactions24GET(req,reply) {
    const payments_tx = await transactionService.getPayments24(req.query.offset,req.query.limit);
    const withdraw_tx = await transactionService.getWithdraws24();
    const transactions = {
        payments: payments_tx,
        withdraws: withdraw_tx,
    }

    return reply.code(200).send(transactions);
  }

module.exports = transactions24GET;