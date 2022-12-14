/* eslint-disable */
const {
    Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../test_code/src/server');

const app = builder.buildTestServer();

Given('No hay una wallet creada para el usuario {string}', async function (username) {
    const response = await app.inject({
        method: 'GET',
        url: `/api/v1/payments/${username}/wallet`,
    });
    assert.equal(response.statusCode, 404);
    });
    
When('Quiero crear una wallet para el usuario {string}', async function (username) {
this.response = await app.inject({
    method: 'POST',
    url: `/api/v1/payments/${username}/wallet/create`,
});
assert.equal(this.response.statusCode, 202);
});


Then('Una wallet es creada para el usuario {string}', async function (username) {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/payments/${username}/wallet`,
    });
  
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().username, username);
});

