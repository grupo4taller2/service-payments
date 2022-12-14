/* eslint-disable */
const {
    Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../test_code/src/server');

const app = builder.buildTestServer();

Given('Hay una wallet withdraw creada para el conductor {string}', async function (username) {

    this.response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/${username}/wallet/create`,
    });
    assert.equal(this.response.statusCode, 202);
});

Given('Hay una wallet withdraw creada para el pasajero {string}', async function (username) {
    this.response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/${username}/wallet/create`,
    });
});

Given('El conductor {string} recibe un payment de parte de {string}', async function (username_driver, username_rider) {
    const body = {
        rider_username: username_rider,
        amount: 0.01,
        driver_username: username_driver,
        tripID: "0sdasdasdwq"
      };
    const response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/create/payment`,
        payload: body,
    });
});


    
When('Quiero crear un withdraw al usuario {string}', async function (username) {
    const body = {
        username: username,
        amount: 0.008,
        walletAddress: "asdasdsdfsdf"
      };
    const response = await app.inject({
        method: 'POST',
        url: `/api/v1/payments/create/withdraw`,
        payload: body,
    });
    assert.equal(response.statusCode, 200);
});


Then('Se crea un withdraw de manera exitosa y retire todos los fondos de {string}', async function (username) {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/payments/${username}/unclaimed/money`,
    });
  
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().username, username);
    assert.equal(response.json().amount, 0);

});