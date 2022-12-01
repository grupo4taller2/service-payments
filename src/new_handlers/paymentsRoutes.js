const { 
    PaymentPostSchema,
    WithdrawPostSchema,
    createWalletSchema,
    getUserWalletSchema,
    getUserUnclaimedMoneySchema,
    getContractBalanceSchema,
    depositPostSchema,
    getTransactionsSchema,
    getTransactions24Schema,
  }= require("../schemas/payments_schema");
  

  const createPaymentHandeler = require("./createPayment");
  const withdrawHandler = require("./createWithdraw");
  const createWallet = require("./createWallet");
  const getWallet = require("./getWallet");
  const getUserUnclaimedMoney = require("./getUnclaimedMoney");
  const getContractBalance = require("./getContractBalance");
  const createDeposit = require("./createDeposit");
  const getTransactions = require('./getTransactions');
  const getTransactions24 = require('./getTransaction24');
  
  async function paymentsRoutes(fastify, getUserOpts, done) {
    
    fastify.post(
      '/:username/wallet/create',
      {
        schema: createWalletSchema,
        handler: createWallet,
      },
    ); 
  
      fastify.get(
        '/:username/wallet',
        {
          schema: getUserWalletSchema,
          handler:getWallet,
        }
      )
      
      fastify.post(
        '/create/payment',
        {
          schema: PaymentPostSchema,
          handler: createPaymentHandeler,
        }
      )
      fastify.post(
        '/create/withdraw',
        {
          schema: WithdrawPostSchema,
          handler: withdrawHandler,
        }
      )
  
      fastify.get(
        '/:username/unclaimed/money',
        {
          schema: getUserUnclaimedMoneySchema,
          handler: getUserUnclaimedMoney,
        }
      )
      
      fastify.get(
        '/contract/balance',
        {
          schema: getContractBalanceSchema,
          handler: getContractBalance,
        }
      )
      
      fastify.post(
        '/create/deposit',
        {
          schema: depositPostSchema,
          handler: createDeposit,
        }
      )
      
      fastify.get(
        '/transactions',
        {
          schema: getTransactionsSchema,
          handler: getTransactions,
        }
      )

      fastify.get(
        '/transactions/24',
        {
          schema: getTransactions24Schema,
          handler: getTransactions24,
        }
      )

      done();
    }
    
    module.exports = paymentsRoutes;