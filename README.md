# BasicPayments

Smart contract and basic service to solve payments in the Taller de Programacion 2' projects.

## Installation

To install the project we recommend that you use NVM and install the node version defined in `.nvmrc`

Once you have that in place, you can install the dependencies with npm through

`npm i`

## BasicPayments - Service

This is a minimum project that will serve as a guide to help students to do the rest of the integration

### Start process

To start the process, after you installed the dependencies and deployed the smart contracts to Goerli, you can run

`npm start`
or
`npm dev-start`
If you want to use nodemon and reaload the server everytime you save a change

keep in mind that you should have everything in config set before that.

### Available endpoints

Click de following [link](https://g4-fiuber-service-payments.herokuapp.com/docs/static/index.html) to see the available endpoints and how to use them


### Usage



#### Testing

To run the tests, after you installed the dependencies, just run

`npm t`


To run the api test you have to build the api and run the next line in other terminal
`docker exec -it fiuber.service-payments.dev npm run cucumber`
This tests may fail because we use an old version of mongodb (4.0) or because of the wallet creation api migth fail in some environments

#### Linting

To run the linter, after you installed the dependencies, just run 

`npm run lint`

#### Coverage

To create a coverage report, after you installed the dependencies, just run 

`npm run coverage`

#### Doc generation

To create the smart contract documentation, after you installed the dependencies, just run 

`npm run docgen`

This will generate a browsable html file within the `./docs` folder, to view it you can open it with any browser.

#### Deployment

To deploy the smart contracts just run

`npm run deploy-goerli`

`npm run deploy-local`

depending on the network you want to use.

Keep in mind that you have to set the ALCHEMY_API_KEY and MNEMONIC envvars(the .env file can be used for this).

To get the deployed contract address just look in the `deployments/<network>/BasicPayments.json` file.

#### More scripts

Other useful scripts can be found using

`npm run`

