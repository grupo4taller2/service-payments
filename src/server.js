const config = require("./config");
const swagger = require('./plugins/swagger');
// Require the framework and instantiate it
//const fastify = require("fastify")({ logger: true });
const fastify = require('fastify');
const paymentRoutes = require("./new_handlers/paymentsRoutes");


/*
fastify.register(require('@fastify/formbody'));
fastify.register(swagger);
fastify.register(paymentRoutes, { prefix: '/api/v1/payments' });
*/

// Run the server    // await userPayments.discountAmountToUser(req.body.username,req.body.amount);

function buildServer() {
  const app = fastify({
    logger: true,
  });

  app.register(require('@fastify/formbody'));
  app.register(swagger);
  app.register(paymentRoutes, { prefix: '/api/v1/payments' });
  return app;
}

const start = async () => {
  try {;
    await fastify.listen({
      host: process.env.SERVICE_PAYMENTS_HOST ,
      port: process.env.SERVICE_PAYMENTS_PORT || process.env.PORT,
    });
    console.log(`server listening on ${fastify.server.address().port}`)
    //fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
  }
};
//start();

exports.buildServer = buildServer;