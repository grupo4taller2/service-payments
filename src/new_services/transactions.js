const { tripsPaid } = require("../database/database");
const { withdrawsDB} = require("../database/database");

async function getPayments(offset,limit){
    let pagina_actual;
    if(offset == 0){
        pagina_actual = 1
    } else{
        pagina_actual = (offset / limit) + 1 
    }
    const cantidad_tx = await tripsPaid.count()
    const total_pages = Math.ceil(cantidad_tx / limit)
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
    const response = {
        actual_page: pagina_actual,
        total_pages: total_pages,
        transactions: list_tx
    }
    return response;
}

async function getPayments24(){
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

async function getWithdraws24(){
    list_tx = []
    transactions = await withdrawsDB.find({"createdAt":{$gt:new Date(Date.now() - 24*60*60 * 1000)}}).sort({"_id":-1});
    for await (const doc of transactions) {
        new_doc = {
            username: doc.username,
            amount: doc.amount,
            wallet: doc.wallet,
            createdAt: doc.createdAt,
        }
        list_tx.push(new_doc);

    }
    return list_tx;
}
exports.getPayments = getPayments;
exports.getPayments24 = getPayments24;
exports.getWithdraws24 = getWithdraws24;