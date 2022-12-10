const builder = require('./server');

const app = builder.buildServer();

app.listen({
    host: process.env.SERVICE_PAYMENTS_HOST ,
    port: process.env.SERVICE_PAYMENTS_PORT || process.env.PORT,
});
