/* eslint-disable */
const {
    Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../test_code/src/server');

const app = builder.buildTestServer();

Given('Hay una wallet creada para el pasajero {string}', async function (username) {
    await app.inject({
        method: 'POST',
        url: '/api/v1/payments/reset'
    })
    this.response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/${username}/wallet/create`,
    });
    assert.equal(this.response.statusCode, 202);
});

Given('Hay una wallet creada para el conductor {string}', async function (username) {
    this.response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/${username}/wallet/create`,
    });
});


    
When('Quiero crear un payment del usuario {string} al usuario {string} de 0.1 ETH', async function (username_rider, username_driver) {
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


Then('{string} tiene un saldo por cobrar de 0.08 ETH', async function (username) {
    const response = await app.inject({
        method: 'GET',
        url: `/api/v1/payments/${username}/unclaimed/money`,
    });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().username, username);
    assert.equal(response.json().amount, 0.08);
});
