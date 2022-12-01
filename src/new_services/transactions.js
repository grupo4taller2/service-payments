const { tripsPaid } = require("../database/database");

async function getTransactions(offset,limit){

    list_tx = []
    transactions = await tripsPaid.find().sort({"_id":-1}).skip(offset).limit(limit);
    for await (const doc of transactions) {
        new_doc = {
            riderUsername: doc.riderUsername,
            amount: doc.amount,
            driverUsername: doc.driverUsername,
            tripID: doc.tripID,
        }
        list_tx.push(new_doc);

    }
    return list_tx;
}

async function getTransactions24(){
    list_tx = []
    transactions = await tripsPaid.find({"createdAt":{$gt:new Date(Date.now() - 24*60*60 * 1000)}}).sort({"_id":-1});
    for await (const doc of transactions) {
        new_doc = {
            riderUsername: doc.riderUsername,
            amount: doc.amount,
            driverUsername: doc.driverUsername,
            tripID: doc.tripID,
            createdAt: doc.createdAt
        }
        list_tx.push(new_doc);

    }
    return list_tx;
}

exports.getTransactions = getTransactions;
exports.getTransactions24 = getTransactions24;