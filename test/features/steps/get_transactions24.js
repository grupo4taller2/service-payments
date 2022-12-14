/* eslint-disable */
const {
    Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../test_code/src/server');

const app = builder.buildTestServer();

Given('Se crea una nueva wallet para el pasajero {string}', async function (username) {
    this.response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/${username}/wallet/create`,
    });
    assert.equal(this.response.statusCode, 202);
});

Given('Se crea una nueva wallet para el conductor {string}', async function (username) {
    this.response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/${username}/wallet/create`,
    });
});


    
When('Quiero crear un nuevo payment del pasajero {string} al conductor {string} de 0.1 ETH', async function (username_rider, username_driver) {
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


Then('Obtengo la transaccion realizada en las ultimas 24 horas por el pasajero {string} al conductor {string}', async function (rider_username, driver_username) {
    const response = await app.inject({
        method: 'GET',
        url: `/api/v1/payments/transactions/24`,
    });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().payments[0].riderUsername, rider_username);
    assert.equal(response.json().payments[0].driverUsername, driver_username);
});
