
const createRiderWalletSchema = {
    description: 'Create a wallet for a rider',
    tags: ['Riders Wallet'],
    params: {
        username: {
        type: 'string',
        default: 'username',
        },
    },
};

const createDriverWalletSchema = {
  description: 'Create a wallet for a driver',
  tags: ['Drivers Wallet'],
  params: {
      username: {
      type: 'string',
      default: 'username',
      },
  },
};

const getRiderWalletSchema = {
    description: 'Get a wallet for a rider',
    tags: ['Riders Wallet'],
    params: {
        username: {
        type: 'string',
        default: 'username',
        },
    },
}


const DepositPostSchema = {
    description: 'Endpoint for creating a deposit',
    tags: ['Deposits'],
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
  };


const WithdrawPostSchema = {
    description: 'Endpoint for creating a withdraw',
    tags: ['Withdraw'],
    body: {
      description: 'Payload for creating a new withdraw',
      type: 'object',
      properties: {
        driver_username: { type: 'string' },
        amount: { type: 'number' },
      },
    },
  };



exports.createRiderWalletSchema = createRiderWalletSchema;
exports.createDriverWalletSchema = createDriverWalletSchema;
exports.getRiderWalletSchema = getRiderWalletSchema;
exports.DepositPostSchema = DepositPostSchema;
exports.WithdrawPostSchema = WithdrawPostSchema;