require("dotenv").config();
const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.


const client = new MongoClient(process.env.MONGO_ATLAS_PAYMENTS);
//const client = new MongoClient("mongodb://mongodb:27017/");



const database = client.db('service-payments');
const tripsPaid = database.collection('tripsPaid');
const driversAmount = database.collection('driversAmount');
const walletsDB = database.collection('usersWallets');
const usersBalanceDB = database.collection('usersBalance');
const withdrawsDB = database.collection('withdrawsDB');
const adminDepositDB = database.collection('adminDepositDB');

exports.tripsPaid = tripsPaid;
exports.driversAmount = driversAmount;
exports.walletsDB = walletsDB;
exports.usersBalanceDB = usersBalanceDB;
exports.withdrawsDB = withdrawsDB;
exports.adminDepositDB = adminDepositDB;
