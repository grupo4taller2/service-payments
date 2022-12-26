const config = require("./config");
const swagger = require('./plugins/swagger');
// Require the framework and instantiate it
//const fastify = require("fastify")({ logger: true });
const fastify = require('fastify');
const paymentRoutes = require("./new_handlers/paymentsRoutes");
const resetRoutes = require('./new_handlers/reset');
const discount = require('./schedule_tasks/discount');
const { fastifySchedulePlugin } = require('@fastify/schedule');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');

//const job = new SimpleIntervalJob({ seconds: 30, }, discount);

// Run the server 

function buildServer() {
  const app = fastify({
    logger: true,
  });

  app.register(fastifySchedulePlugin);

// `fastify.scheduler` becomes available after initialization.
// Therefore, you need to call `ready` method.
  app.ready().then(() => {
      app.scheduler.addSimpleIntervalJob(discount)
  })
  app.register(require('@fastify/formbody'));
  app.register(swagger);
  app.register(paymentRoutes, { prefix: '/api/v1/payments' });
  return app;
}

function buildTestServer() {
  const app = fastify({
    logger: true,
  });

  app.register(require('@fastify/formbody'));
  app.register(swagger);
  app.register(paymentRoutes, { prefix: '/api/v1/payments' });
  app.register(resetRoutes, { prefix: '/api/v1/payments' });
  return app;
}

exports.buildServer = buildServer;
exports.buildTestServer = buildTestServer;
