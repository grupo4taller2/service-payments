const  { database } = require("../database/database");

async function resetPOST() {
    database.dropDatabase();
  }
  
  async function resetRoutes(fastify, getUserOpts, done) {
    fastify.post(
      '/reset',
      {
        handler: resetPOST,
      },
    );
    done();
  }
  
  module.exports = resetRoutes;
  