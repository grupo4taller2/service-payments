
const { 
  createRiderWalletSchema,
  getRiderWalletSchema,
  PaymentPostSchema,
  WithdrawPostSchema,
  createDriverWalletSchema,
  getRiderBalanceSchema,
  getDriverEarnedMoneySchema,
  getDriverDataWalletSchema,
  createWalletSchema,
  getUserWalletSchema,
  getUserUnclaimedMoneySchema,}= require("../schemas/payments_schema");

const createRiderWalletHandler = require("./createRiderWallet");
const getRiderWalletHandler = require("./getRIderWallet");
const createPaymentHandeler = require("./createPayment");
const withdrawHandler = require("./createWithdraw");
const createDriverWalletHandler = require("./createDriverWallet");
const getDriverEarnedMoney = require("./getDriverEarnedMoney");
const getDriverWalletData = require("./getDriverWallet");
const createWallet = require("./createWallet");
const getWallet = require("./getWallet");
const getUserUnclaimedMoney = require("./getUnclaimedMoney");

async function ridersWalletRoutes(fastify, getUserOpts, done) {
  
  fastify.post(
    '/users/:username/wallet/create',
    {
      schema: createWalletSchema,
      handler: createWallet,
    },
  );  
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
      '/users/:username/wallet',
      {
        schema: getUserWalletSchema,
        handler:getWallet,
      }
    )

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

    fastify.get(
      '/users/:username/unclaimed/money',
      {
        schema: getUserUnclaimedMoneySchema,
        handler: getUserUnclaimedMoney,
      }
    )

    done();
  }
  
  module.exports = ridersWalletRoutes;