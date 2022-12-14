/* eslint-disable */
const {
    Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../test_code/src/server');

const app = builder.buildTestServer();

Given('Se crea una wallet para el pasajero {string}', async function (username) {
    this.response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/${username}/wallet/create`,
    });
    assert.equal(this.response.statusCode, 202);
});

Given('Se crea una wallet para el conductor {string}', async function (username) {
    this.response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/${username}/wallet/create`,
    });
});


    
When('Quiero crear un payment del pasajero {string} al conductor {string} de 0.1 ETH', async function (username_rider, username_driver) {
    const body = {
        rider_username: username_rider,
        amount: 0.1,
        driver_username: username_driver,
        tripID: "0sdasdasdwq"
      };
    const response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/create/payment`,
        payload: body,
    });

});


Then('Obtengo la transaccion realizada por el pasajero {string} al conductor {string}', async function (rider_username, driver_username) {
    const query = {
        offset: 0,
        limit: 5,
      };
    const response = await app.inject({
        method: 'GET',
        url: `/api/v1/payments/transactions`,
        query,
    });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().transactions[0].riderUsername, rider_username);
    assert.equal(response.json().transactions[0].driverUsername, driver_username);
});
