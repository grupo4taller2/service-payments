const fp = require('fastify-plugin');
const swagger = require('@fastify/swagger');

// eslint-disable-next-line no-unused-vars
async function setupSwagger(fastify, opts) {
  fastify.register(swagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'service payments', description: 'Service payments end-points' },
        // { name: 'code', description: 'Code related end-points' }
      ],
      definitions: {
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
}

module.exports = fp(setupSwagger);
