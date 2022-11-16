
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


const getRiderWalletSchema = {
    description: 'Get a wallet for a rider',
    tags: ['Payments Riders'],
    params: {
        username: {
        type: 'string',
        default: 'username',
        },
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



const getDriverDataWalletSchema = {
  description: 'Get a wallet for a rider',
  tags: ['Payments Drivers'],
  params: {
      username: {
      type: 'string',
      default: 'username',
      },
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

const getDriverEarnedMoneySchema = {
  description: 'Get earned money for a drider',
    tags: ['Payments Drivers'],
    params: {
        username: {
        type: 'string',
        default: 'username',
        },
    },
}


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


exports.createRiderWalletSchema = createRiderWalletSchema;
exports.createDriverWalletSchema = createDriverWalletSchema;
exports.getRiderWalletSchema = getRiderWalletSchema;
exports.PaymentPostSchema = PaymentPostSchema;
exports.WithdrawPostSchema = WithdrawPostSchema;
exports.getRiderBalanceSchema = getRiderBalanceSchema;
exports.getDriverDataWalletSchema = getDriverDataWalletSchema;
exports.getDriverEarnedMoneySchema  = getDriverEarnedMoneySchema ;
exports.createWalletSchema = createWalletSchema;
exports.getUserWalletSchema = getUserWalletSchema;
exports.getUserUnclaimedMoneySchema = getUserUnclaimedMoneySchema;
