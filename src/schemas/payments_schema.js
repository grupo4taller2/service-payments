
const createWalletSchema = {
  description: 'Create a wallet for a user',
  tags: ['Payments Users'],
  params: {
      username: {
      type: 'string',
      default: 'username',
      },
  },
};


const getUserWalletSchema = {
  description: 'Get a wallet for a user',
  tags: ['Payments Users'],
  params: {
      username: {
      type: 'string',
      default: 'username',
      },
  },
  response: {
    200: {
      description: 'Successful Request',
      type: 'object',
      properties: {
        username: { type: 'string' },
        walletAddres: { type: 'string' },
        balance: { type: 'number' },
      }
    },
    404: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Insufficient Funds' },
        username: { type: 'string' },
      },
    },
  },
}

const PaymentPostSchema = {
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
        username: { type: 'string' },
        amount: { type: 'number' },
        walletAddress: {type: 'string' }
      },
    },
  };


const getUserUnclaimedMoneySchema = {
  description: 'Get user unclaimed money',
    tags: ['Payments Users'],
    params: {
        username: {
        type: 'string',
        default: 'username',
        },
    },
}

const getContractBalanceSchema = {
  description: 'Get a contract balance for admin',
  tags: ['Payments Users'],
  response: {
    404: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Insufficient Funds' },
        username: { type: 'string' },
      },
    },
  },
}


const depositPostSchema = {
  description: 'Endpoint for creating a deposit',
  tags: ['Payments'],
  body: {
    description: 'Payload for creating a new deposit',
    type: 'object',
    properties: {
      admin_username: { type: 'string' },
      amount: { type: 'number' },
      walletAddress: {type: 'string' }
    },
  },
};

const getTransactionsSchema = {
  description: 'Get transactions',
  tags: ['Payments'],
  querystring: {
    offset: { type: 'integer', description: 'pagination offset' },
    limit: { type: 'integer', description: 'pagination limit, get up to {limit} users' },
  },
  response: {
    404: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Insufficient Funds' },
        username: { type: 'string' },
      },
    },
  },
}

const getTransactions24Schema = {
  description: 'Get transactions in last 24 hours',
  tags: ['Payments'],
  response: {
    404: {
      description: 'Bad Request. Insufficient Funds',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Insufficient Funds' },
        username: { type: 'string' },
      },
    },
  },
}

exports.PaymentPostSchema = PaymentPostSchema;
exports.WithdrawPostSchema = WithdrawPostSchema;
exports.createWalletSchema = createWalletSchema;
exports.getUserWalletSchema = getUserWalletSchema;
exports.getUserUnclaimedMoneySchema = getUserUnclaimedMoneySchema;
exports.getContractBalanceSchema= getContractBalanceSchema;
exports.depositPostSchema = depositPostSchema;
exports.getTransactionsSchema = getTransactionsSchema;
exports.getTransactions24Schema = getTransactions24Schema;
