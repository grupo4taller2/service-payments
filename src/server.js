const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const swagger = require('./plugins/swagger');
// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const route_aux = require("./new_handlers/new_routes");


// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));
//routes.forEach(route => fastify.register(route));
fastify.register(swagger);
fastify.register(route_aux);
//fastify.register(routes_2);


// Run the server

const start = async () => {
  try {;
    await fastify.listen({
      host: process.env.SERVICE_PAYMENTS_HOST,
      port: process.env.SERVICE_PAYMENTS_PORT,
    });
    console.log(`server listening on ${fastify.server.address().port}`)
    //fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();