
const createRiderWalletSchema = {
    description: 'Create a wallet for a rider',
    tags: ['Payments Riders'],
    params: {
        username: {
        type: 'string',
        default: 'username',
        },
    },
};

const createDriverWalletSchema = {
  description: 'Create a wallet for a driver',
  tags: ['Payments Drivers'],
  params: {
      username: {
      type: 'string',
      default: 'username',
      },
  },
};

const getRiderWalletSchema = {
    description: 'Get a wallet for a rider',
    tags: ['Payments Riders'],
    params: {
        username: {
        type: 'string',
        default: 'username',
        },
    },
}


const getDriverDataWalletSchema = {
  description: 'Get a wallet for a rider',
  tags: ['Payments Drivers'],
  params: {
      username: {
      type: 'string',
      default: 'username',
      },
  },
}

const DepositPostSchema = {
    description: 'Endpoint for creating a deposit',
    tags: ['Payments'],
    body: {
      description: 'Payload for creating a new deposit',
      type: 'object',
      properties: {
        rider_username: { type: 'string' },
        amount: { type: 'number' },
        driver_username: { type: 'string' },
        tripID: { type: 'string' },
      },
    },
    response: {
      400: {
        description: 'Bad Request. Insufficient Funds',
        type: 'object',
        properties: {
          message: { type: 'string', default: 'Error. Insufficient Funds' },
          username: { type: 'string' },
        },
      },
    },
  };


const WithdrawPostSchema = {
    description: 'Endpoint for creating a withdraw',
    tags: ['Payments'],
    body: {
      description: 'Payload for creating a new withdraw',
      type: 'object',
      properties: {
        driver_username: { type: 'string' },
        amount: { type: 'number' },
      },
    },
  };


const getRiderBalanceSchema = {
  description: 'Get balance for a rider',
    tags: ['Payments Riders'],
    params: {
        username: {
        type: 'string',
        default: 'username',
        },
    },
}


exports.createRiderWalletSchema = createRiderWalletSchema;
exports.createDriverWalletSchema = createDriverWalletSchema;
exports.getRiderWalletSchema = getRiderWalletSchema;
exports.DepositPostSchema = DepositPostSchema;
exports.WithdrawPostSchema = WithdrawPostSchema;
exports.getRiderBalanceSchema = getRiderBalanceSchema;
exports.getDriverDataWalletSchema = getDriverDataWalletSchema;