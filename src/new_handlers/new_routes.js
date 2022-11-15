
const { 
  createRiderWalletSchema,
  getRiderWalletSchema,
  PaymentPostSchema,
  WithdrawPostSchema,
  createDriverWalletSchema,
  getRiderBalanceSchema,
  getDriverEarnedMoneySchema,
  getDriverDataWalletSchema,}= require("../schemas/payments_schema");

const createRiderWalletHandler = require("./createRiderWallet");
const getRiderWalletHandler = require("./getRIderWallet");
const createPaymentHandeler = require("./createPayment");
const withdrawHandler = require("./createWithdraw");
const createDriverWalletHandler = require("./createDriverWallet");
const getDriverEarnedMoney = require("./getDriverEarnedMoney");
const getDriverWalletData = require("./getDriverWallet");

async function ridersWalletRoutes(fastify, getUserOpts, done) {
    fastify.post(
      '/riders/:username/wallet/create',
      {
        schema: createRiderWalletSchema,
        handler: createRiderWalletHandler,
      },
    );

    fastify.post(
      '/drivers/:username/wallet/create',
      {
        schema: createDriverWalletSchema,
        handler: createDriverWalletHandler,
      },
    );

    fastify.get(
      '/riders/:username/wallet',
      {
        schema: getRiderWalletSchema,
        handler:getRiderWalletHandler,
      }
    )

    fastify.get(
      '/drivers/:username/wallet',
      {
        schema: getDriverDataWalletSchema,
        handler:getDriverWalletData,
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
      '/drivers/:username/earned/money',
      {
        schema: getDriverEarnedMoneySchema,
        handler: getDriverEarnedMoney,
      }
    )

    done();
  }
  
  module.exports = ridersWalletRoutes;