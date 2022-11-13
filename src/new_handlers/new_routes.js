
const { 
  createRiderWalletSchema,
  getRiderWalletSchema,
  DepositPostSchema,
  WithdrawPostSchema,
  createDriverWalletSchema}= require("../schemas/payments_schema");

const createRiderWalletHandler = require("./createRiderWallet");
const getRiderWalletHandler = require("./getWalletHandler");
const createDepositHandeler = require("./createDeposit");
const withdrawHandler = require("./withdraw");
const createDriverWalletHandler = require("./createDriverWallet");

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
    done();
  }
  
  module.exports = ridersWalletRoutes;