
const { 
  createRiderWalletSchema,
  getRiderWalletSchema,
  DepositPostSchema,
  WithdrawPostSchema,
  createDriverWalletSchema,
  getRiderBalanceSchema,
  getDriverDataWalletSchema,}= require("../schemas/payments_schema");

const createRiderWalletHandler = require("./createRiderWallet");
const getRiderWalletHandler = require("./getRIderWallet");
const createDepositHandeler = require("./createDeposit");
const withdrawHandler = require("./createWithdraw");
const createDriverWalletHandler = require("./createDriverWallet");
const getRiderBalance = require("./getRiderBalance");
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
      '/riders/:username/wallet/',
      {
        schema: getRiderWalletSchema,
        handler:getRiderWalletHandler,
      }
    )

    fastify.get(
      '/drivers/:username/wallet/',
      {
        schema: getDriverDataWalletSchema,
        handler:getDriverWalletData,
      }
    )
    
    fastify.post(
      '/create/deposit',
      {
        schema: DepositPostSchema,
        handler: createDepositHandeler,
      }
    )
    fastify.post(
      '/create/withdraw',
      {
        schema: WithdrawPostSchema,
        handler: withdrawHandler,
      }
    )
    /*
    fastify.get(
      '/riders/:username/balance/',
      {
        schema: getRiderBalanceSchema,
        handler:getRiderBalance,
      }
    )*/

    done();
  }
  
  module.exports = ridersWalletRoutes;