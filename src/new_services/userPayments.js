const  { usersBalanceDB } = require("../database/database");

async function saveAmountToUser(username,amount){
    let amountFloat = parseFloat(amount);
    const commision = (amountFloat * 20) / 100;
    const  finalPayment = amountFloat - commision;
    let previousValue = await usersBalanceDB.findOne({ username: username });
    console.log("PREVIOS");
    console.log(previousValue.amount);
    const newAmount = previousValue.amount + finalPayment;
    console.log("NEWw");
    console.log(newAmount);
    const options = { upsert: true };
    const updateDoc = {
        $set: {
          amount: newAmount,
        },
      };
    usersBalanceDB.updateOne( { username: username },updateDoc,options);
}

async function verifyUnclaimedMoney(username,amount){
  let usersUnclaimedMoney = await usersBalanceDB.findOne({ username: username });
  if (usersUnclaimedMoney.amount >= amount){
    return true;
  } else{
    return false;
  }
}

async function discountAmountToUser(username,amount){
  let amountFloat = parseFloat(amount);
  let previousValue = await usersBalanceDB.findOne({ username: username });
  const newAmount = previousValue.amount - amountFloat;
  const options = { upsert: true };
  const updateDoc = {
      $set: {
        amount: newAmount,
      },
    };
  usersBalanceDB.updateOne( { username: username },updateDoc,options);
}

exports.saveAmountToUser = saveAmountToUser;
exports.verifyUnclaimedMoney = verifyUnclaimedMoney;
exports.discountAmountToUser = discountAmountToUser;