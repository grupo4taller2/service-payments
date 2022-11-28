const { 
    PaymentPostSchema,
    WithdrawPostSchema,
    createWalletSchema,
    getUserWalletSchema,
    getUserUnclaimedMoneySchema,
    getContractBalanceSchema,
    depositPostSchema,}= require("../schemas/payments_schema");
  

  const createPaymentHandeler = require("./createPayment");
  const withdrawHandler = require("./createWithdraw");
  const createWallet = require("./createWallet");
  const getWallet = require("./getWallet");
  const getUserUnclaimedMoney = require("./getUnclaimedMoney");
  const getContractBalance = require("./getContractBalance");
  const createDeposit = require("./createDeposit");
  
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

      done();
    }
    
    module.exports = paymentsRoutes;