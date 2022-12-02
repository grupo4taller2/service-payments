require("dotenv").config();
const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://fiuber:fiuber12345@fiuber.gojhw5h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(process.env.MONGO_ATLAS_PAYMENTS);



const database = client.db('service-payments');
const ridersWallets = database.collection('ridersWallets');
const driversWallets = database.collection('driversWallets');
const tripsPaid = database.collection('tripsPaid');
const driversAmount = database.collection('driversAmount');
const walletsDB = database.collection('usersWallets');
const usersBalanceDB = database.collection('usersBalance');
const withdrawsDB = database.collection('withdrawsDB');


exports.ridersWallets = ridersWallets;
exports.driversWallets = driversWallets;
exports.tripsPaid = tripsPaid;
exports.driversAmount = driversAmount;
exports.walletsDB = walletsDB;
exports.usersBalanceDB = usersBalanceDB;
exports.withdrawsDB = withdrawsDB;

//exports.RiderQualyAvgGETSchema = RiderQualyAvgGETSchema;
